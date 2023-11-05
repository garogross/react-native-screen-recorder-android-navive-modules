import React from 'react';
import { View, PanResponder } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

class TouchableSlider extends MultiSlider {
    constructor(props) {
        super(props);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (e,gestureState) => this.handleTouchStart(e,gestureState),
            onPanResponderRelease: (e,gestureState) =>  this.handleTouchEnd(e,gestureState),
        });
    }

    handleTouchStart = (e,gestureState) => {
        this.props?.onTouchStart ? this.props.onTouchStart(e,gestureState) : null
    };

    handleTouchEnd = (e,gestureState) => {
        this.props?.onTouchEnd ? this.props.onTouchEnd(e,gestureState) : null

    };

    render() {
        return (
            <View {...this.panResponder.panHandlers}>
                {super.render()}
            </View>
        );
    }
}

export default TouchableSlider;
