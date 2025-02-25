package com.meh_chow.rn_filix.linksquare;

import com.stratiotechnology.linksquareapi.LSFrame;
import java.util.List;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class LinkSquareReactModule extends ReactContextBaseJavaModule {

    private final LinkSquareModule linkSquareModule;

    public LinkSquareReactModule(ReactApplicationContext reactContext) {
        super(reactContext);
        linkSquareModule = LinkSquareModule.getInstance();
        linkSquareModule.setCallback(new LinkSquareModule.LinkSquareCallback() {
            @Override
            public void onEvent(String eventType, String message) {
                sendEvent(eventType, message);
            }

            @Override
            public void onScanComplete(List<LSFrame> frames) {
                WritableArray framesArray = Arguments.createArray();
                for (LSFrame frame : frames) {
                    WritableMap frameMap = Arguments.createMap();
                    frameMap.putInt("frameNo", frame.frameNo);
                    frameMap.putInt("lightSource", frame.lightSource);
                    frameMap.putInt("length", frame.length);

                    WritableArray dataArray = Arguments.createArray();
                    for (float dataPoint : frame.data) {
                        dataArray.pushDouble(dataPoint); // Store each float as double
                    }
                    frameMap.putArray("data", dataArray);

                    WritableArray rawDataArray = Arguments.createArray();
                    for (float rawDataPoint : frame.raw_data) {
                        rawDataArray.pushDouble(rawDataPoint); // Store each float as double
                    }
                    frameMap.putArray("raw_data", rawDataArray);
                    
                    framesArray.pushMap(frameMap);
                }
                sendEvent("onScanComplete", framesArray);
            }

            @Override
            public void onError(String error) {
                sendEvent("onError", error);
            }
        });
    }

    @NonNull
    @Override
    public String getName() {
        return "LinkSquareModule";
    }

    private void sendEvent(String eventName, Object data) {
        getReactApplicationContext()
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, data);
    }

    // Expose methods to React Native
    @ReactMethod
    public void initialize() {
        linkSquareModule.initialize();
    }

    @ReactMethod
    public void connect(String ip, int port) {
        linkSquareModule.connect(ip, port);
    }

    @ReactMethod
    public boolean isConnected() {
        return linkSquareModule.isConnected();
    }

    @ReactMethod
    public void scan(int scanDuration, int scanInterval) {
        linkSquareModule.scan(scanDuration, scanInterval);
    }

    @ReactMethod
    public void close() {
        linkSquareModule.close();
    }
}