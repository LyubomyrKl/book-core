import React from 'react';
import {View, StyleSheet} from "react-native";


interface ContainerProps {
    children: React.ReactNode;
}
const Container: React.FC<ContainerProps> = ({children}) => {
    return (
        <View style={container.container}>
            {children}
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