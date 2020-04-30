import React from 'react';
import { DevMenuItemAnyType } from '../DevMenuInternal';
import { Context } from '../DevMenuContext';
declare type Props = {
    appInfo: {
        [key: string]: any;
    };
    uuid: string;
    devMenuItems: DevMenuItemAnyType[];
    enableDevelopmentTools: boolean;
    showOnboardingView: boolean;
};
declare type State = {
    isOnboardingFinished: boolean;
};
declare class DevMenuView extends React.PureComponent<Props, State> {
    static contextType: React.Context<Context | null>;
    context: Context;
    constructor(props: Props, context: Context);
    collapse: () => Promise<void>;
    collapseAndCloseDevMenuAsync: () => Promise<void>;
    onAppReload: () => void;
    onCopyTaskUrl: () => Promise<void>;
    onGoToHome: () => void;
    onPressDevMenuButton: (key: any) => void;
    onOnboardingFinished: () => void;
    renderItems(): JSX.Element;
    renderContent(): JSX.Element;
    render(): JSX.Element;
}
export default DevMenuView;
