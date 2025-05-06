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
import com.facebook.react.bridge.Promise;

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
                WritableMap frameMap = Arguments.createMap();
                
                if (!frames.isEmpty()) {
                    LSFrame lastFrame = frames.get(frames.size() - 1);
                    
                    WritableArray rawDataArray = Arguments.createArray();
                    for (float rawDataPoint : lastFrame.raw_data) {
                        rawDataArray.pushDouble(rawDataPoint);
                    }
                    frameMap.putArray("raw_data", rawDataArray);
                }
                
                sendEvent("onScanComplete", frameMap);
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
    public void initialize(Promise promise) {
        try {
            boolean success = linkSquareModule.initialize();
            if (success) {
                promise.resolve(null);
            } else {
                promise.reject("INIT_ERROR", "Initialization failed");
            }
        } catch (Exception e) {
            promise.reject("INIT_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void connect(String ip, int port, Promise promise) {
        try {
            boolean success = linkSquareModule.connect(ip, port);
            if (success) {
                promise.resolve(null);
            } else {
                promise.reject("CONNECT_ERROR", "Connection failed");
            }
        } catch (Exception e) {
            promise.reject("CONNECT_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void scan(int ledFrames, int bulbFrames) {
        linkSquareModule.scan(ledFrames, bulbFrames);
    }

    @ReactMethod
    public void close(Promise promise) {
        try {
            linkSquareModule.close();
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject("CLOSE_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void isConnected(Promise promise) {
        try {
            boolean connected = linkSquareModule.isConnected();
            promise.resolve(connected);
        } catch (Exception e) {
            promise.reject("IS_CONNECTED_ERROR", e.getMessage());
        }
    }
}