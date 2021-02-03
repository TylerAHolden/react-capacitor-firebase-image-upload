/* eslint-disable */
import { createElement, Fragment, useState, useRef, useCallback, useEffect, createContext } from 'react';
import { isPlatform, IonIcon, IonBackdrop, IonSpinner, IonToast } from '@ionic/react';
import styled from 'styled-components';
import { closeOutline } from 'ionicons/icons';
import { v4 } from 'uuid';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

// modified from https://gist.github.com/dcondrey/183971f17808e9277572
const getColorContrast = (rgb) => {
    if (typeof rgb !== 'string') {
        return '';
    }
    if (!rgb.includes('rgb') && rgb.includes('#')) {
        rgb = hexToRgb(rgb);
    }
    if (rgb.length < 3 || !rgb.includes('rgb')) {
        return '';
    }
    // Strip everything except the integers eg. "rgb(" and ")" and " "
    rgb = rgb.split(/\(([^)]+)\)/)[1].replace(/ /g, '');
    // map RGB values to variables
    var r = parseInt(rgb.split(',')[0], 10), g = parseInt(rgb.split(',')[1], 10), b = parseInt(rgb.split(',')[2], 10);
    // calculate contrast of color (standard grayscale algorithmic formula)
    var contrast = (Math.round(r * 299) + Math.round(g * 587) + Math.round(b * 114)) / 1000;
    return contrast >= 128 ? 'black' : 'white';
};
// https://stackoverflow.com/a/5624139/3695983
const hexToRgb = (hex) => {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (_m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `rgb(${parseInt(result ? result[1] : '0', 16)},${parseInt(result ? result[2] : '0', 16)},${parseInt(result ? result[3] : '0', 16)})`;
};

const TextContainer = styled.div `
  font-size: 15px;
  ${({ uppercase }) => uppercase ? `text-transform: uppercase; letter-spacing: 1.5px;` : ''}
`;
const IconContainer = styled.div `
  font-size: 20px;
  display: flex;
  ${({ iconOnly }) => (iconOnly ? `font-size: 28px;` : `padding-right: 6px;`)}
`;
const Container = styled.div `
  display: flex;
  margin: 0;
  padding: ${({ icon, small, iconOnly }) => {
    let yPadding = 6;
    let xPadding = iconOnly ? 6 : 12;
    if (icon) {
        yPadding = yPadding / 2;
        xPadding = xPadding / 2;
    }
    if (!small) {
        yPadding = yPadding * 2;
        xPadding = xPadding + 4;
    }
    return `${yPadding}px ${xPadding}px`;
}};
  outline: none;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  line-height: 15px;
  cursor: pointer;
  text-decoration: none;
  border: none;
  background: ${({ color, clear }) => (clear ? 'transparent' : color)};
  ${TextContainer} {
    color: ${({ color, clear }) => (clear ? color : getColorContrast(color))};
  }

  &${isPlatform('desktop') ? ':hover' : ':active'} {
    ${({ clear }) => (clear ? `background: rgba(0,0,0,.05)` : `opacity: .9`)};
  }

  ion-icon {
    color: ${({ color, clear }) => (clear ? color : getColorContrast(color))};
  }
`;
const Button = ({ small = false, children, disabled, icon, href, color, clear = false, onClick, uppercase = false, className, target, }) => {
    return (createElement(Container, { as: href ? 'a' : 'button', small: small, icon: icon, href: href, target: target, disabled: disabled, onClick: () => (onClick ? onClick() : undefined), clear: clear, color: color, iconOnly: !children ? true : false, className: className },
        icon && (createElement(IconContainer, { iconOnly: !children ? true : false },
            createElement(IonIcon, { icon: icon }))),
        createElement(TextContainer, { uppercase: uppercase }, children)));
};

const Container$1 = styled.div `
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const StyledH2 = styled.h2 `
  margin: 0;
  padding: 0;
  color: #222;
  font-size: 32px;
  font-weight: 700;
  text-align: left;
`;
const StyledP = styled.p `
  margin: 0;
  padding: 0;
  color: #222;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  width: 100%;
  opacity: 0.5;
`;
const BottomBorder = styled.div `
  height: 1px;
  width: 100%;
  background: black;
  opacity: 0.1;
  margin-top: 8px;
  margin-bottom: 8px;
`;
const TitleBar = ({ title, onCloseClick, helperText, }) => {
    return (createElement(Fragment, null,
        createElement(Container$1, null,
            createElement(StyledH2, null, title),
            createElement(Button, { onClick: onCloseClick, color: "#222", clear: true, icon: closeOutline })),
        createElement(BottomBorder, null),
        helperText && createElement(StyledP, null, helperText)));
};

const oxfordJoinArray = (arr, conjunction, ifempty) => {
    let l = arr.length;
    if (!l)
        return ifempty;
    if (l < 2)
        return arr[0];
    if (l < 3)
        return arr.join(` ${conjunction} `);
    arr = arr.slice();
    arr[l - 1] = `${conjunction} ${arr[l - 1]}`;
    return arr.join(', ');
};

const Container$2 = styled.div `
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
const OverlayContentContainer = styled.div `
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
const OverlayContent = styled.div `
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const SecretTextInput = styled.input `
  background: transparent;
  border: none;
  outline: none;
  padding: 12px;
  width: 100%;
  text-align: center;
`;
const OrText = styled.p `
  margin-top: 8px;
  padding: 0;
  color: #222;
  opacity: 0.5;
`;
const SaveButton = styled(Button) `
  margin-top: 36px;
  min-width: 140px;
`;
const HiddenInput = styled.input `
  position: absolute;
  left: -9999px;
  top: -9999px;
  width: 1px;
  height: 1px;
`;
const PreviewImage = styled.img `
  max-height: 50vh;
  max-width: 90%;
  margin-bottom: 6px;
`;
const ImageUploadOverlay = ({ isOpen, close, callbackFn, acceptedFileTypes, firebaseStorageRef, buttonColor, pathPrefix, }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState('');
    const [toastMessage, setToastMessage] = useState();
    const webInputRef = useRef();
    const clearState = () => {
        setIsLoading(false);
        setImage('');
    };
    const checkPasted = useCallback((e) => {
        if (e.clipboardData && e.clipboardData.items.length > 0) {
            for (let i = 0; i < e.clipboardData.items.length; i++) {
                const fileType = e.clipboardData.items[i].type;
                if (acceptedFileTypes.includes(fileType)) {
                    let blob = e.clipboardData.items[i].getAsFile();
                    let URL = window.URL;
                    if (blob) {
                        let src = URL.createObjectURL(blob);
                        setImage(src);
                    }
                }
                else if (e.clipboardData.items[i].kind === 'string') {
                    e.clipboardData.items[i].getAsString((clipboardString) => {
                        if (clipboardString.startsWith('https://', 0) ||
                            clipboardString.startsWith('http://', 0)) {
                            setImage(clipboardString.replace('http://', 'https://'));
                        }
                    });
                }
                else ;
            }
        }
    }, []);
    useEffect(() => {
        clearState();
        if (isOpen) {
            window.addEventListener('paste', checkPasted);
        }
        else {
            window.removeEventListener('paste', checkPasted);
        }
    }, [checkPasted, isOpen]);
    const getFile = () => __awaiter(void 0, void 0, void 0, function* () {
        const webInputElement = webInputRef === null || webInputRef === void 0 ? void 0 : webInputRef.current;
        webInputElement.click();
    });
    const getImageFileData = (e) => {
        var _a;
        if (((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.files) && e.target.files[0]) {
            const fileType = e.target.files[0].type;
            if (!acceptedFileTypes.includes(fileType)) {
                setToastMessage('Cannot accept the file type: ' + e.target.files[0].type);
                return;
            }
            const reader = new FileReader();
            reader.addEventListener('load', function () {
                // convert image file to base64 string
                setImage(String(reader.result));
            }, false);
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    const validateImage = () => {
        setIsLoading(true);
        if (image) {
            uploadImage();
        }
        else {
            setIsLoading(false);
            setToastMessage('No image or input found');
        }
    };
    const getImageDimensions = (src) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => {
            var img = new Image();
            img.onload = () => {
                var height = img.height;
                var width = img.width;
                resolve({ width, height });
            };
            img.src = src;
        });
    });
    const uploadImage = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield fetch(image);
            const blob = yield res.blob();
            const dimensionMetadata = yield getImageDimensions(image);
            if (!acceptedFileTypes.includes(blob.type)) {
                throw new Error('Cannot accept the file type: ' + blob.type);
            }
            const imageUUID = v4();
            if (!firebaseStorageRef) {
                throw new Error('Firebase Storage Reference Object not found. Make sure to pass firebase.storage().ref() into the provider');
            }
            let firebaseImageRef = firebaseStorageRef.child((pathPrefix ? pathPrefix : '') +
                imageUUID +
                '.' +
                blob.type.split('/')[1]);
            const imageURI = yield firebaseImageRef
                .put(blob, { customMetadata: dimensionMetadata })
                .then((snapshot) => __awaiter(void 0, void 0, void 0, function* () {
                const downloadURI = yield snapshot.ref.getDownloadURL();
                return downloadURI;
            }), (err) => {
                throw new Error((err === null || err === void 0 ? void 0 : err.message) || 'There was an error uploading the image :/');
            });
            if (imageURI) {
                // force https for images
                if (imageURI.indexOf('http:') !== -1) {
                    imageURI.replace('http:', 'https:');
                }
                _close(imageURI);
            }
        }
        catch (err) {
            console.log(err);
            setToastMessage('Error: ' + err.message);
        }
        finally {
            setIsLoading(false);
        }
    });
    const _close = (newImageURL) => {
        if (callbackFn)
            callbackFn(newImageURL);
        close();
    };
    if (!isOpen)
        return null;
    return (createElement(Container$2, null,
        createElement(IonBackdrop, { onIonBackdropTap: () => _close(undefined) }),
        createElement(OverlayContentContainer, null,
            createElement(TitleBar, { title: image ? 'Preview' : 'Image Upload', onCloseClick: () => _close(undefined), helperText: image
                    ? undefined
                    : `Accepted File Types: ${oxfordJoinArray(acceptedFileTypes.map((fileType) => fileType.split('/')[1]), '&', 'None')}` }),
            image ? (createElement(OverlayContent, null,
                createElement(PreviewImage, { src: image, alt: "Selected" }),
                createElement(Button, { onClick: () => clearState(), clear: true, color: buttonColor || '#222', small: true }, "Clear Image"),
                createElement(SaveButton, { color: buttonColor || '#222', disabled: isLoading, onClick: validateImage }, isLoading ? createElement(IonSpinner, { name: "crescent" }) : 'Save'))) : (createElement(OverlayContent, null,
                createElement(Button, { onClick: getFile, color: buttonColor || '#222' }, "Browse Files"),
                createElement(HiddenInput, { onChange: (e) => getImageFileData(e), ref: webInputRef, type: "file" }),
                createElement(OrText, null, "or"),
                isPlatform('desktop') ? (createElement(OrText, null, "\u2318 + V to Paste an Image or URL")) : (createElement(SecretTextInput, { value: '', placeholder: "Double tap here to paste an image" }))))),
        createElement(IonToast, { isOpen: toastMessage ? true : false, onDidDismiss: () => setToastMessage(undefined), message: toastMessage, duration: 3200, mode: "ios", position: "top" })));
};

const defaultAcceptedFileTypes = ['image/png', 'image/jpeg', 'image/bmp'];
const ImageUploadContext = createContext({});
const ImageUploadContextProvider = ({ children, acceptedFileTypes = defaultAcceptedFileTypes, firebaseStorageRef, buttonColor, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [pathPrefix, setPathPrefix] = useState('');
    const callbackFn = useRef();
    const open = (callbackFunction, opts) => {
        setIsOpen(true);
        setPathPrefix((opts === null || opts === void 0 ? void 0 : opts.pathPrefix) || '');
        callbackFn.current = callbackFunction;
    };
    const close = () => {
        setIsOpen(false);
        setPathPrefix('');
        callbackFn.current = undefined;
    };
    return (createElement(ImageUploadContext.Provider, { value: {
            isOpen,
            open,
            close,
        } },
        children,
        createElement(ImageUploadOverlay, { firebaseStorageRef: firebaseStorageRef, acceptedFileTypes: acceptedFileTypes, isOpen: isOpen, pathPrefix: pathPrefix, close: close, buttonColor: buttonColor, callbackFn: callbackFn.current })));
};

export { ImageUploadContext, ImageUploadContextProvider };
