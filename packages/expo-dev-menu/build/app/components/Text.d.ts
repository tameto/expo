/// <reference types="react" />
import { Text } from 'react-native';
declare type TextProps = Text['props'];
interface Props extends TextProps {
    lightColor?: string;
    darkColor?: string;
}
export declare const SectionLabelText: (props: Props) => JSX.Element;
export declare const GenericCardTitle: (props: Props) => JSX.Element;
export declare const StyledText: (props: Props) => JSX.Element;
export {};
