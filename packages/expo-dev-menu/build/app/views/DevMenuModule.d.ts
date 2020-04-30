import { EventSubscription } from 'react-native';
export declare type DevMenuSettings = {
    devMenuSettings: null | {
        motionGestureEnabled: boolean;
        touchGestureEnabled: boolean;
    };
};
export declare type DevMenuItem = {
    label: string;
    isEnabled: boolean;
    detail?: string;
};
export declare function closeAsync(): Promise<void>;
export declare function dispatchActionAsync(actionId: string): Promise<void>;
export declare function getSettingsAsync(): Promise<DevMenuSettings | null>;
export declare function setSettingAsync(key: any, value: any): Promise<void>;
export declare function doesCurrentTaskEnableDevtoolsAsync(): Promise<boolean>;
export declare function getItemsToShowAsync(): Promise<{
    [key: string]: DevMenuItem;
}>;
export declare function isOnboardingFinishedAsync(): Promise<boolean>;
export declare function setOnboardingFinishedAsync(finished: boolean): Promise<void>;
export declare function selectItemWithKeyAsync(key: string): Promise<void>;
export declare function reloadAppAsync(): Promise<void>;
export declare function goToHomeAsync(): Promise<void>;
export declare function listenForCloseRequests(listener: () => void): EventSubscription;
declare function addListenerWithNativeCallback(eventName: any, eventListener: any): EventSubscription;
export default addListenerWithNativeCallback;
