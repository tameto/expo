// Copyright 2015-present 650 Industries. All rights reserved.

import Foundation
import UIKit

class DevMenuMotionInterceptor {
  /**
   User defaults key under which the current state is saved.
   */
  static let userDefaultsKey = "EXDevMenuMotionGestureEnabled"

  /**
   Returns bool value whether motion interceptor is currently installed.
   */
  static var isInstalled: Bool = false {
    willSet {
      if isInstalled != newValue {
        // Capture shake gesture from any window by swizzling default implementation from UIWindow.
        swizzle()

        // Update value in user defaults.
        UserDefaults.standard.set(newValue, forKey: userDefaultsKey)
      }
    }
  }

  static func initialize() {
    UserDefaults.standard.register(defaults: [
      userDefaultsKey : true
    ])
    isInstalled = UserDefaults.standard.bool(forKey: userDefaultsKey)
  }

  static private func swizzle() {
    DevMenuUtils.swizzle(
      selector: #selector(UIWindow.motionEnded(_:with:)),
      withSelector: #selector(UIWindow.EXDevMenu_motionEnded(_:with:)),
      forClass: UIWindow.self
    )
  }
}

extension UIWindow {
  @objc func EXDevMenu_motionEnded(_ motion: UIEvent.EventSubtype, with event: UIEvent?) {
    if event?.subtype == .motionShake {
      DevMenuManager.shared.toggle()
    }
  }
}
