import './App.css';

import * as React from 'react';

import {
  ImageUploadContext,
  ImageUploadContextProvider,
} from './reactComponentLib/index';

function App() {
  return (
    <ImageUploadContextProvider storage={{}}>
      <AppComponent />
    </ImageUploadContextProvider>
  );
}

const AppComponent = () => {
  const { open } = React.useContext(ImageUploadContext);

  const handleError = (err) => {
    window.alert(err);
  };

  return (
    <div className="app-container">
      <button id="uploadButton" onClick={() => open(console.log, handleError)}>
        Open Image Upload Overlay
      </button>
    </div>
  );
};

export default App;
