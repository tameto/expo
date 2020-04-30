// Copyright 2015-present 650 Industries. All rights reserved.

@protocol EXDevMenuModuleInstanceProvider

- (id)instance;

@end

@protocol EXDevMenuModuleDataProvider

- (id)moduleDataForName:(NSString *)moduleName;

@end

@protocol EXDevMenuBridgeProtocol

// This should return `id<EXDevMenuModuleDataProvider>` but to support Swift it needs to be just a pointer.
- (id)batchedBridge;

- (NSArray *)modulesConformingToProtocol:(Protocol *)protocol;

@end
