import React from 'react';
import {Pressable,StyleSheet} from "react-native";
import SvgImage from "../../assets/SvgImage";

const ToolBtn = ({svgId, onPress, isActive,strokeWidth}) => (
    <Pressable
        style={({pressed}) => [{opacity: pressed ? 0.7 : 1}, styles.toolBtn]}
        onPress={onPress}
    >
        <SvgImage
            id={svgId}
            color={isActive ? "#81CFB0" : "#fff"}
            strokeWidth={strokeWidth || null}
        />
    </Pressable>
)

const styles = StyleSheet.create({
    toolBtn: {
        padding: 8,
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        backgroundColor: "#000e0a",
        justifyContent: "center",
        alignItems: 'center'
    }
})

export default ToolBtn;
