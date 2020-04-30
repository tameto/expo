import { DeviceEventEmitter, NativeModules } from 'react-native';
const NativeKernel = NativeModules.ExponentKernel;
const DevMenu = NativeModules.ExpoDevMenuInternal;
/* New API */
export async function closeAsync() {
    return await DevMenu.closeMenuAsync();
}
export async function dispatchActionAsync(actionId) {
    return await DevMenu.dispatchActionAsync(actionId);
}
/* Old API */
export async function getSettingsAsync() {
    if (!NativeKernel.getDevMenuSettingsAsync) {
        return null;
    }
    return await NativeKernel.getDevMenuSettingsAsync();
}
export async function setSettingAsync(key, value) {
    await NativeKernel.setDevMenuSettingAsync(key, value);
}
export async function doesCurrentTaskEnableDevtoolsAsync() {
    return await NativeKernel.doesCurrentTaskEnableDevtoolsAsync();
}
export async function getItemsToShowAsync() {
    return await NativeKernel.getDevMenuItemsToShowAsync();
}
export async function isOnboardingFinishedAsync() {
    return await NativeKernel.getIsOnboardingFinishedAsync();
}
export async function setOnboardingFinishedAsync(finished) {
    await NativeKernel.setIsOnboardingFinishedAsync(finished);
}
export async function selectItemWithKeyAsync(key) {
    await NativeKernel.selectDevMenuItemWithKeyAsync(key);
}
export async function reloadAppAsync() {
    await NativeKernel.reloadAppAsync();
}
export async function goToHomeAsync() {
    await NativeKernel.goToHomeAsync();
}
export function listenForCloseRequests(listener) {
    return addListenerWithNativeCallback('ExponentKernel.requestToCloseDevMenu', listener);
}
function addListenerWithNativeCallback(eventName, eventListener) {
    return DeviceEventEmitter.addListener(eventName, async (event) => {
        try {
            let result = await eventListener(event);
            if (!result) {
                result = {};
            }
            NativeKernel.onEventSuccess(event.eventId, result);
        }
        catch (e) {
            NativeKernel.onEventFailure(event.eventId, e.message);
        }
    });
}
export default addListenerWithNativeCallback;
//# sourceMappingURL=DevMenuModule.js.map