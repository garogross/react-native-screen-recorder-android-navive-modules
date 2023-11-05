package com.khajak.myapp;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.ReactApplication;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;

import android.annotation.SuppressLint;
import android.util.Log;
import android.view.MotionEvent;
import android.view.WindowManager;
import android.view.View;
import android.content.Context;
import android.graphics.PixelFormat;
import android.app.Activity;
import android.content.res.Resources;
import android.util.DisplayMetrics;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.animation.ValueAnimator;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.widget.LinearLayout;
import android.widget.LinearLayout.LayoutParams;

public class FloatBubbleModule extends ReactContextBaseJavaModule {
    private WindowManager windowManager;
    private View overlayView;
    private ReactRootView reactRootView;
    private LinearLayout reactLayout;

    FloatBubbleModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "FloatBubbleModule";
    }


    @ReactMethod
    public void showOverlay(String EditComponent,Callback onClose, Callback onStop) {

        if (windowManager == null) {
            windowManager = (WindowManager) getReactApplicationContext().getSystemService(Context.WINDOW_SERVICE);
        }

        if (overlayView == null) {
            Activity activity = getCurrentActivity();
            if (activity != null) {

                activity.runOnUiThread(new Runnable() {
                    @SuppressLint("ClickableViewAccessibility")
                    @Override
                    public void run() {
                        overlayView = LayoutInflater.from(getReactApplicationContext()).inflate(R.layout.overlay_layout, null);

                        WindowManager.LayoutParams params = new WindowManager.LayoutParams(
                                WindowManager.LayoutParams.WRAP_CONTENT,
                                WindowManager.LayoutParams.WRAP_CONTENT,
                                20,
                                20,
                                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
                                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL
                                        | WindowManager.LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH,
                                PixelFormat.TRANSLUCENT
                        );

                        params.gravity = Gravity.TOP | Gravity.LEFT;

                        overlayView.setOnTouchListener(new View.OnTouchListener() {
                            private int lastX;
                            private int lastY;
                            private int startX;
                            private int startY;
                            private int xDistance = 20;
                            private boolean isEditModeActive = false;
                            private DisplayMetrics displayMetrics = Resources.getSystem().getDisplayMetrics();
                            private int screenWidth = displayMetrics.widthPixels;
                            private int screenHeight = displayMetrics.heightPixels;


                            private LinearLayout floatView = overlayView.findViewById(R.id.floatView);
                            private View closeButton = overlayView.findViewById(R.id.closeBtn);
                            private View stopButton = overlayView.findViewById(R.id.stopBtn);
                            private View editButton = overlayView.findViewById(R.id.editBtn);

                            private int layoutWidth() {
                             return overlayView.findViewById(R.id.floatView).getWidth();
                            }
                            private void updateOverlayLayoutParams(WindowManager.LayoutParams params) {
                                windowManager.updateViewLayout(overlayView, params);
                            }

                            private void updateFloatViewLayoutParams(boolean active) {
                                LayoutParams floatViewLayoutParams = new LayoutParams(floatView.getLayoutParams());
                                floatViewLayoutParams.leftMargin = active ? screenWidth - layoutWidth() - xDistance : 0;
                                floatView.setLayoutParams(floatViewLayoutParams);
                            }

                            private WindowManager.LayoutParams getLayoutParams() {
                                return (WindowManager.LayoutParams) overlayView.getLayoutParams();
                            }

                            private boolean checkIsPressed(MotionEvent event, View button) {
                                int[] location = new int[2];
                                button.getLocationOnScreen(location);

                                return event.getRawX() >= location[0] &&
                                        event.getRawX() <= location[0] + button.getWidth() &&
                                        event.getRawY() >= location[1] &&
                                        event.getRawY() <= location[1] + button.getHeight();
                            }

                            private void activateEditMode() {
                                WindowManager.LayoutParams layoutParams = getLayoutParams();
                                if(!isEditModeActive) {
                                    layoutParams.width = screenWidth;
                                    layoutParams.height = screenHeight;
                                    updateOverlayLayoutParams(layoutParams);

                                    ReactApplication reactApplication = (ReactApplication) getReactApplicationContext().getApplicationContext();
                                    ReactInstanceManager reactInstanceManager = reactApplication.getReactNativeHost().getReactInstanceManager();
                                    reactRootView = new ReactRootView(getReactApplicationContext());

                                    reactLayout = overlayView.findViewById(R.id.reactLayout);
                                    reactRootView.startReactApplication(reactInstanceManager, EditComponent, null);
                                    reactLayout.addView(reactRootView);

//                                    LayoutParams floatViewLayoutParams = (LayoutParams) floatView.getLayoutParams();
//                                    floatViewLayoutParams.rightMargin = xDistance;
//                                    floatView.setLayoutParams(floatViewLayoutParams);
                                } else  {
                                    layoutParams.width = WindowManager.LayoutParams.WRAP_CONTENT;
                                    layoutParams.height = WindowManager.LayoutParams.WRAP_CONTENT;
                                    layoutParams.x = screenWidth - layoutWidth() - xDistance;
                                    layoutParams.y = 0;
                                    updateOverlayLayoutParams(layoutParams);
                                    reactLayout.removeView(reactRootView);
                                    reactRootView = null;
                                }
                                updateFloatViewLayoutParams(!isEditModeActive);
                                isEditModeActive = !isEditModeActive;
                            }


                            private void onTouchDown(MotionEvent event) {
                                lastX = (int) event.getRawX();
                                lastY = (int) event.getRawY();
                                startX = (int) event.getRawX();
                                startY = (int) event.getRawY();
                            }

                            private void onTouchMove(MotionEvent event) {
                                WindowManager.LayoutParams layoutParams = getLayoutParams();

                                int deltaX = (int) event.getRawX() - lastX;
                                int deltaY = (int) event.getRawY() - lastY;

                                layoutParams.x += deltaX;
                                layoutParams.y += deltaY;
                                updateOverlayLayoutParams(layoutParams);
                                lastX = (int) event.getRawX();
                                lastY = (int) event.getRawY();
                            }


                            private void onTouchUp(MotionEvent event) {

                                if (lastX == startX && lastY == startY) {
                                    if (checkIsPressed(event, closeButton)) {
                                        hideOverlay();
                                        onClose.invoke(null, null);
                                    }
                                    if (checkIsPressed(event, stopButton)) {
                                        hideOverlay();
                                        onStop.invoke(null, null);
                                    }
                                    if (checkIsPressed(event, editButton)) {
                                        activateEditMode();
                                    }
                                } else {
                                    moveOverlay(event);
                                }
                            }

                            private void moveOverlay(MotionEvent event) {


                                int threshold = screenWidth / 2;
                                lastX = (lastX >= threshold) ? screenWidth - layoutWidth() - xDistance: xDistance;
                                WindowManager.LayoutParams layoutParams = getLayoutParams();
                                ValueAnimator animator = ValueAnimator.ofInt(layoutParams.x, lastX);
                                animator.setDuration(100); // Set the duration of the transition in milliseconds
                                animator.setInterpolator(new AccelerateDecelerateInterpolator());
                                animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                                    @Override
                                    public void onAnimationUpdate(ValueAnimator animation) {
                                        int value = (int) animation.getAnimatedValue();
                                        // Update the position of the overlay during the animation
                                        layoutParams.x = value;
                                        updateOverlayLayoutParams(layoutParams);
                                    }
                                });
                                animator.start();
                            }

                            @SuppressLint("ClickableViewAccessibility")
                            @Override
                            public boolean onTouch(View view, MotionEvent event) {
                                switch (event.getAction()) {
                                    case MotionEvent.ACTION_DOWN:
                                        onTouchDown(event);
                                        break;
                                    case MotionEvent.ACTION_MOVE:
                                        onTouchMove(event);
                                        break;
                                    case MotionEvent.ACTION_UP:
                                        onTouchUp(event);
                                        break;
                                }
                                return false;
                            }
                        });

                        windowManager.addView(overlayView, params);
                    }
                });
            }
        }
    }

    @ReactMethod
    public void hideOverlay() {
        if (windowManager != null && overlayView != null) {
            windowManager.removeView(overlayView);
            overlayView = null;
        }
    }
}
