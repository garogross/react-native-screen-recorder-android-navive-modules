import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Pressable, AppRegistry} from 'react-native';
import {showOverlay} from "./modules/FloatBubble";
import {CameraRoll} from "@react-native-camera-roll/camera-roll";
import ReactNativeRecordScreen from "react-native-record-screen";
import {useState} from "react";
import DrawBlock from "./components/DrawBlock/DrawBlock";

AppRegistry.registerComponent('DrawBlock', () => DrawBlock);

export default function App() {
    const [isRecording, setIsRecording] = useState(false)


    const onStart = () => {
        if (!isRecording) {
            showOverlay("DrawBlock",() => onStop(false),() => onStop(true))
            setIsRecording(true)
            // ReactNativeRecordScreen.startRecording().catch((error) => console.error(error))
        } else {
            onStop()
        }
    }

    const onStop = async (isSave) => {
        // const res = await ReactNativeRecordScreen.stopRecording().catch((error) =>
        //     console.warn(error)
        // );
        //
        // if (isSave) {
        //     await CameraRoll.save(res.result.outputURL)
        // }
        setIsRecording(false)
        console.log(isSave ? 'saved' : 'closed')
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={{backgroundColor: 'grey', padding: 8}}
                onPress={onStart}><Text>{isRecording ? "stop" : 'Start'}</Text></Pressable>
            <Text>close up App.js to start working on your app!</Text>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 100
    },
});
