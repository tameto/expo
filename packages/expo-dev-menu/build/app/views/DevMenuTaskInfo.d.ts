import React from 'react';
declare type Props = {
    task: {
        [key: string]: any;
    };
};
declare class DevMenuTaskInfo extends React.PureComponent<Props, any> {
    _maybeRenderDevServerName(): JSX.Element | null;
    render(): JSX.Element | null;
}
export default DevMenuTaskInfo;
