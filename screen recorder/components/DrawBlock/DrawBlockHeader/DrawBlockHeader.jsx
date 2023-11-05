import React from 'react';
import {View, StyleSheet, Pressable} from "react-native";
import SvgImage from "../../../assets/SvgImage";
import {resetIcon, undoIcon} from "../../../assets/svg";
import ToolBtn from "../../ToolBtn/ToolBtn";

function DrawBlockHeader({undo,reset}) {


    return (
        <View style={styles.container}>
            <ToolBtn
                svgId={undoIcon}
                onPress={undo}
                isActive={true}
            />
            <ToolBtn
                svgId={resetIcon}
                onPress={reset}
                isActive={true}
            />
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        position: "absolute",
        zIndex: 9,
        paddingHorizontal: 10,
        paddingVertical: 4,
        justifyContent: "flex-end",
        flexDirection: 'row',
        gap: 10
    },
    undoBtn: {
        padding: 5
    }
})

export default DrawBlockHeader;
