import * as React from 'react';

import ImageUploadOverlay from './ImageUploadOverlay';

type ImageUploadContextProps = {
  isOpen: boolean;
  open: (
    successCallback: CallbackFns['successCallback'],
    errorCallback: CallbackFns['errorCallback'],
    opts?: ImageUploadOptions
  ) => void;
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

export type ImageUploadSuccess = {
  downloadUrl: string;
  imageUUID: string;
  width: number;
  height: number;
  fullPath: string;
};

export type ImageUploadCanceled = undefined;

export type CallbackFns = {
  successCallback: (result: ImageUploadSuccess | ImageUploadCanceled) => void;
  errorCallback: (err: Error) => void;
};

const defaultAcceptedFileTypes = ['image/png', 'image/jpeg', 'image/bmp'];

export const ImageUploadContext = React.createContext<ImageUploadContextProps>(
  {} as ImageUploadContextProps
);

export const ImageUploadContextProvider: React.FC<ImageUploadContextProviderProps> =
  ({
    children,
    acceptedFileTypes = defaultAcceptedFileTypes,
    firebaseStorageRef,
    buttonColor,
  }) => {
    const [callbackFns, setCallbackFns] = React.useState<CallbackFns>();
    const [pathPrefix, setPathPrefix] = React.useState('');

    const open = (
      successCallback: CallbackFns['successCallback'],
      errorCallback: CallbackFns['errorCallback'],
      opts?: ImageUploadOptions
    ) => {
      setPathPrefix(opts?.pathPrefix || '');

      setCallbackFns({ successCallback, errorCallback });
    };

    const close = () => {
      setCallbackFns(undefined);
      setPathPrefix('');
    };

    return (
      <ImageUploadContext.Provider
        value={{
          isOpen: Boolean(setCallbackFns),
          open,
          close,
        }}
      >
        {children}
        <ImageUploadOverlay
          firebaseStorageRef={firebaseStorageRef}
          acceptedFileTypes={acceptedFileTypes}
          pathPrefix={pathPrefix}
          close={close}
          buttonColor={buttonColor}
          callbackFns={callbackFns}
        />
      </ImageUploadContext.Provider>
    );
  };
