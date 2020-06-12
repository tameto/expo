// Copyright 2015-present 650 Industries. All rights reserved.

@objc open class DevMenuModule: NSObject, RCTBridgeModule, DevMenuExtensionProtocol {
  public static func moduleName() -> String! {
    return "ExpoDevMenu"
  }

  @objc open var bridge: RCTBridge?

  @objc open func devMenuItems() -> Array<DevMenuItem>? {
    guard let devSettings = self.devSettings else {
      return nil
    }
    let isDevModeEnabled = devSettings != nil;// isDevModeEnabled()

    if !isDevModeEnabled {
      return nil
    }

    let inspector = DevMenuAction(withId: "dev-inspector")
    inspector.isEnabled = devSettings.isElementInspectorShown
    inspector.label = inspector.isEnabled ? "Hide Element Inspector" : "Show Element Inspector"
    inspector.glyphName = "border-style"

    let remoteDebug = DevMenuAction(withId: "dev-remote-debug")
    remoteDebug.isAvailable = devSettings.isRemoteDebuggingAvailable
    remoteDebug.isEnabled = devSettings.isDebuggingRemotely
    remoteDebug.label = remoteDebug.isAvailable ? remoteDebug.isEnabled ? "Stop Remote Debugging" : "Debug Remote JS" : "Remote Debugger Unavailable"
    remoteDebug.glyphName = "remote-desktop"

    let fastRefresh = DevMenuAction(withId: "dev-hmr")
    fastRefresh.isAvailable = devSettings.isHotLoadingAvailable
    fastRefresh.isEnabled = devSettings.isHotLoadingEnabled
    fastRefresh.label = fastRefresh.isAvailable ? fastRefresh.isEnabled ? "Disable Fast Refresh" : "Enable Fast Refresh" : "Fast Refresh Unavailable"
    fastRefresh.glyphName = "run-fast"

    let perfMonitor = DevMenuAction(withId: "dev-perf-monitor")
    perfMonitor.isAvailable = bridge?.module(forName: "PerfMonitor") != nil
    perfMonitor.isEnabled = devSettings.isPerfMonitorShown
    perfMonitor.label = perfMonitor.isAvailable ? perfMonitor.isEnabled ? "Hide Performance Monitor" : "Show Performance Monitor" : "Performance Monitor Unavailable"
    perfMonitor.glyphName = "speedometer"

    let settings = DevMenuAction(withId: "dev-settings")
    settings.isAvailable = true
    settings.isEnabled = true
    settings.label = "Settings"
    settings.glyphName = "settings-outline"

    return [inspector, remoteDebug, fastRefresh, perfMonitor, settings]
  }

  @objc open func devMenuManager(_ manager: DevMenuManager, dispatchesAction actionId: String) {
    guard let devSettings = self.devSettings else {
      return
    }

    switch actionId {
    case "dev-reload":
      bridge?.requestReload()
    case "dev-remote-debug":
      devSettings.isDebuggingRemotely = !devSettings.isDebuggingRemotely
    case "dev-profiler":
      devSettings.isProfilingEnabled = !devSettings.isProfilingEnabled
    case "dev-hmr":
      devSettings.isHotLoadingEnabled = !devSettings.isHotLoadingEnabled
    case "dev-inspector":
      devSettings.toggleElementInspector()
    case "dev-perf-monitor":
      if let perfMonitor = bridge?.module(forName: "PerfMonitor") {
        devSettings.isPerfMonitorShown = !devSettings.isPerfMonitorShown
      }
    default:
      return
    }
  }

  // MARK: private

  private var devSettings: RCTDevSettings? {
    return bridge?.module(forName: "DevSettings") as? RCTDevSettings
  }
}
