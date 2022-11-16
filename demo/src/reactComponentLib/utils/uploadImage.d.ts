import { ImageUploadOptions, ImageUploadSuccess } from '../ImageUploadContext';
declare type UploadImageFn = {
    image: string;
    acceptedFileTypes?: string[];
    uploadOptions?: ImageUploadOptions;
    firebaseStorageRef: any;
};
export declare const uploadImageToFirebase: ({ image, acceptedFileTypes, uploadOptions, firebaseStorageRef, }: UploadImageFn) => Promise<ImageUploadSuccess>;
export {};
