import * as React from 'react';
import { ImageCallBackFn } from './ImageUploadContext';
interface ImageUploadOverlayProps {
    buttonColor?: string;
    isOpen?: boolean;
    close: () => void;
    callbackFn?: ImageCallBackFn;
    acceptedFileTypes: string[];
    pathPrefix?: string;
    firebaseStorageRef: any;
}
declare const ImageUploadOverlay: React.FC<ImageUploadOverlayProps>;
export default ImageUploadOverlay;
