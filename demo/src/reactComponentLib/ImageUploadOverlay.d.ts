import * as React from 'react';
import { CallbackFns, ImageUploadOptions } from './ImageUploadContext';
interface ImageUploadOverlayProps {
    buttonColor?: string;
    close: () => void;
    callbackFns?: CallbackFns;
    acceptedFileTypes: string[];
    uploadOptions?: ImageUploadOptions;
    firebaseStorageRef: any;
}
declare const ImageUploadOverlay: React.FC<ImageUploadOverlayProps>;
export default ImageUploadOverlay;
