import React from 'react';
import {View, ActivityIndicator, StyleSheet, ColorValue} from 'react-native';

interface ISpinnerProps {
    color: ColorValue;
    bg: string;
}
const  Spinner:React.FC<ISpinnerProps> = (props) => {
    return (
        <View style={[styles.wrapper, { backgroundColor: props.bg }]}>
            <ActivityIndicator size="large" style={{ marginBottom: 15 }} color={props.color} />
        </View>
    );
}

export default Spinner;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});