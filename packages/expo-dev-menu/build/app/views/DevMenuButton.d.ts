import React from 'react';
declare type Props = {
    buttonKey: string;
    label: string;
    onPress: (key: string) => any;
    icon?: string | null;
    isEnabled?: boolean;
    detail?: string;
};
declare class DevMenuButton extends React.PureComponent<Props, any> {
    static defaultProps: {
        isEnabled: boolean;
    };
    state: {
        showDetails: boolean;
    };
    onPress: () => void;
    renderButtonIcon(icon: string | undefined, isEnabled: boolean): JSX.Element | null;
    renderLabel(label: string, enabled: boolean): JSX.Element;
    renderDetail(detail?: string): JSX.Element;
    render(): JSX.Element;
}
export default DevMenuButton;
