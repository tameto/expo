import * as React from 'react';
import { useTheme } from 'react-navigation';
import { StyleSheet, View, ScrollView } from 'react-native';
import TouchableNativeFeedbackSafe from '@expo/react-native-touchable-native-feedback-safe';
import Colors from '../constants/Colors';
function useThemeBackgroundColor(props, colorName) {
    let theme = useTheme();
    let colorFromProps = props[`${theme}BackgroundColor`];
    if (colorFromProps) {
        return colorFromProps;
    }
    else {
        return Colors[theme][colorName];
    }
}
function useThemeBorderColor(props, colorName) {
    let theme = useTheme();
    let colorFromProps = props[`${theme}BorderColor`];
    if (colorFromProps) {
        return colorFromProps;
    }
    else {
        return Colors[theme][colorName];
    }
}
export const StyledScrollView = React.forwardRef((props, ref) => {
    let { style, ...otherProps } = props;
    let backgroundColor = useThemeBackgroundColor(props, 'absolute');
    return React.createElement(ScrollView, Object.assign({}, otherProps, { style: [{ backgroundColor }, style], ref: ref }));
});
export const Separator = (props) => {
    let theme = useTheme();
    let { style, ...otherProps } = props;
    return (React.createElement(View, Object.assign({ style: [styles.separator, { backgroundColor: Colors[theme].separator }, style] }, otherProps)));
};
export const SectionLabelContainer = (props) => {
    let theme = useTheme();
    let { style, ...otherProps } = props;
    return (React.createElement(View, Object.assign({ style: [
            styles.sectionLabelContainer,
            { backgroundColor: Colors[theme].sectionLabelBackgroundColor },
            style,
        ] }, otherProps)));
};
export const GenericCardContainer = (props) => {
    let theme = useTheme();
    let { style, ...otherProps } = props;
    return (React.createElement(View, Object.assign({ style: [
            styles.genericCardContainer,
            {
                backgroundColor: Colors[theme].cardBackground,
                borderBottomColor: Colors[theme].cardSeparator,
            },
            style,
        ] }, otherProps)));
};
export const GenericCardBody = (props) => {
    let { style, ...otherProps } = props;
    return React.createElement(View, Object.assign({ style: [styles.genericCardBody, style] }, otherProps));
};
export const StyledView = (props) => {
    let { style, lightBackgroundColor: _lightBackgroundColor, darkBackgroundColor: _darkBackgroundColor, lightBorderColor: _lightBorderColor, darkBorderColor: _darkBorderColor, ...otherProps } = props;
    let backgroundColor = useThemeBackgroundColor(props, 'cardBackground');
    let borderColor = useThemeBorderColor(props, 'cardSeparator');
    return (React.createElement(View, Object.assign({ style: [
            {
                backgroundColor,
                borderColor,
            },
            style,
        ] }, otherProps)));
};
// Extend this if you ever need to customize ripple color
function useRippleColor(_props) {
    let theme = useTheme();
    return theme === 'light' ? '#ccc' : '#fff';
}
export const StyledButton = (props) => {
    let { style, lightBackgroundColor: _lightBackgroundColor, darkBackgroundColor: _darkBackgroundColor, lightBorderColor: _lightBorderColor, darkBorderColor: _darkBorderColor, ...otherProps } = props;
    let backgroundColor = useThemeBackgroundColor(props, 'cardBackground');
    let borderColor = useThemeBorderColor(props, 'cardSeparator');
    let rippleColor = useRippleColor(props);
    return (React.createElement(TouchableNativeFeedbackSafe, Object.assign({ background: TouchableNativeFeedbackSafe.Ripple(rippleColor, false), style: [
            {
                backgroundColor,
                borderColor,
            },
            style,
        ] }, otherProps)));
};
export const StyledIcon = (props) => {
    const theme = useTheme();
    const { component: Component, color, ...rest } = props;
    return React.createElement(Component, Object.assign({}, rest, { color: Colors[theme]?.[color] }));
};
const styles = StyleSheet.create({
    separator: {
        height: StyleSheet.hairlineWidth * 2,
        flex: 1,
    },
    sectionLabelContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    genericCardContainer: {
        flexGrow: 1,
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
    },
    genericCardBody: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 10,
        paddingBottom: 17,
    },
});
//# sourceMappingURL=Views.js.map