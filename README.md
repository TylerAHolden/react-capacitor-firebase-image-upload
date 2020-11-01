# React + Capacitor + Firebase Image Upload

An image upload UI built for react/capacitor utilizing firebase storage.

[Demo](https://react-capacitor-firebase-image-upload-example.netlify.app/)

## Install

> yarn add react-capacitor-firebase-image-upload

## Quick Usage

App.tsx (Or other high level component)

```
import { ImageUploadContextProvider, ImageUploadContext } from 'react-capacitor-firebase-image-upload';

import * as firebase from 'firebase/app';
import 'firebase/storage';

const fire = firebase.initializeApp({
  ... firebase key stuff here ...
});

const storage = firebase.storage().ref();

...

const App: React.FC = () => {
  const { open } = useContext(ImageUploadContext);
  return (
    <App>
        <ImageUploadContextProvider firebaseStorageRef={storage}>
            {/* <Routes & Other App Stuff> */}
            <button onClick={() => open(console.log)}>
        </ImageUploadContextProvider>
    </App>
  );
};
```

## ImageUploadContextProviderProps

| Key                | Type                       | Required | Default                                  | Description                                   |
| ------------------ | -------------------------- | -------- | ---------------------------------------- | --------------------------------------------- |
| buttonColor        | string                     | No       | "#222"                                   | Color of the primary buttons                  |
| acceptedFileTypes  | string[]                   | No       | ['image/png', 'image/jpeg', 'image/bmp'] | String array of accepted file types           |
| firebaseStorageRef | firebase.storage.Reference | Yes      | undefined                                | The reference object to your firebase storage |

## ImageUploadContext

| Key    | Type                                          | Description                                                     |
| ------ | --------------------------------------------- | --------------------------------------------------------------- |
| isOpen | boolean                                       | State of the image upload overlay                               |
| open   | (callbackFunction?: ImageCallBackFn) => void; | Function to call when you want to open the image upload overlay |
| close  | () => void;                                   | Function to call when you want the overlay to close             |

> type ImageCallBackFn = (newImageUrl?: string | undefined) => void;

### Feature wishlist:

- Cropping
- Capacitor native camera/camera roll
