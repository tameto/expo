import { NativeModulesProxy } from '@unimodules/core';
import { NativeModules } from 'react-native';
import { ColorSchemeName } from 'react-native-appearance';

const DevMenu = NativeModules.ExpoDevMenuInternal;

// Mock ExpoFontLoader unimodule - we don't have access to unimodules from dev menu app.
if (!NativeModulesProxy.ExpoFontLoader) {
  NativeModulesProxy.ExpoFontLoader = {
    addListener() {},
    removeListeners() {},
    async loadAsync() {},
  };
}

export enum DevMenuItemEnum {
  ACTION = 1,
  GROUP = 2,
}

type DevMenuItemBaseType<T extends DevMenuItemEnum> = {
  type: T;
  isAvailable: boolean;
  isEnabled: boolean;
  label?: string | null;
  detail?: string | null;
  glyphName?: string | null;
};

export type DevMenuItemActionType = DevMenuItemBaseType<DevMenuItemEnum.ACTION> & {
  actionId: string;
};

export type DevMenuItemGroupType = DevMenuItemBaseType<DevMenuItemEnum.GROUP> & {
  groupName: string | null;
  items: DevMenuItemAnyType[];
};

export type DevMenuItemAnyType = DevMenuItemActionType | DevMenuItemGroupType;

export type DevMenuSettingsType = {
  preferredAppearance?: ColorSchemeName;
  motionGestureEnabled?: boolean;
  touchGestureEnabled?: boolean;
};

export async function getSettingsAsync(): Promise<DevMenuSettingsType> {
  return {
    preferredAppearance: 'no-preference',
    motionGestureEnabled: true,
    touchGestureEnabled: true,
  };
}

export async function updateSettingsAsync() {}

export async function closeMenuAsync() {
  return DevMenu.closeMenuAsync();
}

export async function dispatchActionAsync(actionId: string): Promise<void> {
  return await DevMenu.dispatchActionAsync(actionId);
}

export default {
  getSettingsAsync,
  updateSettingsAsync,
  closeMenuAsync,
};
