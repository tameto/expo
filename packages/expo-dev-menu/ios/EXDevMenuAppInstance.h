// Copyright 2015-present 650 Industries. All rights reserved.

#import <React/RCTBridgeDelegate.h>

#import <EXDevMenu/EXDevMenuBridgeProtocol.h>

@class EXDevMenuManager;

@interface EXDevMenuAppInstance : NSObject <RCTBridgeDelegate>

- (instancetype)initWithManager:(nonnull EXDevMenuManager *)manager;

/**
 * Returns React Native bridge instance on which the dev app is running.
 */
- (nonnull id<EXDevMenuBridgeProtocol>)bridge;

@end
