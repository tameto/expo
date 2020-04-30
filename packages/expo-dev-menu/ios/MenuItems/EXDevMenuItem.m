// Copyright 2015-present 650 Industries. All rights reserved.

#import <React/RCTUtils.h>

#import <EXDevMenu/EXDevMenuItem.h>

@implementation EXDevMenuItem

- (instancetype)initWithType:(EXDevMenuItemType)type
{
  if (self = [super init]) {
    _type = type;
    _isAvailable = YES;
    _isEnabled = NO;
  }
  return self;
}

- (nonnull NSDictionary<NSString *, NSObject *> *)serialize
{
  return @{
    @"type": @(_type),
    @"isAvailable": @(_isAvailable),
    @"isEnabled": @(_isEnabled),
    @"label": RCTNullIfNil(_label),
    @"detail": RCTNullIfNil(_detail),
    @"glyphName": RCTNullIfNil(_glyphName),
  };
}

@end

@implementation EXDevMenuAction

- (instancetype)initWithId:(nonnull NSString *)actionId
{
  if (self = [super initWithType:EXDevMenuItemTypeAction]) {
    _actionId = actionId;
  }
  return self;
}

- (nonnull NSDictionary<NSString *, NSObject *> *)serialize
{
  NSMutableDictionary *dict = [[super serialize] mutableCopy];
  [dict addEntriesFromDictionary:@{
    @"actionId": RCTNullIfNil(_actionId),
  }];
  return dict;
}

@end

@implementation EXDevMenuGroup
{
  __strong NSMutableArray<EXDevMenuItem *> *_items;
}

- (instancetype)init
{
  return [self initWithName:nil];
}

- (instancetype)initWithName:(nullable NSString *)groupName
{
  if (self = [super initWithType:EXDevMenuItemTypeGroup]) {
    _groupName = groupName;
    _items = [NSMutableArray new];
  }
  return self;
}

- (void)addItem:(nonnull EXDevMenuItem *)item
{
  [_items addObject:item];
}

- (nonnull NSDictionary<NSString *, NSObject *> *)serialize
{
  NSMutableDictionary *dict = [[super serialize] mutableCopy];
  [dict addEntriesFromDictionary:@{
    @"groupName": RCTNullIfNil(_groupName),
    @"items": [_items valueForKey:@"serialize"],
  }];
  return dict;
}

@end
