import {
  ImageUploadContext,
  ImageUploadContextProvider,
} from '../reactComponentLib/index';

import Layout from '@theme/Layout';
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout
      title={`React Firebase Image Upload Example`}
      description={siteConfig.tagline}
    >
      <main>
        <div className="main-example-container">
          <div className="main-content">
            <div className="main-content-inner">
              <h1>React Firebase Image Upload</h1>
              <p>{siteConfig.tagline}</p>
            </div>
            <ImageUploadContextProvider storage={{}}>
              <UploadButton />
            </ImageUploadContextProvider>
          </div>
        </div>
      </main>
    </Layout>
  );
}

const UploadButton = () => {
  const { open } = React.useContext(ImageUploadContext);
  return (
    <button id="uploadButton" onClick={() => open(console.log)}>
      Open Image Upload Overlay
    </button>
  );
};

export default Home;
