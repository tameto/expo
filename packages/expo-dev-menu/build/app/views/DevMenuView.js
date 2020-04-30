import React from 'react';
import { Clipboard, StyleSheet, PixelRatio } from 'react-native';
import DevMenuInternal, { DevMenuItemEnum } from '../DevMenuInternal';
import { StyledView } from '../components/Views';
import Colors from '../constants/Colors';
import DevMenuBottomSheetContext from '../DevMenuContext';
// import DevMenuCloseButton from './DevMenuCloseButton';
import DevMenuItemsList from './DevMenuItemsList';
import * as DevMenu from './DevMenuModule';
import DevMenuOnboarding from './DevMenuOnboarding';
import DevMenuTaskInfo from './DevMenuTaskInfo';
let DevMenuView = /** @class */ (() => {
    class DevMenuView extends React.PureComponent {
        constructor(props, context) {
            super(props, context);
            this.collapse = async () => {
                if (this.context) {
                    await this.context.collapse();
                }
            };
            this.collapseAndCloseDevMenuAsync = async () => {
                await this.collapse();
                await DevMenuInternal.closeMenuAsync();
            };
            this.onAppReload = () => {
                this.collapse();
                DevMenu.reloadAppAsync();
            };
            this.onCopyTaskUrl = async () => {
                const { manifestUrl } = this.props.appInfo;
                await this.collapseAndCloseDevMenuAsync();
                Clipboard.setString(manifestUrl);
                alert(`Copied "${manifestUrl}" to the clipboard!`);
            };
            this.onGoToHome = () => {
                this.collapse();
                DevMenu.goToHomeAsync();
            };
            this.onPressDevMenuButton = key => {
                DevMenu.selectItemWithKeyAsync(key);
            };
            this.onOnboardingFinished = () => {
                DevMenu.setOnboardingFinishedAsync(true);
                this.setState({ isOnboardingFinished: true });
            };
            this.state = {
                isOnboardingFinished: !props.showOnboardingView,
            };
        }
        renderItems() {
            const { appInfo } = this.props;
            const items = [];
            items.push({
                type: DevMenuItemEnum.ACTION,
                isAvailable: true,
                isEnabled: true,
                label: 'Reload',
                actionId: 'reload',
                glyphName: 'reload',
            });
            if (appInfo && appInfo.manifestUrl) {
                items.push({
                    type: DevMenuItemEnum.ACTION,
                    isAvailable: true,
                    isEnabled: true,
                    label: 'Copy link to clipboard',
                    actionId: 'copy',
                    glyphName: 'clipboard-text',
                });
            }
            items.push({
                type: DevMenuItemEnum.ACTION,
                isAvailable: true,
                isEnabled: true,
                label: 'Go to Home',
                actionId: 'home',
                glyphName: 'home',
            });
            if (this.props.enableDevelopmentTools && this.props.devMenuItems) {
                items.push(...this.props.devMenuItems);
            }
            return React.createElement(DevMenuItemsList, { items: items });
        }
        renderContent() {
            const { appInfo } = this.props;
            const { isOnboardingFinished } = this.state;
            return (React.createElement(React.Fragment, null,
                !isOnboardingFinished && React.createElement(DevMenuOnboarding, { onClose: this.onOnboardingFinished }),
                React.createElement(StyledView, { style: styles.appInfo, lightBackgroundColor: Colors.light.menuAppInfoBackground, lightBorderColor: Colors.light.menuAppInfoBorder, darkBackgroundColor: Colors.dark.menuAppInfoBackground, darkBorderColor: Colors.dark.menuAppInfoBorder },
                    React.createElement(DevMenuTaskInfo, { task: appInfo })),
                React.createElement(StyledView, { style: styles.itemsContainer, lightBackgroundColor: Colors.light.menuBackground, darkBackgroundColor: Colors.dark.menuBackground }, this.renderItems())));
        }
        render() {
            return (React.createElement(StyledView, { style: styles.container, lightBackgroundColor: Colors.light.menuBackground, lightBorderColor: Colors.light.menuItemBorderColor, darkBackgroundColor: Colors.dark.menuBackground, darkBorderColor: Colors.dark.menuItemBorderColor },
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent(),
                this.renderContent()));
        }
    }
    DevMenuView.contextType = DevMenuBottomSheetContext;
    return DevMenuView;
})();
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appInfo: {
        borderBottomWidth: 1 / PixelRatio.get(),
    },
    itemsContainer: {
        paddingTop: 6,
    },
    closeButton: {
        position: 'absolute',
        right: 12,
        top: 12,
        zIndex: 3,
    },
});
export default DevMenuView;
//# sourceMappingURL=DevMenuView.js.map