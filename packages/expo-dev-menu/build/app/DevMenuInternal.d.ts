import { ColorSchemeName } from 'react-native-appearance';
export declare enum DevMenuItemEnum {
    ACTION = 1,
    GROUP = 2
}
declare type DevMenuItemBaseType<T extends DevMenuItemEnum> = {
    type: T;
    isAvailable: boolean;
    isEnabled: boolean;
    label?: string | null;
    detail?: string | null;
    glyphName?: string | null;
};
export declare type DevMenuItemActionType = DevMenuItemBaseType<DevMenuItemEnum.ACTION> & {
    actionId: string;
};
export declare type DevMenuItemGroupType = DevMenuItemBaseType<DevMenuItemEnum.GROUP> & {
    groupName: string | null;
    items: DevMenuItemAnyType[];
};
export declare type DevMenuItemAnyType = DevMenuItemActionType | DevMenuItemGroupType;
export declare type DevMenuSettingsType = {
    preferredAppearance?: ColorSchemeName;
    motionGestureEnabled?: boolean;
    touchGestureEnabled?: boolean;
};
export declare function getSettingsAsync(): Promise<DevMenuSettingsType>;
export declare function updateSettingsAsync(): Promise<void>;
export declare function closeMenuAsync(): Promise<any>;
export declare function dispatchActionAsync(actionId: string): Promise<void>;
declare const _default: {
    getSettingsAsync: typeof getSettingsAsync;
    updateSettingsAsync: typeof updateSettingsAsync;
    closeMenuAsync: typeof closeMenuAsync;
};
export default _default;
