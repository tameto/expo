import React from 'react';

import DevMenuContext from '../DevMenuContext';
import DevMenuView from '../views/DevMenuView';

export default class DevMenuMainScreen extends React.PureComponent {
  static navigationOptions = {
    headerShown: true,
  };

  static contextType = DevMenuContext;

  render() {
    return <DevMenuView {...this.context} />;
  }
}
