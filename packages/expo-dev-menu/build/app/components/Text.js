import * as React from 'react';
import { useTheme } from 'react-navigation';
import { Platform, StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';
function useThemeColor(props, colorName) {
    let theme = useTheme();
    let colorFromProps = props[`${theme}Color`];
    if (colorFromProps) {
        return colorFromProps;
    }
    else {
        return Colors[theme][colorName];
    }
}
export const SectionLabelText = (props) => {
    let { style, ...otherProps } = props;
    let color = useThemeColor(props, 'sectionLabelText');
    return React.createElement(Text, Object.assign({ style: [styles.sectionLabelText, { color }, style] }, otherProps));
};
export const GenericCardTitle = (props) => {
    let { style, ...otherProps } = props;
    let color = useThemeColor(props, 'cardTitle');
    return React.createElement(Text, Object.assign({ style: [styles.genericCardTitle, { color }, style] }, otherProps));
};
export const StyledText = (props) => {
    let { style, ...otherProps } = props;
    let color = useThemeColor(props, 'text');
    return React.createElement(Text, Object.assign({ style: [{ color }, style] }, otherProps));
};
const styles = StyleSheet.create({
    sectionLabelText: {
        letterSpacing: 0.92,
        ...Platform.select({
            ios: {
                fontWeight: '500',
                fontSize: 11,
            },
            android: {
                fontWeight: '400',
                fontSize: 12,
            },
        }),
    },
    genericCardTitle: {
        color: Colors.light.blackText,
        fontSize: 16,
        marginRight: 50,
        marginBottom: 2,
        fontWeight: '400',
    },
});
//# sourceMappingURL=Text.js.map