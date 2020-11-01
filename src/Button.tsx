import * as React from 'react';

import { IonIcon } from '@ionic/react';
import { getColorContrast } from './ContrastColor';
import { isPlatform } from '@ionic/react';
import styled from 'styled-components';

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

const TextContainer = styled.div<{ uppercase: boolean }>`
  font-size: 15px;
  ${({ uppercase }) =>
    uppercase ? `text-transform: uppercase; letter-spacing: 1.5px;` : ''}
`;

const IconContainer = styled.div<{ iconOnly: boolean }>`
  font-size: 20px;
  display: flex;
  ${({ iconOnly }) => (iconOnly ? `font-size: 28px;` : `padding-right: 6px;`)}
`;

const Container = styled.div<any>`
  display: flex;
  margin: 0;
  padding: ${({ icon, small, iconOnly }) => {
    let yPadding = 6;
    let xPadding = iconOnly ? 6 : 12;

    if (icon) {
      yPadding = yPadding / 2;
      xPadding = xPadding / 2;
    }

    if (!small) {
      yPadding = yPadding * 2;
      xPadding = xPadding + 4;
    }

    return `${yPadding}px ${xPadding}px`;
  }};
  outline: none;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  line-height: 15px;
  cursor: pointer;
  text-decoration: none;
  background: ${({ color, clear }) => (clear ? 'transparent' : color)};
  ${TextContainer} {
    color: ${({ color, clear }) => (clear ? color : getColorContrast(color))};
  }

  &${isPlatform('desktop') ? ':hover' : ':active'} {
    ${({ clear }) => (clear ? `background: rgba(0,0,0,.05)` : `opacity: .9`)};
  }

  ion-icon {
    color: ${({ color, clear }) => (clear ? color : getColorContrast(color))};
  }
`;

const Button: React.FC<Props> = ({
  small = false,
  children,
  disabled,
  icon,
  href,
  color,
  clear = false,
  onClick,
  uppercase = false,
  className,
  target,
}) => {
  return (
    <Container
      as={href ? 'a' : 'button'}
      small={small}
      icon={icon}
      href={href}
      target={target}
      disabled={disabled}
      onClick={() => (onClick ? onClick() : undefined)}
      clear={clear}
      color={color}
      iconOnly={!children ? true : false}
      className={className}
    >
      {icon && (
        <IconContainer iconOnly={!children ? true : false}>
          <IonIcon icon={icon} />
        </IconContainer>
      )}
      <TextContainer uppercase={uppercase}>{children}</TextContainer>
    </Container>
  );
};

export default Button;
