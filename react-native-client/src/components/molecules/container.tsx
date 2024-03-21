import React from 'react';
import {View, StyleSheet} from "react-native";


const Container: React.FC = (props) => {
    return (
        <View style={container.container}>
            {props.children}
        </View>
    );
};


const container = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    }
});
export default Container;