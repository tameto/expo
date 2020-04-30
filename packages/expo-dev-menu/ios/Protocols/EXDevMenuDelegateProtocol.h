// Copyright 2015-present 650 Industries. All rights reserved.

#import <EXDevMenu/EXDevMenuBridgeProtocol.h>

@class EXDevMenuManager;

@protocol EXDevMenuDelegateProtocol <NSObject>

@required

/**
 * Returns the bridge of the currently shown app. It is a context of what the dev menu displays.
 */
- (nullable id)appBridgeForDevMenuManager:(nonnull EXDevMenuManager *)manager;

/**
 * Returns a dictionary with the most important informations about the current app.
 */
- (nullable NSDictionary<NSString *, NSObject *> *)appInfoForDevMenuManager:(nonnull EXDevMenuManager *)manager;

@optional

/**
 * Tells the manager whether it can change dev menu visibility. In some circumstances you may want not to show/close the dev menu.
 */
- (BOOL)devMenuManager:(nonnull EXDevMenuManager *)manager canChangeVisibility:(BOOL)visibility;

@end
