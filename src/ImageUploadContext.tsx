import * as React from 'react';

import ImageUploadOverlay from './ImageUploadOverlay';

type ImageUploadContextProps = {
  isOpen: boolean;
  open: (callbackFunction?: ImageCallBackFn, opts?: ImageUploadOptions) => void;
  close: () => void;
};

type ImageUploadContextProviderProps = {
  buttonColor?: string;
  acceptedFileTypes?: string[];
  firebaseStorageRef: any; // firebase.storage.Reference
};

type ImageUploadOptions = {
  pathPrefix?: string;
};

export type ImageCallBackFn = (newImageUrl?: string | undefined) => void;

const defaultAcceptedFileTypes = ['image/png', 'image/jpeg', 'image/bmp'];

export const ImageUploadContext = React.createContext<ImageUploadContextProps>(
  {} as ImageUploadContextProps
);

export const ImageUploadContextProvider: React.FC<ImageUploadContextProviderProps> = ({
  children,
  acceptedFileTypes = defaultAcceptedFileTypes,
  firebaseStorageRef,
  buttonColor,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [pathPrefix, setPathPrefix] = React.useState('');

  const callbackFn = React.useRef<ImageCallBackFn | undefined>();

  const open = (
    callbackFunction?: ImageCallBackFn,
    opts?: ImageUploadOptions
  ) => {
    setIsOpen(true);
    setPathPrefix(opts?.pathPrefix || '');
    callbackFn.current = callbackFunction;
  };

  const close = () => {
    setIsOpen(false);
    setPathPrefix('');
    callbackFn.current = undefined;
  };

  return (
    <ImageUploadContext.Provider
      value={{
        isOpen,
        open,
        close,
      }}
    >
      {children}
      <ImageUploadOverlay
        firebaseStorageRef={firebaseStorageRef}
        acceptedFileTypes={acceptedFileTypes}
        isOpen={isOpen}
        pathPrefix={pathPrefix}
        close={close}
        buttonColor={buttonColor}
        callbackFn={callbackFn.current}
      />
    </ImageUploadContext.Provider>
  );
};
