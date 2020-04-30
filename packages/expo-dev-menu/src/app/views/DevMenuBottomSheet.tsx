import React from 'react';
import { EventSubscription, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated from 'react-native-reanimated';

import DevMenuContext from '../DevMenuContext';
import { closeMenuAsync } from '../DevMenuInternal';
import Colors from '../constants/Colors';
import * as DevMenu from './DevMenuModule';
import ScrollBottomSheet from './ScrollBottomSheet';

type Props = {
  uuid: string;
};

class DevMenuBottomSheet extends React.PureComponent<Props, any> {
  static contextType = DevMenuContext;

  ref = React.createRef<ScrollBottomSheet<any>>();

  // snapPoints = [0, Math.max(BottomSheet.renumber('50%'), 600), '90%'];
  snapPoints = ['10%', '35%', '100%'];

  callbackNode = new Animated.Value(0);

  backgroundOpacity = this.callbackNode.interpolate({
    inputRange: [0, 1],
    // outputRange: [0.5, 0],
    outputRange: [0, 0.5],
  });

  closeSubscription: EventSubscription | null = null;

  componentDidMount() {
    this.expand();

    // Before the dev menu can be actually closed, we need to collapse its sheet view,
    // and this listens for close requests that come from native side to start collapsing the view.
    // The awaited return value of this listener is then send back as a response
    // so the native module knows when it can fully close dev menu (detach its root view).
    this.closeSubscription = DevMenu.listenForCloseRequests(() => {
      // Unsubscribe immediately so we don't accidentally collapse twice.
      // Also componentWillUnmount is not called (why?) when the app is hot reloading this component,
      // despite the componentDidMount is later called after first render.
      this.unsubscribeCloseSubscription();

      // `collapse` returns a promise, so this `return` is important to finish the close event once the view is fully collapsed.
      return this.collapse();
    });
  }

  componentDidUpdate(prevProps) {
    // Make sure it gets expanded once we receive new identifier.
    if (prevProps.uuid !== this.props.uuid) {
      this.expand();
    }
  }

  componentWillUnmount() {
    this.unsubscribeCloseSubscription();
  }

  collapse = (): Promise<void> => {
    this.ref.current && this.ref.current.snapTo(this.snapPoints.length - 1);

    // Use setTimeout until there is a better solution to execute something once the sheet is fully collapsed.
    return new Promise(resolve => setTimeout(resolve, 300));
  };

  collapseAndClose = async () => {
    await this.collapse();
    await closeMenuAsync();
  };

  expand = () => {
    this.ref.current && this.ref.current.snapTo(1);
  };

  unsubscribeCloseSubscription = () => {
    if (this.closeSubscription) {
      this.closeSubscription.remove();
      this.closeSubscription = null;
    }
  };

  onCloseEnd = () => {
    this.collapseAndClose();
  };

  providedContext = {
    expand: this.expand,
    collapse: this.collapse,
  };

  onLayout = ({ nativeEvent }) => {
    console.log(nativeEvent);
  };

  renderContent = () => {
    return <View style={styles.bottomSheetContent}>{this.props.children}</View>;
  };

  innerRef = React.createRef();

  render() {
    const providedContext = {
      ...this.props,
      ...this.providedContext,
    };

    return (
      <DevMenuContext.Provider value={providedContext}>
        <View style={styles.bottomSheetContainer}>
          <TouchableWithoutFeedback onPress={this.collapseAndClose}>
            <Animated.View
              style={[styles.bottomSheetBackground, { opacity: this.backgroundOpacity }]}
            />
          </TouchableWithoutFeedback>
          <ScrollBottomSheet
            ref={this.ref}
            componentType="ScrollView"
            snapPoints={this.snapPoints}
            initialSnapIndex={this.snapPoints.length - 1}
            animatedPosition={this.callbackNode}
            renderHandle={() => null}
            contentContainerStyle={styles.bottomSheetContentContainer}
            style={styles.bottomSheet}>
            {this.renderContent()}
          </ScrollBottomSheet>
        </View>
      </DevMenuContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  bottomSheetBackground: {
    flex: 1,
    backgroundColor: '#000',
  },
  bottomSheet: {
    flex: 1,
    // height: Dimensions.get('window').height,
    // paddingTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // backgroundColor: Colors.dark.menuBackground,
    // overflow: 'hidden',
    // ...StyleSheet.absoluteFillObject,
  },
  bottomSheetContentContainer: {
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // flex: 1,
    // height: Dimensions.get('window').height,
    backgroundColor: 'magenta',
  },
  bottomSheetContent: {
    // flex: 1,
    // minHeight: '100%',
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    // ...StyleSheet.absoluteFillObject,
    backgroundColor: 'green',
  },
});

export default DevMenuBottomSheet;
