// Copyright 2015-present 650 Industries. All rights reserved.

#import <EXDevMenu/EXDevMenuWindow.h>
#import <EXDevMenu/EXDevMenuViewController.h>

@implementation EXDevMenuWindow
{
  __weak EXDevMenuManager *_manager;
  __strong EXDevMenuViewController *_viewController;
}

#pragma mark - UIWindow

- (instancetype)initWithManager:(nullable EXDevMenuManager *)manager
{
  if (self = [super init]) {
    _manager = manager;

    self.backgroundColor = [UIColor clearColor];
    self.bounds = [[UIScreen mainScreen] bounds];
    self.hidden = YES;
  }
  return self;
}

- (void)makeKeyAndVisible
{
  [super makeKeyAndVisible];

  // `makeKeyAndVisible` apparently doesn't call `hidden` setter so make sure the root view is attached.
  [self attachRootViewController];
}

- (void)setHidden:(BOOL)hidden
{
  [super setHidden:hidden];

  // Reset `rootViewController` so it gets appearing/disappearing events that we depend on.
  if (hidden) {
    [self detachRootViewController];
  } else {
    [self attachRootViewController];
  }
}

#pragma mark - internal

- (void)attachRootViewController
{
  if (!_viewController) {
    _viewController = [[EXDevMenuViewController alloc] initWithManager:_manager];
  }
  self.rootViewController = _viewController;
}

- (void)detachRootViewController
{
  self.rootViewController = nil;
}

@end
