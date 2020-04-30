import React from 'react';
import DevMenuContext from '../DevMenuContext';
import DevMenuView from '../views/DevMenuView';
let DevMenuMainScreen = /** @class */ (() => {
    class DevMenuMainScreen extends React.PureComponent {
        render() {
            return React.createElement(DevMenuView, Object.assign({}, this.context));
        }
    }
    DevMenuMainScreen.navigationOptions = {
        headerShown: false,
    };
    DevMenuMainScreen.contextType = DevMenuContext;
    return DevMenuMainScreen;
})();
export default DevMenuMainScreen;
//# sourceMappingURL=DevMenuMainScreen.js.map