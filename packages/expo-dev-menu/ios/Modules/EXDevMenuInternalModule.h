// Copyright 2015-present 650 Industries. All rights reserved.

#import <React/RCTBridgeModule.h>

#import <EXDevMenu/EXDevMenuManager.h>

@interface EXDevMenuInternalModule : NSObject <RCTBridgeModule>

- (instancetype)initWithManager:(nullable EXDevMenuManager *)manager;

@end
