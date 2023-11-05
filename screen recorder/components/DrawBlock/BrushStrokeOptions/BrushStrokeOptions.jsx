import React from 'react';
import {View, StyleSheet, Pressable} from "react-native";
import SvgImage from "../../../assets/SvgImage";
import {drawIcon, eraserIcon} from "../../../assets/svg";
import ToolBtn from "../../ToolBtn/ToolBtn";

function BrushStrokeOptions({brushStroke,setBrushStroke,canvasTools}) {
    return (
        <View style={styles.container}>
            <ToolBtn
                svgId={drawIcon}
                onPress={() => setBrushStroke(5)}
                isActive={brushStroke === 5}
                strokeWidth={0}
            />
            <ToolBtn
                svgId={drawIcon}
                onPress={() => setBrushStroke(8)}
                isActive={brushStroke === 8}
                strokeWidth={1}
            />
            <ToolBtn
                svgId={drawIcon}
                onPress={() => setBrushStroke(11)}
                isActive={brushStroke === 11}
                strokeWidth={1.5}
            />
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        position: 'absolute',
        bottom: 50,
        justifyContent: "center",
        gap: 20,
        alignItems: "center",
        paddingVertical: 10,
        flexDirection: 'row'
    },
})

export default BrushStrokeOptions;
