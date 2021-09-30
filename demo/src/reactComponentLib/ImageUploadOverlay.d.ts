import * as React from 'react';
import { CallbackFns } from './ImageUploadContext';
interface ImageUploadOverlayProps {
    buttonColor?: string;
    close: () => void;
    callbackFns?: CallbackFns;
    acceptedFileTypes: string[];
    pathPrefix?: string;
    firebaseStorageRef: any;
}
declare const ImageUploadOverlay: React.FC<ImageUploadOverlayProps>;
export default ImageUploadOverlay;
