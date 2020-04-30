// Copyright 2015-present 650 Industries. All rights reserved.

#import <React/RCTBridge.h>
#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>

#import <UMCore/UMModuleRegistryProvider.h>
#import <UMReactNativeAdapter/UMModuleRegistryAdapter.h>

#import <EXDevMenu/EXDevMenuAppInstance.h>
#import <EXDevMenu/EXDevMenuInternalModule.h>

@implementation EXDevMenuAppInstance
{
  __strong EXDevMenuManager *_manager;
  __strong RCTBridge *_bridge;
  __strong UMModuleRegistryAdapter *_moduleRegistryAdapter;
}

- (instancetype)initWithManager:(nonnull EXDevMenuManager *)manager
{
  if (self = [super init]) {
    _manager = manager;

    // Module registry must be initialized before the bridge.
    _moduleRegistryAdapter = [[UMModuleRegistryAdapter alloc] initWithModuleRegistryProvider:[[UMModuleRegistryProvider alloc] init]];

    _bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:nil];
  }
  return self;
}

#pragma mark - API

- (nonnull RCTBridge *)bridge
{
  return _bridge;
}

#pragma mark - RCTBridgeDelegate

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  NSString *packagerHost = [self jsPackagerHost];
  if (packagerHost && [[RCTBundleURLProvider sharedSettings] isPackagerRunning:packagerHost]) {
    return [RCTBundleURLProvider jsBundleURLForBundleRoot:@"index" packagerHost:packagerHost enableDev:YES enableMinification:NO];
  }
  NSLog(@"Expo DevMenu packager host %@ not found, falling back to bundled source file...", packagerHost);
#endif
  return [self jsSourceUrl];
}

- (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge *)bridge
{
  NSMutableArray *modules = [NSMutableArray new];

  EXDevMenuInternalModule *internalModule = [[EXDevMenuInternalModule alloc] initWithManager:_manager];
  [modules addObject:internalModule];

  [modules addObjectsFromArray:[_moduleRegistryAdapter extraModulesForBridge:bridge]];

  return modules;
}

- (BOOL)bridge:(RCTBridge *)bridge didNotFindModule:(NSString *)moduleName
{
  if ([moduleName isEqualToString:@"DevMenu"]) {
    return YES;
  }
  return NO;
}

#pragma mark - internal

- (nullable NSBundle *)resourcesBundle
{
  NSBundle *frameworkBundle = [NSBundle bundleForClass:[self class]];
  NSURL *resourcesBundleUrl = [frameworkBundle URLForResource:@"EXDevMenu" withExtension:@"bundle"];
  return [NSBundle bundleWithURL:resourcesBundleUrl];
}

- (nullable NSURL *)jsSourceUrl
{
  return [[self resourcesBundle] URLForResource:@"EXDevMenuApp.ios" withExtension:@"js"];
}

- (nullable NSString *)jsPackagerHost
{
  NSString *packagerHostPath = [[self resourcesBundle] pathForResource:@".dev-menu-packager-host" ofType:nil];
  return [[NSString stringWithContentsOfFile:packagerHostPath encoding:NSUTF8StringEncoding error:nil] stringByTrimmingCharactersInSet:[NSCharacterSet newlineCharacterSet]];
}

@end
