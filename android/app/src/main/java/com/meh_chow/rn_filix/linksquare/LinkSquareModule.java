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

    public boolean initialize() {
        int result = linkSquareAPI.Initialize();
        if (result != 1) {
            String error = linkSquareAPI.GetLSError();
            if (error == null || error.isEmpty()) {
                error = "Initialization failed";
            }
            if (callback != null) callback.onError(error);
            return false;
        }
        linkSquareAPI.SetEventListener(this);
        if (callback != null) callback.onEvent("INITIALIZED", "Initialization successful");
        return true;
    }

    public boolean connect(String ip, int port) {
        int result = linkSquareAPI.Connect(ip, port);
        if (result != LinkSquareAPI.RET_OK) {
            String error = linkSquareAPI.GetLSError();
            if (error == null || error.isEmpty()) {
                error = "Connection failed";
            }
            if (callback != null) callback.onError(error);
            return false;
        }
        if (!linkSquareAPI.IsConnected()) {
            if (callback != null) callback.onError("Connection unstable");
            return false;
        }
        LinkSquareAPI.LSDeviceInfo deviceInfo = linkSquareAPI.GetDeviceInfo();
        if (deviceInfo == null) {
            if (callback != null) callback.onError("Failed to get device info");
            return false;
        }
        String message = String.format(
            "Alias: %s\nSW Ver: %s\nHW Ver: %s\nDeviceID: %s\nOPMode: %s",
            deviceInfo.Alias, deviceInfo.SWVersion, deviceInfo.HWVersion,
            deviceInfo.DeviceID, deviceInfo.OPMode
        );
        if (callback != null) callback.onEvent("CONNECTED", message);
        return true;
    }

    public boolean isConnected() {
        return linkSquareAPI.IsConnected();
    }

    public boolean setWLanInfo(String ssid, String password, byte securityOption) {
        int result = linkSquareAPI.SetWLanInfo(ssid, password, securityOption);
        if (result != LinkSquareAPI.RET_OK) {
            String error = linkSquareAPI.GetLSError();
            if (error == null || error.isEmpty()) {
                error = "Failed to set WiFi info";
            }
            if (callback != null) callback.onError(error);
            return false;
        }
        if (callback != null) callback.onEvent("WLanInfoSet", "WiFi info set successfully");
        return true;
    }

    public void scan(int ledFrames, int bulbFrames) {
        new Thread(() -> {
            List<LSFrame> frames = new ArrayList<>();
            int result = linkSquareAPI.Scan(ledFrames, bulbFrames, frames);
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
                scan(0, 1);
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