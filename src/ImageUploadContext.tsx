import * as React from 'react';

import ImageUploadOverlay from './ImageUploadOverlay';
import { defaultAcceptedFileTypes } from './utils/defaultAcceptedFileTypes';

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

export type ImageUploadOptions = {
  pathPrefix?: string;
  imageFileName?: string;
};

export type ImageUploadSuccess = {
  downloadUrl: string;
  imageUUID: string;
  width: number;
  height: number;
  fullPath: string;
  fileType: string;
};

export type ImageUploadCanceled = undefined;

export type CallbackFns = {
  successCallback: (result: ImageUploadSuccess | ImageUploadCanceled) => void;
  errorCallback: (err: Error) => void;
};

export const ImageUploadContext = React.createContext<ImageUploadContextProps>(
  {} as ImageUploadContextProps
);

export const ImageUploadContextProvider: React.FC<
  ImageUploadContextProviderProps
> = ({
  children,
  acceptedFileTypes = defaultAcceptedFileTypes,
  firebaseStorageRef,
  buttonColor,
}) => {
  const [callbackFns, setCallbackFns] = React.useState<CallbackFns>();
  const [uploadOptions, setUploadOptions] =
    React.useState<ImageUploadOptions>();

  const open = (
    successCallback: CallbackFns['successCallback'],
    errorCallback: CallbackFns['errorCallback'],
    opts?: ImageUploadOptions
  ) => {
    setUploadOptions(opts);

    setCallbackFns({ successCallback, errorCallback });
  };

  const close = () => {
    setCallbackFns(undefined);
    setUploadOptions(undefined);
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
        uploadOptions={uploadOptions}
        close={close}
        buttonColor={buttonColor}
        callbackFns={callbackFns}
      />
    </ImageUploadContext.Provider>
  );
};
