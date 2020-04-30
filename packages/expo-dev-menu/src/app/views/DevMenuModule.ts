import { DeviceEventEmitter, NativeModules, EventSubscription } from 'react-native';

const NativeKernel = NativeModules.ExponentKernel;
const DevMenu = NativeModules.ExpoDevMenuInternal;

export type DevMenuSettings = {
  devMenuSettings: null | {
    motionGestureEnabled: boolean;
    touchGestureEnabled: boolean;
  };
};

export type DevMenuItem = {
  label: string;
  isEnabled: boolean;
  detail?: string;
};

/* New API */

export async function closeAsync(): Promise<void> {
  return await DevMenu.closeMenuAsync();
}

export async function dispatchActionAsync(actionId: string): Promise<void> {
  return await DevMenu.dispatchActionAsync(actionId);
}

/* Old API */

export async function getSettingsAsync(): Promise<DevMenuSettings | null> {
  if (!NativeKernel.getDevMenuSettingsAsync) {
    return null;
  }
  return await NativeKernel.getDevMenuSettingsAsync();
}

export async function setSettingAsync(key, value): Promise<void> {
  await NativeKernel.setDevMenuSettingAsync(key, value);
}

export async function doesCurrentTaskEnableDevtoolsAsync(): Promise<boolean> {
  return await NativeKernel.doesCurrentTaskEnableDevtoolsAsync();
}

export async function getItemsToShowAsync(): Promise<{ [key: string]: DevMenuItem }> {
  return await NativeKernel.getDevMenuItemsToShowAsync();
}

export async function isOnboardingFinishedAsync(): Promise<boolean> {
  return await NativeKernel.getIsOnboardingFinishedAsync();
}

export async function setOnboardingFinishedAsync(finished: boolean): Promise<void> {
  await NativeKernel.setIsOnboardingFinishedAsync(finished);
}

export async function selectItemWithKeyAsync(key: string): Promise<void> {
  await NativeKernel.selectDevMenuItemWithKeyAsync(key);
}

export async function reloadAppAsync(): Promise<void> {
  await NativeKernel.reloadAppAsync();
}

export async function goToHomeAsync(): Promise<void> {
  await NativeKernel.goToHomeAsync();
}

export function listenForCloseRequests(listener: () => void): EventSubscription {
  return addListenerWithNativeCallback('ExponentKernel.requestToCloseDevMenu', listener);
}

function addListenerWithNativeCallback(eventName, eventListener): EventSubscription {
  return DeviceEventEmitter.addListener(eventName, async event => {
    try {
      let result = await eventListener(event);
      if (!result) {
        result = {};
      }
      NativeKernel.onEventSuccess(event.eventId, result);
    } catch (e) {
      NativeKernel.onEventFailure(event.eventId, e.message);
    }
  });
}

export default addListenerWithNativeCallback;
