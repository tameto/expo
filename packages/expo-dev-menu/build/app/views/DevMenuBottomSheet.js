import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Dimensions, } from 'react-native';
import Animated from 'react-native-reanimated';
import DevMenuContext from '../DevMenuContext';
import { closeMenuAsync } from '../DevMenuInternal';
import Colors from '../constants/Colors';
import * as DevMenu from './DevMenuModule';
import ScrollBottomSheet from './ScrollBottomSheet';
let DevMenuBottomSheet = /** @class */ (() => {
    class DevMenuBottomSheet extends React.PureComponent {
        constructor() {
            super(...arguments);
            this.ref = React.createRef();
            // snapPoints = [0, Math.max(BottomSheet.renumber('50%'), 600), '90%'];
            this.snapPoints = ['10%', '35%', '100%'];
            this.callbackNode = new Animated.Value(0);
            this.backgroundOpacity = this.callbackNode.interpolate({
                inputRange: [0, 1],
                // outputRange: [0.5, 0],
                outputRange: [0, 0.5],
            });
            this.closeSubscription = null;
            this.collapse = () => {
                this.ref.current && this.ref.current.snapTo(this.snapPoints.length - 1);
                // Use setTimeout until there is a better solution to execute something once the sheet is fully collapsed.
                return new Promise(resolve => setTimeout(resolve, 300));
            };
            this.collapseAndClose = async () => {
                await this.collapse();
                await closeMenuAsync();
            };
            this.expand = () => {
                this.ref.current && this.ref.current.snapTo(1);
            };
            this.unsubscribeCloseSubscription = () => {
                if (this.closeSubscription) {
                    this.closeSubscription.remove();
                    this.closeSubscription = null;
                }
            };
            this.onCloseEnd = () => {
                this.collapseAndClose();
            };
            this.providedContext = {
                expand: this.expand,
                collapse: this.collapse,
            };
            this.renderContent = () => {
                return React.createElement(View, { style: styles.bottomSheetContent }, this.props.children);
            };
            this.innerRef = React.createRef();
        }
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
        render() {
            const providedContext = {
                ...this.props,
                ...this.providedContext,
            };
            return (React.createElement(DevMenuContext.Provider, { value: providedContext },
                React.createElement(View, { style: styles.bottomSheetContainer },
                    React.createElement(TouchableWithoutFeedback, { onPress: this.collapseAndClose },
                        React.createElement(Animated.View, { style: [styles.bottomSheetBackground, { opacity: this.backgroundOpacity }] })),
                    React.createElement(ScrollBottomSheet, { ref: this.ref, componentType: "ScrollView", snapPoints: this.snapPoints, initialSnapIndex: this.snapPoints.length - 1, animatedPosition: this.callbackNode, renderHandle: () => null, 
                        // contentContainerStyle={{ flex: 1 }}
                        style: styles.bottomSheet }, this.renderContent()))));
        }
    }
    DevMenuBottomSheet.contextType = DevMenuContext;
    return DevMenuBottomSheet;
})();
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
        height: Dimensions.get('window').height,
        // paddingTop: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: Colors.dark.menuBackground,
        overflow: 'hidden',
    },
    bottomSheetContent: {
        flex: 1,
        backgroundColor: 'green',
    },
});
export default DevMenuBottomSheet;
//# sourceMappingURL=DevMenuBottomSheet.js.map