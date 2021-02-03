import * as React from 'react';
export interface TitleBarProps {
    title: string;
    onCloseClick: () => void;
    helperText?: string;
}
declare const TitleBar: React.FC<TitleBarProps>;
export default TitleBar;
