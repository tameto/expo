import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity as TouchableOpacityRN, View } from 'react-native';
import { TouchableOpacity as TouchableOpacityGH } from 'react-native-gesture-handler';
import { StyledText } from '../components/Text';
import { StyledIcon } from '../components/Views';
import Colors from '../constants/Colors';
// When rendered inside bottom sheet, touchables from RN don't work on Android, but the ones from GH don't work on iOS.
const TouchableOpacity = Platform.OS === 'android' ? TouchableOpacityGH : TouchableOpacityRN;
const LIGHT_DISABLED_TEXT_COLOR = '#9ca0a6';
const DARK_DISABLED_TEXT_COLOR = 'rgba(255, 255, 255, 0.7)';
let DevMenuButton = /** @class */ (() => {
    class DevMenuButton extends React.PureComponent {
        constructor() {
            super(...arguments);
            this.state = {
                showDetails: true,
            };
            this.onPress = () => {
                if (this.props.onPress) {
                    this.props.onPress(this.props.buttonKey);
                }
            };
        }
        renderButtonIcon(icon, isEnabled) {
            if (!icon) {
                return null;
            }
            return (React.createElement(View, { style: styles.buttonIcon },
                React.createElement(StyledIcon, { component: MaterialCommunityIcons, name: icon, size: 22, color: "menuItemText" })));
        }
        renderLabel(label, enabled) {
            if (enabled) {
                return (React.createElement(StyledText, { style: styles.buttonText, lightColor: Colors.light.menuItemText, darkColor: Colors.dark.menuItemText }, label));
            }
            else {
                return (React.createElement(StyledText, { style: styles.buttonText, lightColor: LIGHT_DISABLED_TEXT_COLOR, darkColor: DARK_DISABLED_TEXT_COLOR }, label));
            }
        }
        renderDetail(detail) {
            return (React.createElement(StyledText, { style: [styles.buttonText, styles.buttonDetailsText], darkColor: DARK_DISABLED_TEXT_COLOR, lightColor: LIGHT_DISABLED_TEXT_COLOR }, detail ? detail : 'Only available in development mode.'));
        }
        render() {
            const { label, icon, isEnabled, detail } = this.props;
            const { showDetails } = this.state;
            return (React.createElement(TouchableOpacity, { style: styles.button, onPress: this.onPress, disabled: !isEnabled, activeOpacity: 0.6 },
                this.renderButtonIcon(icon, !!isEnabled),
                React.createElement(View, { style: styles.buttonRow },
                    this.renderLabel(label, !!isEnabled),
                    !isEnabled && showDetails && this.renderDetail(detail))));
        }
    }
    DevMenuButton.defaultProps = {
        isEnabled: true,
    };
    return DevMenuButton;
})();
const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 12,
    },
    buttonRow: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    buttonIcon: {
        marginHorizontal: 14,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'left',
    },
    buttonDetailsText: {
        marginTop: 1,
        fontSize: 12,
        fontWeight: 'normal',
    },
});
export default DevMenuButton;
//# sourceMappingURL=DevMenuButton.js.map