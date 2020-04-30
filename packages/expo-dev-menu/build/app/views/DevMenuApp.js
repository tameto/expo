import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { ThemeContext } from 'react-navigation';
import * as DevMenuInternal from '../DevMenuInternal';
import DevMenuMainScreen from '../screens/DevMenuMainScreen';
import DevMenuBottomSheet from './DevMenuBottomSheet';
function useUserSettings(renderId) {
    const [settings, setSettings] = React.useState({});
    React.useEffect(() => {
        async function getUserSettings() {
            const settings = await DevMenuInternal.getSettingsAsync();
            setSettings(settings);
        }
        getUserSettings();
    }, [renderId]);
    return settings;
}
export default class DevMenuRoot extends React.PureComponent {
    render() {
        return React.createElement(DevMenuApp, Object.assign({}, this.props));
    }
}
const Stack = createStackNavigator();
function DevMenuApp(props) {
    const colorScheme = useColorScheme();
    const { preferredAppearance = 'no-preference' } = useUserSettings(props.uuid);
    let theme = preferredAppearance === 'no-preference' ? colorScheme : preferredAppearance;
    if (theme === 'no-preference') {
        theme = 'light';
    }
    return (React.createElement(NavigationContainer, null,
        React.createElement(AppearanceProvider, { style: styles.rootView },
            React.createElement(ThemeContext.Provider, { value: theme },
                React.createElement(DevMenuBottomSheet, Object.assign({}, props),
                    React.createElement(Stack.Navigator, { initialRouteName: "Main", headerMode: "float", mode: "modal" },
                        React.createElement(Stack.Screen, { name: "Main", component: DevMenuMainScreen, options: DevMenuMainScreen.navigationOptions })))))));
}
const styles = StyleSheet.create({
    rootView: {
        flex: 1,
    },
});
//# sourceMappingURL=DevMenuApp.js.map