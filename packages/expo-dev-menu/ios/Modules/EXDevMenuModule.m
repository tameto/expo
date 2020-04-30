// Copyright 2015-present 650 Industries. All rights reserved.

#import <objc/runtime.h>

#import <React/RCTDevSettings.h>
#import <EXDevMenu/EXDevMenuManager.h>
#import <EXDevMenu/EXDevMenuBridgeProtocol.h>
#import <EXDevMenu/EXDevMenuModule.h>

@protocol RCTDevSettingsProtocol
- (BOOL)isElementInspectorShown;
- (BOOL)isRemoteDebuggingAvailable;
- (BOOL)isDebuggingRemotely;
- (BOOL)isHotLoadingEnabled;
- (BOOL)isHotLoadingAvailable;
- (BOOL)isPerfMonitorShown;
@end

@implementation EXDevMenuModule

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(ExpoDevMenu)

+ (BOOL)conformsToProtocol:(Protocol *)protocol
{
  NSString *protocolName = @(protocol_getName(protocol));
  if ([protocolName containsString:@"RCTBridgeModule"]) {
    return YES;
  }
  return [super conformsToProtocol:protocol];
}

#pragma mark - EXDevMenuExtensionProtocol

- (nullable NSArray<EXDevMenuItem *> *)devMenuItems
{
  id<RCTDevSettingsProtocol> devSettings = [self moduleInstanceNamed:@"DevSettings"];
  BOOL isDevModeEnabled = devSettings != nil;//[self _isDevModeEnabledForBridge:bridge];

  if (!isDevModeEnabled) {
    return nil;
  }

  EXDevMenuAction *inspector = [[EXDevMenuAction alloc] initWithId:@"dev-inspector"];
  inspector.isEnabled = devSettings.isElementInspectorShown;
  inspector.label = inspector.isEnabled ? @"Hide Element Inspector" : @"Show Element Inspector";
  inspector.glyphName = @"border-style";

  EXDevMenuAction *remoteDebug = [[EXDevMenuAction alloc] initWithId:@"dev-remote-debug"];
  remoteDebug.isAvailable = devSettings.isRemoteDebuggingAvailable;
  remoteDebug.isEnabled = devSettings.isDebuggingRemotely;
  remoteDebug.label = remoteDebug.isAvailable ? remoteDebug.isEnabled ? @"Stop Remote Debugging" : @"Debug Remote JS" : @"Remote Debugger Unavailable";
  remoteDebug.glyphName = @"remote-desktop";

  EXDevMenuAction *fastRefresh = [[EXDevMenuAction alloc] initWithId:@"dev-hmr"];
  fastRefresh.isAvailable = devSettings.isHotLoadingAvailable;
  fastRefresh.isEnabled = devSettings.isHotLoadingEnabled;
  fastRefresh.label = fastRefresh.isAvailable ? fastRefresh.isEnabled ? @"Disable Fast Refresh" : @"Enable Fast Refresh" : @"Fast Refresh Unavailable";
  fastRefresh.glyphName = @"run-fast";

  id perfMonitorModule = [self moduleInstanceNamed:@"PerfMonitor"];
  EXDevMenuAction *perfMonitor = [[EXDevMenuAction alloc] initWithId:@"dev-perf-monitor"];
  perfMonitor.isAvailable = perfMonitorModule != nil;
  perfMonitor.isEnabled = devSettings.isPerfMonitorShown;
  perfMonitor.label = perfMonitor.isAvailable ? perfMonitor.isEnabled ? @"Hide Performance Monitor" : @"Show Performance Monitor" : @"Performance Monitor Unavailable";
  perfMonitor.glyphName = @"speedometer";

  EXDevMenuAction *settings = [[EXDevMenuAction alloc] initWithId:@"dev-settings"];
  settings.isAvailable = YES;
  settings.isEnabled = YES;
  settings.label = @"Settings";
  settings.glyphName = @"settings-outline";

  return @[inspector, remoteDebug, fastRefresh, perfMonitor, settings];
}

- (EXDevMenuActionReaction)devMenuManager:(nonnull EXDevMenuManager *)manager dispatchesAction:(nonnull NSString *)actionId
{
  RCTDevSettings *devSettings = [self moduleInstanceNamed:@"DevSettings"];

  if (!devSettings) {
    return EXDevMenuActionReactionNone;
  }
  if ([actionId isEqualToString:@"dev-reload"]) {
    // bridge could be an RCTBridge of any version and we need to cast it since ARC needs to know
    // the return type
//    [(RCTBridgeHack *)bridge reload];
    return EXDevMenuActionReactionClose;
  }
  if ([actionId isEqualToString:@"dev-remote-debug"]) {
    devSettings.isDebuggingRemotely = !devSettings.isDebuggingRemotely;
    return EXDevMenuActionReactionClose;
  }
  if ([actionId isEqualToString:@"dev-profiler"]) {
    devSettings.isProfilingEnabled = !devSettings.isProfilingEnabled;
    return EXDevMenuActionReactionClose;
  }
  if ([actionId isEqualToString:@"dev-hmr"]) {
    devSettings.isHotLoadingEnabled = !devSettings.isHotLoadingEnabled;
    return EXDevMenuActionReactionClose;
  }
  if ([actionId isEqualToString:@"dev-inspector"]) {
    [devSettings toggleElementInspector];
    return EXDevMenuActionReactionClose;
  }
  if ([actionId isEqualToString:@"dev-perf-monitor"]) {
    id perfMonitor = [self moduleInstanceNamed:@"PerfMonitor"];

    if (perfMonitor) {
      if (devSettings.isPerfMonitorShown) {
//        [perfMonitor hide];
        devSettings.isPerfMonitorShown = NO;
      } else {
//        [perfMonitor show];
        devSettings.isPerfMonitorShown = YES;
      }
      return EXDevMenuActionReactionClose;
    }
  }
  return EXDevMenuActionReactionNone;
}

#pragma mark - internal

- (id)moduleInstanceNamed:(NSString *)name
{
  id<EXDevMenuModuleDataProvider> bridge = self.bridge;
  return [[bridge moduleDataForName:name] instance];
}

@end
