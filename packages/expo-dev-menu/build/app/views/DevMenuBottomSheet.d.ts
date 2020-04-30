import React from 'react';
import { EventSubscription } from 'react-native';
import Animated from 'react-native-reanimated';
import ScrollBottomSheet from './ScrollBottomSheet';
declare type Props = {
    uuid: string;
};
declare class DevMenuBottomSheet extends React.PureComponent<Props, any> {
    static contextType: React.Context<import("../DevMenuContext").Context | null>;
    ref: React.RefObject<ScrollBottomSheet<any>>;
    snapPoints: string[];
    callbackNode: Animated.Value<0>;
    backgroundOpacity: Animated.Node<number>;
    closeSubscription: EventSubscription | null;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    collapse: () => Promise<void>;
    collapseAndClose: () => Promise<void>;
    expand: () => void;
    unsubscribeCloseSubscription: () => void;
    onCloseEnd: () => void;
    providedContext: {
        expand: () => void;
        collapse: () => Promise<void>;
    };
    renderContent: () => JSX.Element;
    innerRef: React.RefObject<unknown>;
    render(): JSX.Element;
}
export default DevMenuBottomSheet;
