// Copyright 2015-present 650 Industries. All rights reserved.

class DevMenuInternalModule: NSObject, RCTBridgeModule {
  let manager: DevMenuManager

  init(manager: DevMenuManager) {
    self.manager = manager
  }

  // MARK: RCTBridgeModule

  static func moduleName() -> String! {
    return "ExpoDevMenuInternal"
  }

  // MARK: JavaScript API

  func dispatchAction(id: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    if id == nil {
      return reject("ERR_DEVMENU_ACTION_FAILED", "Action ID not provided.", nil)
    }
    manager.dispatchAction(withId: id)
  }

  func closeMenu(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    manager.closeWithoutAnimation()
  }
}
