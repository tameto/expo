// Copyright 2015-present 650 Industries. All rights reserved.

@objc public protocol DevMenuDelegateProtocol {
  /**
   Returns the bridge of the currently shown app. It is a context of what the dev menu displays.
   */
  @objc optional func appBridge(forDevMenuManager manager: DevMenuManager) -> RCTBridge?

  /**
   Returns a dictionary with the most important informations about the current app.
   */
  @objc optional func appInfo(forDevMenuManager manager: DevMenuManager) -> Dictionary<String, Any>?

  /**
   Tells the manager whether it can change dev menu visibility. In some circumstances you may want not to show/close the dev menu. (Optional)
   */
  @objc optional func devMenuManager(_ manager: DevMenuManager, canChangeVisibility visible: Bool) -> Bool
}
