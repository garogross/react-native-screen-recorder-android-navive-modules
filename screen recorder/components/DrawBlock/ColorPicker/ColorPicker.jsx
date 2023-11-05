import React, {useEffect, useState} from 'react';
import LinearGradient from "react-native-linear-gradient";
import {Animated, StyleSheet} from "react-native";

import TouchableSlider from "./TouchableSlider";


function ColorPicker({setCurColor, currColor}) {
    const [hueColor, setHueColor] = useState(0)
    const [satColor, setSatColor] = useState(0)
    const [valColor, setValColor] = useState(100)
    const [trackValue,setTrackValue] = useState(460)

    useEffect(() => {
         onColorChange(trackValue)
    },[trackValue])

    useEffect(() => {
        setCurColor(`hsl(${hueColor}, ${satColor}%, ${valColor}%)`)
    },[hueColor, satColor, valColor])
    const onColorChange = (val) => {
        if (val > 5) {
            setValColor(50)
            setSatColor(100)

        }
        if (val < 50) {
            setValColor(100 - val)
            setHueColor(0)
        }
        if (val >= 50 && val < 410) setHueColor(val - 50)
        if (val >= 410) {
            setValColor(460 - (val))
            setHueColor(360)
        }
    }

    const onTouchStart = (e) => {
        const {locationX} = e.nativeEvent
        const locPercentage = locationX/300*100
        const resValue = locPercentage/100*460
        setTrackValue(resValue)
    }


    const gradientColors = [
        'hsl(0, 0%, 100%)',
        'hsl(0, 100%, 50%)',
        'hsl(60, 100%, 50%)',
        'hsl(120, 100%, 50%)',
        'hsl(180, 100%, 50%)',
        'hsl(240, 100%, 50%)',
        'hsl(300, 100%, 50%)',
        'hsl(360, 100%, 50%)',
        'hsl(0, 100%, 0%)'
    ];

    return (
        <>
            <Animated.View style={styles.colorPickerBlock}>
                <TouchableSlider
                    values={[trackValue]}
                    min={0}
                    max={460}
                    step={1}
                    onTouchEnd={onTouchStart}
                    onValuesChange={([val]) => setTrackValue(val)}
                    onValuesChangeFinish={([val]) => setTrackValue(val)}
                    vertical={true}
                    selectedStyle={{backgroundColor: '#00000000'}}
                    trackStyle={{backgroundColor: '#00000000'}}
                    markerStyle={{
                        width: 14,
                        height: 14,
                        backgroundColor: currColor,
                        borderWidth: 1,
                        borderColor: '#fff'
                    }}
                />
            </Animated.View>
            <Animated.View style={styles.colorPickerBgWrapper}>
                <LinearGradient
                    colors={gradientColors.reverse()}
                    style={styles.colorPickerBg}
                ></LinearGradient>
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    colorPickerBlock: {
        position: 'absolute',
        right: -130,
        top: 170,
        height: 19,
        width: 300,
        zIndex: 9,
    },
    colorPickerBgWrapper: {
        width: 18,
        height: 300,
        position: "absolute",
        top: 220,
        right: 12,
        zIndex: 8,
        transform: [{translateY: -165}],
        borderRadius: 18 / 2,
    },
    colorPickerBg: {
        width: 18,
        height: 300,
        borderRadius: 18 / 2,
    },

    thumb: {
        height: 14,
        width: 14,
        borderRadius: 18 / 2,
        borderWidth: 1,
        borderColor: "#fff"
    },
})

export default ColorPicker;
