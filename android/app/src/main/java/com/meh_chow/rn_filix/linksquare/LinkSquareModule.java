package com.meh_chow.rn_filix.linksquare;

import com.stratiotechnology.linksquareapi.LSFrame;
import com.stratiotechnology.linksquareapi.LinkSquareAPI;
import java.util.ArrayList;
import java.util.List;

public class LinkSquareModule implements LinkSquareAPI.LinkSquareAPIListener {

    // Singleton instance
    private static LinkSquareModule instance;
    private LinkSquareAPI linkSquareAPI;

    // Callback interface for React Native
    public interface LinkSquareCallback {
        void onEvent(String eventType, String message);
        void onScanComplete(List<LSFrame> frames);
        void onError(String error);
    }

    private LinkSquareCallback callback;

    static {
        System.loadLibrary("LinkSquareAPI");
    }

    private LinkSquareModule() {
        linkSquareAPI = LinkSquareAPI.getInstance();
    }

    public static LinkSquareModule getInstance() {
        if (instance == null) {
            instance = new LinkSquareModule();
        }
        return instance;
    }

    public void setCallback(LinkSquareCallback callback) {
        this.callback = callback;
    }

    public void initialize() {
        linkSquareAPI.Initialize();
        linkSquareAPI.SetEventListener(this);
    }

    public void connect(String ip, int port) {
        new Thread(() -> {
            int result = linkSquareAPI.Connect(ip, port);
            if (result != LinkSquareAPI.RET_OK) {
                if (callback != null) callback.onError(linkSquareAPI.GetLSError());
            } else {
                LinkSquareAPI.LSDeviceInfo deviceInfo = linkSquareAPI.GetDeviceInfo();
                String message = String.format(
                    "Alias: %s\nSW Ver: %s\nHW Ver: %s\nDeviceID: %s\nOPMode: %s",
                    deviceInfo.Alias, deviceInfo.SWVersion, deviceInfo.HWVersion,
                    deviceInfo.DeviceID, deviceInfo.OPMode
                );
                if (callback != null) callback.onEvent("CONNECTED", message);
            }
        }).start();
    }

    public boolean isConnected() {
        return linkSquareAPI.IsConnected();
    }

    public void scan(int scanDuration, int scanInterval) {
        new Thread(() -> {
            List<LSFrame> frames = new ArrayList<>();
            int result = linkSquareAPI.Scan(scanDuration, scanInterval, frames);
            if (result == LinkSquareAPI.RET_OK && callback != null) {
                callback.onScanComplete(frames);
            } else if (callback != null) {
                callback.onError("Scan failed: " + linkSquareAPI.GetLSError());
            }
        }).start();
    }

    public void close() {
        linkSquareAPI.Close();
        if (callback != null) callback.onEvent("DISCONNECTED", "Connection closed.");
    }

    @Override
    public void LinkSquareEventCallback(LinkSquareAPI.EventType eventType, int value) {
        switch (eventType) {
            case Button:
                if (callback != null) callback.onEvent("BUTTON_PRESSED", "Scan triggered.");
                scan(3, 3); // Example: Trigger scan on button press
                break;
            case Timeout:
                if (callback != null) callback.onError("Network timeout.");
                close();
                break;
            case Disconnected:
                if (callback != null) callback.onError("Network disconnected.");
                close();
                break;
        }
    }
}