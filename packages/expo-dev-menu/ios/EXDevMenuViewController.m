// Copyright 2015-present 650 Industries. All rights reserved.

#import <React/RCTUtils.h>
#import <React/RCTRootView.h>

#import <EXDevMenu/EXDevMenuViewController.h>
#import <EXDevMenu/EXDevMenuManager.h>
#import <EXDevMenu/EXDevMenuItem.h>

@interface EXDevMenuViewController ()

@property (nonatomic, assign) BOOL hasCalledJSLoadedNotification;

@end

@interface RCTRootView (EXDevMenuView)

- (void)javaScriptDidLoad:(NSNotification *)notification;
- (void)hideLoadingView;

@end

@implementation EXDevMenuViewController
{
  __weak EXDevMenuManager *_manager;
  __strong RCTRootView *_reactRootView;
}

- (instancetype)initWithManager:(nullable EXDevMenuManager *)manager
{
  if (self = [super init]) {
    _manager = manager;
  }
  return self;
}

# pragma mark - UIViewController

- (void)viewDidLoad
{
  [super viewDidLoad];

  [self _maybeRebuildRootView];
  [self.view addSubview:_reactRootView];
}

- (UIRectEdge)edgesForExtendedLayout
{
  return UIRectEdgeNone;
}

- (BOOL)extendedLayoutIncludesOpaqueBars
{
  return YES;
}

- (void)viewWillLayoutSubviews
{
  [super viewWillLayoutSubviews];
  _reactRootView.frame = CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height);
}

- (void)viewWillAppear:(BOOL)animated
{
  [super viewWillAppear:animated];
  [self _maybeRebuildRootView];
  [self _forceRootViewToRenderHack];
  [_reactRootView becomeFirstResponder];
}

- (BOOL)shouldAutorotate
{
  return YES;
}

/**
 * Overrides UIViewController's method that returns interface orientations that the view controller supports.
 */
- (UIInterfaceOrientationMask)supportedInterfaceOrientations
{
  return UIInterfaceOrientationMaskPortrait;
}

/**
 * Same case as above with `supportedInterfaceOrientations` method.
 * If we don't override this, we can get incorrect orientation while changing device orientation when the dev menu is visible.
 */
- (UIInterfaceOrientation)preferredInterfaceOrientationForPresentation
{
  return UIInterfaceOrientationPortrait;
}

#pragma mark - internal

- (NSDictionary *)_getInitialPropsForVisibleApp
{
  return @{
    @"enableDevelopmentTools": @(YES),
    @"showOnboardingView": @(NO),
    @"devMenuItems": [self serializedDevMenuItems],
    @"appInfo": RCTNullIfNil([_manager appInfo]),
    @"uuid": [[NSUUID UUID] UUIDString],
  };
}

- (nonnull NSArray<NSDictionary *> *)serializedDevMenuItems
{
  NSArray<EXDevMenuItem *> *items = [_manager devMenuItems];
  return [items valueForKey:@"serialize"];
}

// RCTRootView assumes it is created on a loading bridge.
// in our case, the bridge has usually already loaded. so we need to prod the view.
- (void)_forceRootViewToRenderHack
{
  if (!_hasCalledJSLoadedNotification) {
    RCTBridge *bridge = _manager.appInstance.bridge;
    NSNotification *notif = [[NSNotification alloc] initWithName:RCTJavaScriptDidLoadNotification
                                                          object:nil
                                                        userInfo:@{ @"bridge": bridge }];
    [_reactRootView javaScriptDidLoad:notif];
    _hasCalledJSLoadedNotification = YES;
  }
}

- (void)_maybeRebuildRootView
{
  RCTBridge *bridge = _manager.appInstance.bridge;

  // Main bridge might change if the home bridge restarted for some reason (e.g. due to an error)
  if (!_reactRootView || _reactRootView.bridge != bridge) {
    if (_reactRootView) {
      [_reactRootView removeFromSuperview];
      _reactRootView = nil;
    }
    _hasCalledJSLoadedNotification = NO;

    _reactRootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"main" initialProperties:[self _getInitialPropsForVisibleApp]];
    _reactRootView.frame = self.view.bounds;

    // By default react root view has white background,
    // however devmenu's bottom sheet looks better with partially visible experience.
    _reactRootView.backgroundColor = [UIColor clearColor];

    if ([self isViewLoaded]) {
      [self.view addSubview:_reactRootView];
      [self.view setNeedsLayout];
    }
  } else if (_reactRootView) {
    _reactRootView.appProperties = [self _getInitialPropsForVisibleApp];
  }
}

@end
