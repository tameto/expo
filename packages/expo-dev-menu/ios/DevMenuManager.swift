// Copyright 2015-present 650 Industries. All rights reserved.

@objc open class DevMenuManager: NSObject {
  @objc static public let shared = DevMenuManager()

  @objc static public var interceptsMotionGestures: Bool {
    get {
      return DevMenuMotionInterceptor.isInstalled
    }
    set {
      DevMenuMotionInterceptor.isInstalled = newValue
    }
  }

  @objc static public var interceptsTouchGestures: Bool {
    get {
      return DevMenuTouchInterceptor.isInstalled
    }
    set {
      DevMenuTouchInterceptor.isInstalled = newValue
    }
  }

  var window: DevMenuWindow?
  var appInstance: DevMenuAppInstance?
  @objc public var delegate: DevMenuDelegateProtocol?

  override init() {
    super.init()
    self.window = DevMenuWindow(manager: self)
    self.appInstance = DevMenuAppInstance(manager: self)

    initializeInterceptors()
  }

  @objc @discardableResult open func isVisible() -> Bool {
    return !(window?.isHidden ?? true)
  }

  @objc @discardableResult open func open() -> Bool {
    if !canChangeVisibility(to: true) {
      return false
    }
    setVisibility(true)
    return true
  }

  @objc @discardableResult open func close() -> Bool {
    closeWithoutAnimation()
    return true
  }

  @objc @discardableResult open func toggle() -> Bool {
    return isVisible() ? close() : open()
  }

  @objc open func closeWithoutAnimation() {
    setVisibility(false)
  }

  // MARK: internals

  func dispatchAction(withId actionId: String) {
    extensions?.forEach({ ext in
      ext.devMenuManager?(self, dispatchesAction: actionId)
    })
  }

  func currentAppInfo() -> Dictionary<String, Any>? {
    return delegate?.appInfo?(forDevMenuManager: self)
  }

  func serializedDevMenuItems() -> Array<Dictionary<String, Any>> {
    return devMenuItems.map({ $0.serialize() })
  }

  // MARK: delegate stubs

  func canChangeVisibility(to visible: Bool) -> Bool {
    if isVisible() == visible {
      return false
    }
    return delegate?.devMenuManager?(self, canChangeVisibility: visible) ?? true
  }

  // MARK: private

  private var extensions: [DevMenuExtensionProtocol]? {
    let appBridge = delegate?.appBridge?(forDevMenuManager: self)
    return appBridge?.modulesConforming(to: DevMenuExtensionProtocol.self) as? [DevMenuExtensionProtocol]
  }

  private var devMenuItems: Array<DevMenuItem> {
    var items: Array<DevMenuItem> = []

    extensions?.forEach({ ext in
      if let extensionItems = ext.devMenuItems?() {
        items.append(contentsOf: extensionItems)
      }
    })
    return items
  }

  private func initializeInterceptors() {
    DevMenuMotionInterceptor.initialize()
    DevMenuTouchInterceptor.initialize()
  }

  private func setVisibility(_ visible: Bool) {
    DispatchQueue.main.async {
      if visible {
        self.window?.makeKeyAndVisible()
      } else {
        self.window?.isHidden = true;
      }
    }
  }
}
