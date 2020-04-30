import React from 'react';
import { StyleSheet, PixelRatio, View } from 'react-native';
import { DevMenuItemEnum, dispatchActionAsync, } from '../DevMenuInternal';
import { StyledView } from '../components/Views';
import Colors from '../constants/Colors';
import DevMenuButton from './DevMenuButton';
class DevMenuItem extends React.PureComponent {
    render() {
        const { item } = this.props;
        switch (item.type) {
            case DevMenuItemEnum.ACTION:
                return React.createElement(DevMenuItemAction, { item: item });
            case DevMenuItemEnum.GROUP:
                return React.createElement(DevMenuItemsList, { items: item.items });
            default:
                return null;
        }
    }
}
class DevMenuItemAction extends React.PureComponent {
    render() {
        const { actionId, isAvailable, label, detail, glyphName } = this.props.item;
        return (React.createElement(StyledView, { style: styles.itemWrapper, lightBackgroundColor: Colors.light.menuItemBackground, lightBorderColor: Colors.light.menuItemBorderColor, darkBackgroundColor: Colors.dark.menuItemBackground, darkBorderColor: Colors.dark.menuItemBorderColor },
            React.createElement(DevMenuButton, { buttonKey: actionId, label: label || '', onPress: dispatchActionAsync, icon: glyphName, isEnabled: isAvailable, detail: detail || '' })));
    }
}
export default class DevMenuItemsList extends React.PureComponent {
    render() {
        const { items } = this.props;
        return (React.createElement(View, { style: styles.group }, items.map((item, index) => (React.createElement(DevMenuItem, { key: index, item: item })))));
    }
}
const pixel = 1 / PixelRatio.get();
const styles = StyleSheet.create({
    group: {
        marginVertical: 3,
        marginHorizontal: -pixel,
    },
    itemWrapper: {
        borderTopWidth: pixel,
        borderBottomWidth: pixel,
        marginTop: -pixel,
    },
});
//# sourceMappingURL=DevMenuItemsList.js.map