package com.pharmx;

import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  private Window mWindow;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    setContentView(R.layout.launch_screen);
    SplashScreen.show(this, R.style.SplashTheme);  // here
    super.onCreate(savedInstanceState);
  }

  @Override
  protected String getMainComponentName() {
    return "pharmx";
  }
}
