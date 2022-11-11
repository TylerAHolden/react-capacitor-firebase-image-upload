import { ImageUploadOptions, ImageUploadSuccess } from '../ImageUploadContext';

import { defaultAcceptedFileTypes } from './defaultAcceptedFileTypes';
import { getImageDimensions } from './getImageDimensions';
import { nanoid } from 'nanoid';

type UploadImageFn = {
  image: string;
  acceptedFileTypes?: string[];
  uploadOptions?: ImageUploadOptions;
  firebaseStorageRef: any;
};

export const uploadImageToFirebase = async ({
  image,
  acceptedFileTypes = defaultAcceptedFileTypes,
  uploadOptions,
  firebaseStorageRef,
}: UploadImageFn) => {
  const res = await fetch(image);
  const blob = await res.blob();

  const dimensionMetadata = await getImageDimensions(image);

  if (!acceptedFileTypes.includes(blob.type)) {
    throw new Error('Cannot accept the file type: ' + blob.type);
  }

  const imageUUID = uploadOptions?.imageFileName
    ? uploadOptions?.imageFileName
    : nanoid();
  console.log(
    '[react-capacitor-firebase-image-upload] Uploading Image: ',
    imageUUID,
    'Opts:',
    uploadOptions
  );
  if (!firebaseStorageRef) {
    throw new Error(
      'Firebase Storage Reference Object not found. Make sure to pass firebase.storage().ref() into the provider'
    );
  }

  const fileType = blob.type.split('/')[1];
  const fullPath =
    (uploadOptions?.pathPrefix ? uploadOptions.pathPrefix : '') +
    imageUUID +
    '.' +
    fileType;
  const firebaseImageRef = firebaseStorageRef.child(fullPath);

  const imageURI: string = await firebaseImageRef
    .put(blob, { customMetadata: dimensionMetadata })
    .then(
      async (snapshot: any) => {
        const downloadURI = await snapshot.ref.getDownloadURL();
        return downloadURI;
      },
      (err: any) => {
        throw new Error(
          err?.message || 'There was an error uploading the image :/'
        );
      }
    );

  if (imageURI) {
    // force https for images
    if (imageURI.indexOf('http:') !== -1) {
      imageURI.replace('http:', 'https:');
    }

    return {
      downloadUrl: imageURI,
      imageUUID,
      fileType,
      ...dimensionMetadata,
      fullPath,
    } as ImageUploadSuccess;
  } else {
    throw new Error('There was an error uploading the image :/');
  }
};
