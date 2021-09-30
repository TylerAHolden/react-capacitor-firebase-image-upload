import * as React from 'react';
declare type ImageUploadContextProps = {
    isOpen: boolean;
    open: (successCallback: CallbackFns['successCallback'], errorCallback: CallbackFns['errorCallback'], opts?: ImageUploadOptions) => void;
    close: () => void;
};
declare type ImageUploadContextProviderProps = {
    buttonColor?: string;
    acceptedFileTypes?: string[];
    firebaseStorageRef: any;
};
declare type ImageUploadOptions = {
    pathPrefix?: string;
};
export declare type ImageUploadSuccess = {
    downloadUrl: string;
    imageUUID: string;
    width: number;
    height: number;
    fullPath: string;
    fileType: string;
};
export declare type ImageUploadCanceled = undefined;
export declare type CallbackFns = {
    successCallback: (result: ImageUploadSuccess | ImageUploadCanceled) => void;
    errorCallback: (err: Error) => void;
};
export declare const ImageUploadContext: React.Context<ImageUploadContextProps>;
export declare const ImageUploadContextProvider: React.FC<ImageUploadContextProviderProps>;
export {};
