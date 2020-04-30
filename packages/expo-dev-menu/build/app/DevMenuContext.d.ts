import React from 'react';
import { DevMenuItemAnyType } from './DevMenuInternal';
export declare type Context = {
    expand?: () => any;
    collapse?: () => any;
    appInfo?: {
        [key: string]: any;
    };
    uuid?: string;
    devMenuItems?: DevMenuItemAnyType[];
    enableDevelopmentTools?: boolean;
    showOnboardingView?: boolean;
};
declare const DevMenuContext: React.Context<Context | null>;
export default DevMenuContext;
