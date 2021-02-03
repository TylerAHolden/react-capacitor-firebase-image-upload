/* eslint-disable */
import { createElement, Fragment, useState, useRef, useCallback, useEffect, createContext } from 'react';
import { isPlatform, IonIcon, IonBackdrop, IonSpinner, IonToast } from '@ionic/react';
import styled from 'styled-components';
import { closeOutline } from 'ionicons/icons';
import { v4 } from 'uuid';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

// modified from https://gist.github.com/dcondrey/183971f17808e9277572
var getColorContrast = function (rgb) {
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
var hexToRgb = function (hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (_m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return "rgb(" + parseInt(result ? result[1] : '0', 16) + "," + parseInt(result ? result[2] : '0', 16) + "," + parseInt(result ? result[3] : '0', 16) + ")";
};

var TextContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-size: 15px;\n  ", "\n"], ["\n  font-size: 15px;\n  ",
    "\n"])), function (_a) {
    var uppercase = _a.uppercase;
    return uppercase ? "text-transform: uppercase; letter-spacing: 1.5px;" : '';
});
var IconContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-size: 20px;\n  display: flex;\n  ", "\n"], ["\n  font-size: 20px;\n  display: flex;\n  ", "\n"])), function (_a) {
    var iconOnly = _a.iconOnly;
    return (iconOnly ? "font-size: 28px;" : "padding-right: 6px;");
});
var Container = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  margin: 0;\n  padding: ", ";\n  outline: none;\n  justify-content: center;\n  align-items: center;\n  border-radius: 10px;\n  line-height: 15px;\n  cursor: pointer;\n  text-decoration: none;\n  border: none;\n  background: ", ";\n  ", " {\n    color: ", ";\n  }\n\n  &", " {\n    ", ";\n  }\n\n  ion-icon {\n    color: ", ";\n  }\n"], ["\n  display: flex;\n  margin: 0;\n  padding: ",
    ";\n  outline: none;\n  justify-content: center;\n  align-items: center;\n  border-radius: 10px;\n  line-height: 15px;\n  cursor: pointer;\n  text-decoration: none;\n  border: none;\n  background: ", ";\n  ", " {\n    color: ", ";\n  }\n\n  &", " {\n    ", ";\n  }\n\n  ion-icon {\n    color: ", ";\n  }\n"])), function (_a) {
    var icon = _a.icon, small = _a.small, iconOnly = _a.iconOnly;
    var yPadding = 6;
    var xPadding = iconOnly ? 6 : 12;
    if (icon) {
        yPadding = yPadding / 2;
        xPadding = xPadding / 2;
    }
    if (!small) {
        yPadding = yPadding * 2;
        xPadding = xPadding + 4;
    }
    return yPadding + "px " + xPadding + "px";
}, function (_a) {
    var color = _a.color, clear = _a.clear;
    return (clear ? 'transparent' : color);
}, TextContainer, function (_a) {
    var color = _a.color, clear = _a.clear;
    return (clear ? color : getColorContrast(color));
}, isPlatform('desktop') ? ':hover' : ':active', function (_a) {
    var clear = _a.clear;
    return (clear ? "background: rgba(0,0,0,.05)" : "opacity: .9");
}, function (_a) {
    var color = _a.color, clear = _a.clear;
    return (clear ? color : getColorContrast(color));
});
var Button = function (_a) {
    var _b = _a.small, small = _b === void 0 ? false : _b, children = _a.children, disabled = _a.disabled, icon = _a.icon, href = _a.href, color = _a.color, _c = _a.clear, clear = _c === void 0 ? false : _c, onClick = _a.onClick, _d = _a.uppercase, uppercase = _d === void 0 ? false : _d, className = _a.className, target = _a.target;
    return (createElement(Container, { as: href ? 'a' : 'button', small: small, icon: icon, href: href, target: target, disabled: disabled, onClick: function () { return (onClick ? onClick() : undefined); }, clear: clear, color: color, iconOnly: !children ? true : false, className: className },
        icon && (createElement(IconContainer, { iconOnly: !children ? true : false },
            createElement(IonIcon, { icon: icon }))),
        createElement(TextContainer, { uppercase: uppercase }, children)));
};
var templateObject_1, templateObject_2, templateObject_3;

var Container$1 = styled.div(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: space-between;\n"])));
var StyledH2 = styled.h2(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  color: #222;\n  font-size: 32px;\n  font-weight: 700;\n  text-align: left;\n"], ["\n  margin: 0;\n  padding: 0;\n  color: #222;\n  font-size: 32px;\n  font-weight: 700;\n  text-align: left;\n"])));
var StyledP = styled.p(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  color: #222;\n  font-size: 14px;\n  font-weight: 400;\n  text-align: left;\n  width: 100%;\n  opacity: 0.5;\n"], ["\n  margin: 0;\n  padding: 0;\n  color: #222;\n  font-size: 14px;\n  font-weight: 400;\n  text-align: left;\n  width: 100%;\n  opacity: 0.5;\n"])));
var BottomBorder = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  height: 1px;\n  width: 100%;\n  background: black;\n  opacity: 0.1;\n  margin-top: 8px;\n  margin-bottom: 8px;\n"], ["\n  height: 1px;\n  width: 100%;\n  background: black;\n  opacity: 0.1;\n  margin-top: 8px;\n  margin-bottom: 8px;\n"])));
var TitleBar = function (_a) {
    var title = _a.title, onCloseClick = _a.onCloseClick, helperText = _a.helperText;
    return (createElement(Fragment, null,
        createElement(Container$1, null,
            createElement(StyledH2, null, title),
            createElement(Button, { onClick: onCloseClick, color: "#222", clear: true, icon: closeOutline })),
        createElement(BottomBorder, null),
        helperText && createElement(StyledP, null, helperText)));
};
var templateObject_1$1, templateObject_2$1, templateObject_3$1, templateObject_4;

var oxfordJoinArray = function (arr, conjunction, ifempty) {
    var l = arr.length;
    if (!l)
        return ifempty;
    if (l < 2)
        return arr[0];
    if (l < 3)
        return arr.join(" " + conjunction + " ");
    arr = arr.slice();
    arr[l - 1] = conjunction + " " + arr[l - 1];
    return arr.join(', ');
};

var Container$2 = styled.div(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  position: fixed;\n  z-index: 30000;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  backdrop-filter: blur(12px) brightness(102%) saturate(1.4);\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  padding: 12px;\n"], ["\n  position: fixed;\n  z-index: 30000;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  backdrop-filter: blur(12px) brightness(102%) saturate(1.4);\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  padding: 12px;\n"])));
var OverlayContentContainer = styled.div(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n  z-index: 10;\n  position: relative;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  flex-direction: column;\n  max-width: 700px;\n  width: 100%;\n  min-height: 500px;\n  padding: 24px;\n  background: rgba(241, 241, 241, 0.88);\n  border-radius: 16px;\n  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1),\n    0px 10px 34px -12px rgba(0, 0, 0, 0.43);\n  @media (max-width: 650px) {\n    padding: 12px;\n  }\n"], ["\n  z-index: 10;\n  position: relative;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  flex-direction: column;\n  max-width: 700px;\n  width: 100%;\n  min-height: 500px;\n  padding: 24px;\n  background: rgba(241, 241, 241, 0.88);\n  border-radius: 16px;\n  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1),\n    0px 10px 34px -12px rgba(0, 0, 0, 0.43);\n  @media (max-width: 650px) {\n    padding: 12px;\n  }\n"])));
var OverlayContent = styled.div(templateObject_3$2 || (templateObject_3$2 = __makeTemplateObject(["\n  flex: 1;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n"], ["\n  flex: 1;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n"])));
var SecretTextInput = styled.input(templateObject_4$1 || (templateObject_4$1 = __makeTemplateObject(["\n  background: transparent;\n  border: none;\n  outline: none;\n  padding: 12px;\n  width: 100%;\n  text-align: center;\n"], ["\n  background: transparent;\n  border: none;\n  outline: none;\n  padding: 12px;\n  width: 100%;\n  text-align: center;\n"])));
var OrText = styled.p(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  margin-top: 8px;\n  padding: 0;\n  color: #222;\n  opacity: 0.5;\n"], ["\n  margin-top: 8px;\n  padding: 0;\n  color: #222;\n  opacity: 0.5;\n"])));
var SaveButton = styled(Button)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  margin-top: 36px;\n  min-width: 140px;\n"], ["\n  margin-top: 36px;\n  min-width: 140px;\n"])));
var HiddenInput = styled.input(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  position: absolute;\n  left: -9999px;\n  top: -9999px;\n  width: 1px;\n  height: 1px;\n"], ["\n  position: absolute;\n  left: -9999px;\n  top: -9999px;\n  width: 1px;\n  height: 1px;\n"])));
var PreviewImage = styled.img(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  max-height: 50vh;\n  max-width: 90%;\n  margin-bottom: 6px;\n"], ["\n  max-height: 50vh;\n  max-width: 90%;\n  margin-bottom: 6px;\n"])));
var ImageUploadOverlay = function (_a) {
    var isOpen = _a.isOpen, close = _a.close, callbackFn = _a.callbackFn, acceptedFileTypes = _a.acceptedFileTypes, firebaseStorageRef = _a.firebaseStorageRef, buttonColor = _a.buttonColor, pathPrefix = _a.pathPrefix;
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = useState(''), image = _c[0], setImage = _c[1];
    var _d = useState(), toastMessage = _d[0], setToastMessage = _d[1];
    var webInputRef = useRef();
    var clearState = function () {
        setIsLoading(false);
        setImage('');
    };
    var checkPasted = useCallback(function (e) {
        if (e.clipboardData && e.clipboardData.items.length > 0) {
            for (var i = 0; i < e.clipboardData.items.length; i++) {
                var fileType = e.clipboardData.items[i].type;
                if (acceptedFileTypes.includes(fileType)) {
                    var blob = e.clipboardData.items[i].getAsFile();
                    var URL_1 = window.URL;
                    if (blob) {
                        var src = URL_1.createObjectURL(blob);
                        setImage(src);
                    }
                }
                else if (e.clipboardData.items[i].kind === 'string') {
                    e.clipboardData.items[i].getAsString(function (clipboardString) {
                        if (clipboardString.startsWith('https://', 0) ||
                            clipboardString.startsWith('http://', 0)) {
                            setImage(clipboardString.replace('http://', 'https://'));
                        }
                    });
                }
            }
        }
    }, []);
    useEffect(function () {
        clearState();
        if (isOpen) {
            window.addEventListener('paste', checkPasted);
        }
        else {
            window.removeEventListener('paste', checkPasted);
        }
    }, [checkPasted, isOpen]);
    var getFile = function () { return __awaiter(void 0, void 0, void 0, function () {
        var webInputElement;
        return __generator(this, function (_a) {
            webInputElement = webInputRef === null || webInputRef === void 0 ? void 0 : webInputRef.current;
            webInputElement.click();
            return [2 /*return*/];
        });
    }); };
    var getImageFileData = function (e) {
        var _a;
        if (((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.files) && e.target.files[0]) {
            var fileType = e.target.files[0].type;
            if (!acceptedFileTypes.includes(fileType)) {
                setToastMessage('Cannot accept the file type: ' + e.target.files[0].type);
                return;
            }
            var reader_1 = new FileReader();
            reader_1.addEventListener('load', function () {
                // convert image file to base64 string
                setImage(String(reader_1.result));
            }, false);
            reader_1.readAsDataURL(e.target.files[0]);
        }
    };
    var validateImage = function () {
        setIsLoading(true);
        if (image) {
            uploadImage();
        }
        else {
            setIsLoading(false);
            setToastMessage('No image or input found');
        }
    };
    var getImageDimensions = function (src) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    var img = new Image();
                    img.onload = function () {
                        var height = img.height;
                        var width = img.width;
                        resolve({ width: width, height: height });
                    };
                    img.src = src;
                })];
        });
    }); };
    var uploadImage = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, blob, dimensionMetadata, imageUUID, firebaseImageRef, imageURI, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 7]);
                    return [4 /*yield*/, fetch(image)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.blob()];
                case 2:
                    blob = _a.sent();
                    return [4 /*yield*/, getImageDimensions(image)];
                case 3:
                    dimensionMetadata = _a.sent();
                    if (!acceptedFileTypes.includes(blob.type)) {
                        throw new Error('Cannot accept the file type: ' + blob.type);
                    }
                    imageUUID = v4();
                    if (!firebaseStorageRef) {
                        throw new Error('Firebase Storage Reference Object not found. Make sure to pass firebase.storage().ref() into the provider');
                    }
                    firebaseImageRef = firebaseStorageRef.child((pathPrefix ? pathPrefix : '') +
                        imageUUID +
                        '.' +
                        blob.type.split('/')[1]);
                    return [4 /*yield*/, firebaseImageRef
                            .put(blob, { customMetadata: dimensionMetadata })
                            .then(function (snapshot) { return __awaiter(void 0, void 0, void 0, function () {
                            var downloadURI;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, snapshot.ref.getDownloadURL()];
                                    case 1:
                                        downloadURI = _a.sent();
                                        return [2 /*return*/, downloadURI];
                                }
                            });
                        }); }, function (err) {
                            throw new Error((err === null || err === void 0 ? void 0 : err.message) || 'There was an error uploading the image :/');
                        })];
                case 4:
                    imageURI = _a.sent();
                    if (imageURI) {
                        // force https for images
                        if (imageURI.indexOf('http:') !== -1) {
                            imageURI.replace('http:', 'https:');
                        }
                        _close(imageURI);
                    }
                    return [3 /*break*/, 7];
                case 5:
                    err_1 = _a.sent();
                    console.log(err_1);
                    setToastMessage('Error: ' + err_1.message);
                    return [3 /*break*/, 7];
                case 6:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var _close = function (newImageURL) {
        if (callbackFn)
            callbackFn(newImageURL);
        close();
    };
    if (!isOpen)
        return null;
    return (createElement(Container$2, null,
        createElement(IonBackdrop, { onIonBackdropTap: function () { return _close(undefined); } }),
        createElement(OverlayContentContainer, null,
            createElement(TitleBar, { title: image ? 'Preview' : 'Image Upload', onCloseClick: function () { return _close(undefined); }, helperText: image
                    ? undefined
                    : "Accepted File Types: " + oxfordJoinArray(acceptedFileTypes.map(function (fileType) { return fileType.split('/')[1]; }), '&', 'None') }),
            image ? (createElement(OverlayContent, null,
                createElement(PreviewImage, { src: image, alt: "Selected" }),
                createElement(Button, { onClick: function () { return clearState(); }, clear: true, color: buttonColor || '#222', small: true }, "Clear Image"),
                createElement(SaveButton, { color: buttonColor || '#222', disabled: isLoading, onClick: validateImage }, isLoading ? createElement(IonSpinner, { name: "crescent" }) : 'Save'))) : (createElement(OverlayContent, null,
                createElement(Button, { onClick: getFile, color: buttonColor || '#222' }, "Browse Files"),
                createElement(HiddenInput, { onChange: function (e) { return getImageFileData(e); }, ref: webInputRef, type: "file" }),
                createElement(OrText, null, "or"),
                isPlatform('desktop') ? (createElement(OrText, null, "\u2318 + V to Paste an Image or URL")) : (createElement(SecretTextInput, { value: '', placeholder: "Double tap here to paste an image" }))))),
        createElement(IonToast, { isOpen: toastMessage ? true : false, onDidDismiss: function () { return setToastMessage(undefined); }, message: toastMessage, duration: 3200, mode: "ios", position: "top" })));
};
var templateObject_1$2, templateObject_2$2, templateObject_3$2, templateObject_4$1, templateObject_5, templateObject_6, templateObject_7, templateObject_8;

var defaultAcceptedFileTypes = ['image/png', 'image/jpeg', 'image/bmp'];
var ImageUploadContext = createContext({});
var ImageUploadContextProvider = function (_a) {
    var children = _a.children, _b = _a.acceptedFileTypes, acceptedFileTypes = _b === void 0 ? defaultAcceptedFileTypes : _b, firebaseStorageRef = _a.firebaseStorageRef, buttonColor = _a.buttonColor;
    var _c = useState(false), isOpen = _c[0], setIsOpen = _c[1];
    var _d = useState(''), pathPrefix = _d[0], setPathPrefix = _d[1];
    var callbackFn = useRef();
    var open = function (callbackFunction, opts) {
        setIsOpen(true);
        setPathPrefix((opts === null || opts === void 0 ? void 0 : opts.pathPrefix) || '');
        callbackFn.current = callbackFunction;
    };
    var close = function () {
        setIsOpen(false);
        setPathPrefix('');
        callbackFn.current = undefined;
    };
    return (createElement(ImageUploadContext.Provider, { value: {
            isOpen: isOpen,
            open: open,
            close: close,
        } },
        children,
        createElement(ImageUploadOverlay, { firebaseStorageRef: firebaseStorageRef, acceptedFileTypes: acceptedFileTypes, isOpen: isOpen, pathPrefix: pathPrefix, close: close, buttonColor: buttonColor, callbackFn: callbackFn.current })));
};

export { ImageUploadContext, ImageUploadContextProvider };
