import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { AppearanceProvider, useColorScheme, ColorSchemeName } from 'react-native-appearance';
import RNScreens, { enableScreens } from 'react-native-screens';
import { ThemeContext } from 'react-navigation';

import * as Screens from '@react-navigation/stack/src/views/Screens';

Screens.MaybeScreen = ({ enabled, active, style, ...rest }) => {
  // if (enabled && RNScreens && RNScreens.screensEnabled()) {
  //   // @ts-ignore
  //   return <RNScreens.Screen active={active} {...rest} />;
  // }
  console.log('DUPA', rest);
  return <View style={{ flex: 1, minHeight: Dimensions.get('window').height }} {...rest} />;
};

import * as DevMenuInternal from '../DevMenuInternal';
import DevMenuMainScreen from '../screens/DevMenuMainScreen';
import DevMenuBottomSheet from './DevMenuBottomSheet';

function useUserSettings(renderId): DevMenuInternal.DevMenuSettingsType {
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

export default class DevMenuRoot extends React.PureComponent<any, any> {
  render() {
    return <DevMenuApp {...this.props} />;
  }
}

// enableScreens();
const Stack = createStackNavigator();

function DevMenuApp(props) {
  const colorScheme = useColorScheme();
  const { preferredAppearance = 'no-preference' } = useUserSettings(props.uuid);

  let theme: ColorSchemeName =
    preferredAppearance === 'no-preference' ? colorScheme : preferredAppearance;
  if (theme === 'no-preference') {
    theme = 'light';
  }

  return (
    <AppearanceProvider style={styles.rootView}>
      <ThemeContext.Provider value={theme}>
        <DevMenuBottomSheet {...props}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main" mode="modal">
              <Stack.Screen
                name="Main"
                component={DevMenuMainScreen}
                options={DevMenuMainScreen.navigationOptions}
              />
            </Stack.Navigator>
          </NavigationContainer>
          {/* <DevMenuMainScreen /> */}
        </DevMenuBottomSheet>
      </ThemeContext.Provider>
    </AppearanceProvider>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});
