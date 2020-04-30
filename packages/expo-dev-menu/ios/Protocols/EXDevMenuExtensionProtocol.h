// Copyright 2015-present 650 Industries. All rights reserved.

#import <EXDevMenu/EXDevMenuManager.h>
#import <EXDevMenu/EXDevMenuItem.h>

@protocol EXDevMenuExtensionProtocol <NSObject>

@optional

- (nullable NSArray<EXDevMenuItem *> *)devMenuItems;

- (EXDevMenuActionReaction)devMenuManager:(nonnull EXDevMenuManager *)manager
                         dispatchesAction:(nonnull NSString *)actionId;

@end
