import * as React from 'react';

import {
  CallbackFns,
  ImageUploadOptions,
  ImageUploadSuccess,
} from './ImageUploadContext';

import Button from './Button';
import { IonSpinner } from '@ionic/react';
import TitleBar from './TitleBar';
import { isPlatform } from '@ionic/react';
import { oxfordJoinArray } from './utils';
import styled from 'styled-components';
import { uploadImageToFirebase } from './utils/uploadImage';

type BlobLikeFile = File | null;

const Container = styled.div`
  position: fixed;
  z-index: 30000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(12px) brightness(102%) saturate(1.4);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 12px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: pointer;
  z-index: 1;
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

const StyledIonSpinner = styled(IonSpinner)`
  margin: -5px 0;
  height: 23px;
  width: 23px;
`;

interface ImageUploadOverlayProps {
  buttonColor?: string;
  close: () => void;
  callbackFns?: CallbackFns;
  acceptedFileTypes: string[];
  uploadOptions?: ImageUploadOptions;
  firebaseStorageRef: any; // firebase.storage.Reference
}

const ImageUploadOverlay: React.FC<ImageUploadOverlayProps> = ({
  close,
  callbackFns,
  acceptedFileTypes,
  firebaseStorageRef,
  buttonColor,
  uploadOptions,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState('');
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
    if (Boolean(callbackFns)) {
      window.addEventListener('paste', checkPasted as EventListener);
    } else {
      window.removeEventListener('paste', checkPasted as EventListener);
    }
  }, [checkPasted, callbackFns]);

  const getFile = async () => {
    const webInputElement: any = webInputRef?.current;
    webInputElement.click();
  };

  const getImageFileData = (e: any) => {
    if (e?.target?.files && e.target.files[0]) {
      const fileType = e.target.files[0].type;

      if (!acceptedFileTypes.includes(fileType)) {
        return callbackFns?.errorCallback(
          new Error('Cannot accept the file type: ' + e.target.files[0].type)
        );
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
      return callbackFns?.errorCallback(new Error('No image or input found'));
    }
  };

  const uploadImage = async () => {
    try {
      const successfulImageUploadObj = await uploadImageToFirebase({
        image,
        acceptedFileTypes,
        firebaseStorageRef,
        uploadOptions,
      });
      _close(successfulImageUploadObj);
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        return callbackFns?.errorCallback(new Error('Error: ' + err.message));
      } else {
        return callbackFns?.errorCallback(new Error('Unknown error'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const _close = (imageAttrs: ImageUploadSuccess | undefined) => {
    if (callbackFns?.successCallback) {
      callbackFns.successCallback(imageAttrs);
    }
    close();
  };

  if (!Boolean(callbackFns)) return null;
  return (
    <Container className="image-upload-overlay">
      <Backdrop
        className="image-upload-backdrop"
        onClick={() => _close(undefined)}
      />
      <OverlayContentContainer className="image-upload-overlay-container">
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
              {isLoading ? <StyledIonSpinner name="crescent" /> : 'Save'}
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
                onChange={() => {}}
                placeholder="Double tap here to paste an image"
              />
            )}
          </OverlayContent>
        )}
      </OverlayContentContainer>
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
