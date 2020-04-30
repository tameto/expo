// Copyright 2015-present 650 Industries. All rights reserved.

#import <EXDevMenu/EXDevMenuItem.h>
#import <EXDevMenu/EXDevMenuAppInstance.h>
#import <EXDevMenu/EXDevMenuGestureRecognizer.h>
#import <EXDevMenu/EXDevMenuDelegateProtocol.h>

typedef NS_ENUM(NSUInteger, EXDevMenuActionReaction) {
  EXDevMenuActionReactionNone = 0,
  EXDevMenuActionReactionClose = (1 << 0),
  EXDevMenuActionReactionRefresh = (1 << 1),
};

@interface EXDevMenuManager : NSObject

@property (nullable, nonatomic, strong) id<EXDevMenuDelegateProtocol> delegate;
@property (readwrite, nonatomic, assign) BOOL interceptMotionGesture;
@property (readwrite, nonatomic, assign) BOOL interceptTouchGesture;

/**
 * Returns singleton instance of the manager.
 */
+ (nonnull instancetype)sharedInstance;

/**
 * Returns dev menu app instance which is a wrapper around React Native's bridge.
 */
- (nonnull EXDevMenuAppInstance *)appInstance;

/**
 * Returns a dictionary with the most important informations about the current app.
 */
- (nullable NSDictionary<NSString *, NSObject *> *)appInfo;

/**
 * Returns an array with dev menu items to render. They are gathered from all modules conforming to EXDevMenuExtensionProtocol.
 */
- (nonnull NSArray<EXDevMenuItem *> *)devMenuItems;

/**
 * Returns bool value whether the dev menu is visible.
 */
- (BOOL)isVisible;

/**
 * Opens the dev menu. Returns `YES` if it succeeded or `NO` if the desired state is already set or its change has been rejected by the delegate.
 */
- (BOOL)open;

/**
 * Closes the dev menu with the animation applied on the JS side. Returns `YES` if it succeeded or `NO` if the desired state is already set or its change has been rejected by the delegate.
 */
- (BOOL)close;

/**
 * Toggles the visibility of the dev menu. Returns `YES` if it succeeded or `NO` if the desired state is already set or its change has been rejected by the delegate.
 */
- (BOOL)toggle;

/**
 * Closes the dev menu but skips JS animation and doesn't return any value as it always succeeds - the delegate can't reject it.
 */
- (void)closeWithoutAnimation;

- (void)dispatchAction:(nonnull NSString *)actionId;

@end
