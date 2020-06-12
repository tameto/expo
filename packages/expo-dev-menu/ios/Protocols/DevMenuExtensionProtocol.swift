// Copyright 2015-present 650 Industries. All rights reserved.

@objc public protocol DevMenuExtensionProtocol {
  
  @objc optional func devMenuItems() -> Array<DevMenuItem>?

  @objc optional func devMenuManager(_ manager: DevMenuManager, dispatchesAction actionId: String)
}
