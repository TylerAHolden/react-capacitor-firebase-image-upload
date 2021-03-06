import * as React from 'react';

import { IonBackdrop, IonSpinner, IonToast } from '@ionic/react';

import Button from './Button';
import { ImageCallBackFn } from './ImageUploadContext';
import TitleBar from './TitleBar';
import { isPlatform } from '@ionic/react';
import { oxfordJoinArray } from './utils';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

type BlobLikeFile = File | null;

const Container = styled.div`
  position: fixed;
  z-index: 30000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(12px) brightness(102%) saturate(1.4);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 12px;
`;

const OverlayContentContainer = styled.div`
  z-index: 10;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  max-width: 700px;
  width: 100%;
  min-height: 500px;
  padding: 24px;
  background: rgba(241, 241, 241, 0.88);
  border-radius: 16px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1),
    0px 10px 34px -12px rgba(0, 0, 0, 0.43);
  @media (max-width: 650px) {
    padding: 12px;
  }
`;

const OverlayContent = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SecretTextInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  padding: 12px;
  width: 100%;
  text-align: center;
`;

const OrText = styled.p`
  margin-top: 8px;
  padding: 0;
  color: #222;
  opacity: 0.5;
`;

const SaveButton = styled(Button)`
  margin-top: 36px;
  min-width: 140px;
`;

const HiddenInput = styled.input<any>`
  position: absolute;
  left: -9999px;
  top: -9999px;
  width: 1px;
  height: 1px;
`;

const PreviewImage = styled.img`
  max-height: 50vh;
  max-width: 90%;
  margin-bottom: 6px;
`;

interface ImageUploadOverlayProps {
  buttonColor?: string;
  isOpen?: boolean;
  close: () => void;
  callbackFn?: ImageCallBackFn;
  acceptedFileTypes: string[];
  pathPrefix?: string;
  firebaseStorageRef: any; // firebase.storage.Reference
}

const ImageUploadOverlay: React.FC<ImageUploadOverlayProps> = ({
  isOpen,
  close,
  callbackFn,
  acceptedFileTypes,
  firebaseStorageRef,
  buttonColor,
  pathPrefix,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [toastMessage, setToastMessage] = React.useState<string>();
  const webInputRef = React.useRef();

  const clearState = () => {
    setIsLoading(false);
    setImage('');
  };

  const checkPasted = React.useCallback((e: ClipboardEvent) => {
    if (e.clipboardData && e.clipboardData.items.length > 0) {
      for (let i = 0; i < e.clipboardData.items.length; i++) {
        const fileType = e.clipboardData.items[i].type;
        if (acceptedFileTypes.includes(fileType)) {
          let blob: BlobLikeFile = e.clipboardData.items[i].getAsFile();
          let URL = window.URL;

          if (blob) {
            let src = URL.createObjectURL(blob);

            setImage(src);
          }
        } else if (e.clipboardData.items[i].kind === 'string') {
          e.clipboardData.items[i].getAsString((clipboardString) => {
            if (
              clipboardString.startsWith('https://', 0) ||
              clipboardString.startsWith('http://', 0)
            ) {
              setImage(clipboardString.replace('http://', 'https://'));
            }
          });
        } else {
          // non supported paste type
          // console.log(fileType, ' not supported.');
        }
      }
    }
  }, []);

  React.useEffect(() => {
    clearState();
    if (isOpen) {
      window.addEventListener('paste', checkPasted as EventListener);
    } else {
      window.removeEventListener('paste', checkPasted as EventListener);
    }
  }, [checkPasted, isOpen]);

  const getFile = async () => {
    const webInputElement: any = webInputRef?.current;
    webInputElement.click();
  };

  const getImageFileData = (e: any) => {
    if (e?.target?.files && e.target.files[0]) {
      const fileType = e.target.files[0].type;

      if (!acceptedFileTypes.includes(fileType)) {
        setToastMessage(
          'Cannot accept the file type: ' + e.target.files[0].type
        );
        return;
      }
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          // convert image file to base64 string
          setImage(String(reader.result));
        },
        false
      );

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const validateImage = () => {
    setIsLoading(true);

    if (image) {
      uploadImage();
    } else {
      setIsLoading(false);
      setToastMessage('No image or input found');
    }
  };

  const getImageDimensions = async (src: string) =>
    new Promise<{ width: number; height: number }>((resolve) => {
      var img = new Image();

      img.onload = () => {
        var height = img.height;
        var width = img.width;
        resolve({ width, height });
      };

      img.src = src;
    });

  const uploadImage = async () => {
    try {
      const res = await fetch(image);
      const blob = await res.blob();

      const dimensionMetadata = await getImageDimensions(image);

      if (!acceptedFileTypes.includes(blob.type)) {
        throw new Error('Cannot accept the file type: ' + blob.type);
      }

      const imageUUID = uuid();
      if (!firebaseStorageRef) {
        throw new Error(
          'Firebase Storage Reference Object not found. Make sure to pass firebase.storage().ref() into the provider'
        );
      }
      let firebaseImageRef = firebaseStorageRef.child(
        (pathPrefix ? pathPrefix : '') +
          imageUUID +
          '.' +
          blob.type.split('/')[1]
      );

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
        _close(imageURI);
      }
    } catch (err) {
      console.log(err);
      setToastMessage('Error: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const _close = (newImageURL?: string) => {
    if (callbackFn) callbackFn(newImageURL);
    close();
  };

  if (!isOpen) return null;
  return (
    <Container>
      <IonBackdrop onIonBackdropTap={() => _close(undefined)} />
      <OverlayContentContainer>
        <TitleBar
          title={image ? 'Preview' : 'Image Upload'}
          onCloseClick={() => _close(undefined)}
          helperText={
            image
              ? undefined
              : `Accepted File Types: ${oxfordJoinArray(
                  acceptedFileTypes.map((fileType) => fileType.split('/')[1]),
                  '&',
                  'None'
                )}`
          }
        />
        {image ? (
          <OverlayContent>
            <PreviewImage src={image} alt="Selected" />
            <Button
              onClick={() => clearState()}
              clear
              color={buttonColor || '#222'}
              small
            >
              Clear Image
            </Button>
            <SaveButton
              color={buttonColor || '#222'}
              disabled={isLoading}
              onClick={validateImage}
            >
              {isLoading ? <IonSpinner name="crescent" /> : 'Save'}
            </SaveButton>
          </OverlayContent>
        ) : (
          <OverlayContent>
            <Button onClick={getFile} color={buttonColor || '#222'}>
              Browse Files
            </Button>

            <HiddenInput
              onChange={(e: any) => getImageFileData(e)}
              ref={webInputRef}
              type="file"
            />
            <OrText>or</OrText>
            {isPlatform('desktop') ? (
              <OrText>⌘ + V to Paste an Image or URL</OrText>
            ) : (
              <SecretTextInput
                value={''}
                placeholder="Double tap here to paste an image"
              />
            )}
          </OverlayContent>
        )}
      </OverlayContentContainer>
      <IonToast
        isOpen={toastMessage ? true : false}
        onDidDismiss={() => setToastMessage(undefined)}
        message={toastMessage}
        duration={3200}
        mode="ios"
        position="top"
      />
    </Container>
  );
};

// Saving for future dev
// const getPicture = async (source: 'camera' | 'photos') => {
//   const image = await Plugins.Camera.getPhoto({
//     quality: 100,
//     allowEditing: false,
//     resultType: CameraResultType.DataUrl,
//     source: source === 'camera' ? CameraSource.Camera : CameraSource.Photos,
//   });
//   setImage(image.dataUrl || '');
// };

export default ImageUploadOverlay;
