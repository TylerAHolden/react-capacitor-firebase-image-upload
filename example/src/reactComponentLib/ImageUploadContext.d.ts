import * as React from 'react';
declare type ImageUploadContextProps = {
    isOpen: boolean;
    open: (callbackFunction?: ImageCallBackFn, opts?: ImageUploadOptions) => void;
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
export declare type ImageCallBackFn = (newImageUrl?: string | undefined) => void;
export declare const ImageUploadContext: React.Context<ImageUploadContextProps>;
export declare const ImageUploadContextProvider: React.FC<ImageUploadContextProviderProps>;
export {};
