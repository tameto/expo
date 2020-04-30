import React from 'react';
import { ViewProps } from 'react-native';
declare type Props = ViewProps & {
    isActive: boolean;
    isNetworkAvailable: boolean;
};
export default class DevIndicator extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
