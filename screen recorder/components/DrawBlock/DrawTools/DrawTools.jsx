import React from 'react';
import {View, StyleSheet, Pressable} from "react-native";
import SvgImage from "../../../assets/SvgImage";
import {drawIcon, eraserIcon} from "../../../assets/svg";
import ToolBtn from "../../ToolBtn/ToolBtn";

function DrawTools({setActiveCanvasTool,activeCanvasTool,canvasTools}) {
    return (
        <View style={styles.container}>
            <ToolBtn
                svgId={drawIcon}
                onPress={() => setActiveCanvasTool(canvasTools.brush)}
                isActive={activeCanvasTool === canvasTools.brush}
            />
            <ToolBtn
                svgId={eraserIcon}
                onPress={() => setActiveCanvasTool(canvasTools.eraser)}
                isActive={activeCanvasTool === canvasTools.eraser}
            />
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        position: 'absolute',
        bottom: 0,
        justifyContent: "center",
        gap: 20,
        alignItems: "center",
        paddingVertical: 10,
        flexDirection: 'row'
    },
})

export default DrawTools;
