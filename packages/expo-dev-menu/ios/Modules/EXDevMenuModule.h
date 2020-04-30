// Copyright 2015-present 650 Industries. All rights reserved.

#import <React/RCTBridgeModule.h>

#import <EXDevMenu/EXDevMenuExtensionProtocol.h>

@interface EXDevMenuModule : NSObject <RCTBridgeModule, EXDevMenuExtensionProtocol>

+ (NSString *)moduleName;

@end
