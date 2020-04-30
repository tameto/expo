import React from 'react';
import { Clipboard, StyleSheet, PixelRatio } from 'react-native';

import DevMenuInternal, { DevMenuItemAnyType, DevMenuItemEnum } from '../DevMenuInternal';
import { StyledView } from '../components/Views';
import Colors from '../constants/Colors';
import DevMenuBottomSheetContext, { Context } from '../DevMenuContext';
// import DevMenuCloseButton from './DevMenuCloseButton';
import DevMenuItemsList from './DevMenuItemsList';
import * as DevMenu from './DevMenuModule';
import DevMenuOnboarding from './DevMenuOnboarding';
import DevMenuTaskInfo from './DevMenuTaskInfo';

type Props = {
  appInfo: { [key: string]: any };
  uuid: string;
  devMenuItems: DevMenuItemAnyType[];
  enableDevelopmentTools: boolean;
  showOnboardingView: boolean;
};

type State = {
  isOnboardingFinished: boolean;
};

class DevMenuView extends React.PureComponent<Props, State> {
  static contextType = DevMenuBottomSheetContext;

  context!: Context;

  constructor(props: Props, context: Context) {
    super(props, context);

    this.state = {
      isOnboardingFinished: !props.showOnboardingView,
    };
  }

  collapse = async () => {
    if (this.context) {
      await this.context.collapse();
    }
  };

  collapseAndCloseDevMenuAsync = async () => {
    await this.collapse();
    await DevMenuInternal.closeMenuAsync();
  };

  onAppReload = () => {
    this.collapse();
    DevMenu.reloadAppAsync();
  };

  onCopyTaskUrl = async () => {
    const { manifestUrl } = this.props.appInfo;

    await this.collapseAndCloseDevMenuAsync();
    Clipboard.setString(manifestUrl);
    alert(`Copied "${manifestUrl}" to the clipboard!`);
  };

  onGoToHome = () => {
    this.collapse();
    DevMenu.goToHomeAsync();
  };

  onPressDevMenuButton = key => {
    DevMenu.selectItemWithKeyAsync(key);
  };

  onOnboardingFinished = () => {
    DevMenu.setOnboardingFinishedAsync(true);
    this.setState({ isOnboardingFinished: true });
  };

  renderItems() {
    const { appInfo } = this.props;
    const items: DevMenuItemAnyType[] = [];

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
    return <DevMenuItemsList items={items} />;
  }

  renderContent() {
    const { appInfo } = this.props;
    const { isOnboardingFinished } = this.state;

    return (
      <>
        {!isOnboardingFinished && <DevMenuOnboarding onClose={this.onOnboardingFinished} />}

        <StyledView
          style={styles.appInfo}
          lightBackgroundColor={Colors.light.menuAppInfoBackground}
          lightBorderColor={Colors.light.menuAppInfoBorder}
          darkBackgroundColor={Colors.dark.menuAppInfoBackground}
          darkBorderColor={Colors.dark.menuAppInfoBorder}>
          <DevMenuTaskInfo task={appInfo} />
        </StyledView>

        <StyledView
          style={styles.itemsContainer}
          lightBackgroundColor={Colors.light.menuBackground}
          darkBackgroundColor={Colors.dark.menuBackground}>
          {this.renderItems()}
        </StyledView>

        {/* <DevMenuCloseButton
          style={styles.closeButton}
          onPress={this.collapseAndCloseDevMenuAsync}
        /> */}
      </>
    );
  }

  render() {
    return (
      <StyledView
        style={styles.container}
        lightBackgroundColor={Colors.light.menuBackground}
        lightBorderColor={Colors.light.menuItemBorderColor}
        darkBackgroundColor={Colors.dark.menuBackground}
        darkBorderColor={Colors.dark.menuItemBorderColor}>
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
        {this.renderContent()}
      </StyledView>
    );
  }
}

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
    zIndex: 3, // should be higher than zIndex of onboarding container
  },
});

export default DevMenuView;
