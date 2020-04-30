// Copyright 2015-present 650 Industries. All rights reserved.

#import <EXDevMenu/EXDevMenuInternalModule.h>

@implementation EXDevMenuInternalModule
{
  __weak EXDevMenuManager *_manager;
}

- (instancetype)initWithManager:(nullable EXDevMenuManager *)manager
{
  if (self = [super init]) {
    _manager = manager;
  }
  return self;
}

#pragma mark - RCTBridgeModule

+ (NSString *)moduleName
{
  return @"ExpoDevMenuInternal";
}

#pragma mark - JavaScript API

RCT_REMAP_METHOD(dispatchActionAsync,
                 dispatchActionWithId:(NSString *)actionId
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject)
{
  if (!actionId) {
    return reject(@"ERR_DEVMENU_ACTION_FAILED", @"Action ID not provided.", nil);
  }
  [_manager dispatchAction:actionId];
  resolve(nil);
}

/**
 * Immediately closes the dev menu if it's visible.
 * Note: It skips the animation that would have been applied by the JS side.
 */
RCT_EXPORT_METHOD(closeMenuAsync)
{
  [_manager closeWithoutAnimation];
}

@end
