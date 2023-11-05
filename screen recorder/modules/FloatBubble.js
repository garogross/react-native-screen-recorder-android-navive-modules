import React from 'react';
import { NativeModules} from "react-native";

const {FloatBubbleModule} = NativeModules
const {showOverlay, hideOverlay} = FloatBubbleModule


export {hideOverlay, showOverlay}
