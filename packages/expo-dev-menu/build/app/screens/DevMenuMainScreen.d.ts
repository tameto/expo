import React from 'react';
export default class DevMenuMainScreen extends React.PureComponent {
    static navigationOptions: {
        headerShown: boolean;
    };
    static contextType: React.Context<import("../DevMenuContext").Context | null>;
    render(): JSX.Element;
}
