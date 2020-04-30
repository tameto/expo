import * as React from 'react';
import { View, ScrollView } from 'react-native';
import TouchableNativeFeedbackSafe from '@expo/react-native-touchable-native-feedback-safe';
declare type ViewProps = View['props'];
interface Props extends ViewProps {
    lightBackgroundColor?: string;
    darkBackgroundColor?: string;
    lightBorderColor?: string;
    darkBorderColor?: string;
}
declare type ScrollViewProps = ScrollView['props'];
interface StyledScrollViewProps extends ScrollViewProps {
    lightBackgroundColor?: string;
    darkBackgroundColor?: string;
}
export declare const StyledScrollView: React.ForwardRefExoticComponent<StyledScrollViewProps & React.RefAttributes<ScrollView>>;
export declare const Separator: (props: View['props']) => JSX.Element;
export declare const SectionLabelContainer: (props: View['props']) => JSX.Element;
export declare const GenericCardContainer: (props: View['props']) => JSX.Element;
export declare const GenericCardBody: (props: View['props']) => JSX.Element;
export declare const StyledView: (props: Props) => JSX.Element;
declare type ButtonProps = Props & TouchableNativeFeedbackSafe['props'];
export declare const StyledButton: (props: ButtonProps) => JSX.Element;
declare type IconProps = {
    component: React.ReactType;
    name: string;
    size: number;
    color: string;
};
export declare const StyledIcon: (props: IconProps) => JSX.Element;
export {};
