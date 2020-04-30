import React from 'react';
declare type Props = {
    style: any;
    onPress: () => void;
};
declare class DevMenuCloseButton extends React.PureComponent<Props, any> {
    static contextType: React.Context<import("react-navigation").SupportedThemes>;
    onPress: () => void;
    render(): JSX.Element;
}
export default DevMenuCloseButton;
