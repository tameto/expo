// Copyright 2015-present 650 Industries. All rights reserved.

#import <Foundation/Foundation.h>

typedef NS_ENUM(NSInteger, EXDevMenuItemType) {
  EXDevMenuItemTypeAction = 1,
  EXDevMenuItemTypeGroup = 2,
};

@interface EXDevMenuItem : NSObject

@property (nonatomic, assign) EXDevMenuItemType type;
@property (nonatomic, assign) BOOL isAvailable;
@property (nonatomic, assign) BOOL isEnabled;
@property (nonatomic, nullable, strong) NSString *label;
@property (nonatomic, nullable, strong) NSString *detail;
@property (nonatomic, nullable, strong) NSString *glyphName;

- (instancetype)initWithType:(EXDevMenuItemType)type;

- (nonnull NSDictionary<NSString *, NSObject *> *)serialize;

@end

@interface EXDevMenuAction : EXDevMenuItem

@property (nonatomic, nonnull, strong) NSString *actionId;

- (instancetype)initWithId:(nonnull NSString *)actionId;

@end

@interface EXDevMenuGroup : EXDevMenuItem

@property (nonatomic, nullable, strong) NSString *groupName;

- (instancetype)init;
- (instancetype)initWithName:(nullable NSString *)groupName;
- (void)addItem:(nonnull EXDevMenuItem *)item;

@end
