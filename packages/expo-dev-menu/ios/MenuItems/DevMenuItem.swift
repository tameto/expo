// Copyright 2015-present 650 Industries. All rights reserved.

@objc open class DevMenuItem: NSObject {
  @objc public enum ItemType: Int {
    case Action = 1
    case Group = 2
  }

  @objc public let type: ItemType
  @objc open var isAvailable: Bool = true
  @objc open var isEnabled: Bool = false

  @objc open var label: String = ""
  @objc open var detail: String = ""
  @objc open var glyphName: String = ""

  init(type: ItemType) {
    self.type = type
  }

  @objc open func serialize() -> Dictionary<String, Any> {
    return [
      "type": type,
      "isAvailable": isAvailable,
      "isEnabled": isEnabled,
      "label": label,
      "detail": detail,
      "glyphName": glyphName
    ]
  }
}

@objc open class DevMenuAction: DevMenuItem {
  @objc public let actionId: String

  init(withId id: String) {
    self.actionId = id
    super.init(type: .Action)
  }

  @objc open override func serialize() -> Dictionary<String, Any> {
    var dict = super.serialize()
    dict["actionId"] = actionId
    return dict
  }
}

@objc open class DevMenuGroup: DevMenuItem {
  let groupName: String
  var items: Array<DevMenuItem> = []

  init(withName name: String?) {
    self.groupName = name ?? ""
    super.init(type: .Group)
  }

  convenience init() {
    self.init(withName: nil)
  }

  @objc open func addItem(_ item: DevMenuItem) {
    items.append(item)
  }

  @objc open override func serialize() -> Dictionary<String, Any> {
    var dict = super.serialize()
    dict["groupName"] = groupName
    dict["items"] = items.map({ $0.serialize() })
    return dict
  }
}
