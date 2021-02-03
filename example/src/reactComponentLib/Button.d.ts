import * as React from 'react';
interface Props {
    color: string;
    icon?: string;
    onClick?: () => void;
    clear?: boolean;
    uppercase?: boolean;
    disabled?: boolean;
    small?: boolean;
    className?: any;
    href?: string;
    target?: string;
}
declare const Button: React.FC<Props>;
export default Button;
