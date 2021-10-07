import * as React from 'react';

import Button from './Button';
import { closeOutline } from 'ionicons/icons';
import styled from 'styled-components';

export interface TitleBarProps {
  title: string;
  onCloseClick: () => void;
  helperText?: string;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const StyledH2 = styled.h2`
  margin: 0;
  padding: 0;
  color: #222;
  font-size: 32px;
  font-weight: 700;
  text-align: left;
`;

const StyledP = styled.p`
  margin: 0;
  padding: 0;
  color: #222;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  width: 100%;
  opacity: 0.5;
`;

const BottomBorder = styled.div`
  height: 1px;
  width: 100%;
  background: black;
  opacity: 0.1;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const TitleBar: React.FC<TitleBarProps> = ({
  title,
  onCloseClick,
  helperText,
}) => {
  return (
    <>
      <Container className="image-upload-overlay-title-bar">
        <StyledH2>{title}</StyledH2>
        <Button onClick={onCloseClick} color="#222" clear icon={closeOutline} />
      </Container>
      <BottomBorder />
      {helperText && <StyledP>{helperText}</StyledP>}
    </>
  );
};

export default TitleBar;
