import {useState} from "react";
import {View,StyleSheet} from "react-native";
import Svg, {Path} from "react-native-svg";
import DrawBlockHeader from "./DrawBlockHeader/DrawBlockHeader";
import DrawTools from "./DrawTools/DrawTools";
import ColorPicker from "./ColorPicker/ColorPicker";
import BrushStrokeOptions from "./BrushStrokeOptions/BrushStrokeOptions";

const canvasTools = {
    eraser: "eraser",
    brush: "brush"
}

const DrawBlock = () => {
    const [currentPath, setCurrentPath] = useState([]);
    const [paths, setPaths] = useState([]);
    const [currColor, setCurColor] = useState(`#fff`)
    const [brushStroke,setBrushStroke] = useState(5)
    const [activeCanvasTool, setActiveCanvasTool] = useState(canvasTools.brush);

    const onTouchMove = (event) => {
        const locationX = event.nativeEvent.locationX;
        const locationY = event.nativeEvent.locationY;
        const pathLocation = `${locationX.toFixed(0)},${locationY.toFixed(0)}`
        if (activeCanvasTool == canvasTools.brush) {
            const newPath = [...currentPath];
            const newPoint = `${newPath.length === 0 ? 'M' : 'L'}${pathLocation} `;

            newPath.push(newPoint);
            setCurrentPath(newPath);
        } else if (activeCanvasTool == canvasTools.eraser) {
            const newPaths = paths.map((path) => {
                const paths = path.path.map(item => {
                    const pathLocations = item.slice(1).trim().split(',')
                    if (
                        locationX < +pathLocations[0] + 10 &&
                        locationX > +pathLocations[0] - 10 &&
                        locationY < +pathLocations[1] + 10 &&
                        locationY > +pathLocations[1] - 10
                    ) {
                        return item.replace(item, `M${item.slice(1)}`)
                    } else {
                        return item
                    }
                })

                return {
                    color: path.color,
                    path: paths,
                    stroke: path.stroke
                }
            })
            setPaths(newPaths)
        }
    };

    const onTouchEnd = () => {
        const currentPaths = [...paths];
        const newPath = [...currentPath];

        currentPaths.push({
            path: newPath,
            color: currColor,
            stroke: brushStroke
        });
        setPaths(currentPaths);

        setCurrentPath([]);
    };

    const undo = () => {
        if (activeCanvasTool === canvasTools.text) {
            // const textsCopy = [...texts]
            // textsCopy.pop()
            // setTexts(textsCopy)
        } else {
            const pathsCopy = [...paths]
            pathsCopy.pop()
            setPaths(pathsCopy)
        }
    }

    const reset = () => {
        setPaths([])
    }

    return (
        <View style={styles.container}>
            <DrawBlockHeader
                undo={undo}
                reset={reset}
            />
            <View
                style={styles.drawBlock}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <Svg style={styles.canvas}>
                    {paths.length > 0 &&
                        paths.map((item, index) => {
                            return (
                                <Path
                                    key={`path-${index}`}
                                    d={item.path.join('')}
                                    stroke={item.color}
                                    fill={'transparent'}
                                    strokeWidth={item.stroke}
                                    strokeLinejoin={'round'}
                                    strokeLinecap={'round'}
                                />
                            )
                        })}
                    <Path
                        d={currentPath.join('')}
                        stroke={currColor}
                        fill={'transparent'}
                        strokeWidth={brushStroke}
                        strokeLinejoin={'round'}
                        strokeLinecap={'round'}
                    />
                </Svg>
            </View>
            <ColorPicker
                setCurColor={setCurColor}
                currColor={currColor}
                />
            {activeCanvasTool === canvasTools.brush ?
                <BrushStrokeOptions
                brushStroke={brushStroke}
                setBrushStroke={setBrushStroke}
            /> : null}
            <DrawTools
                canvasTools={canvasTools}
                setActiveCanvasTool={setActiveCanvasTool}
                activeCanvasTool={activeCanvasTool}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    drawBlock: {
        flex: 1,
    }
})

export default DrawBlock
