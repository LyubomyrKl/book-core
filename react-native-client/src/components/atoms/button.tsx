import React from 'react';
import {TouchableOpacity, Text, StyleSheet, useColorScheme} from "react-native";
import {colors} from "../../consts";

interface IAppButton {
    title: string;
    onPress: () => void;
}

const AppButton: React.FC<IAppButton> = (props) => {

    const {title, onPress} = props;
    const theme = useColorScheme();

    console.log(theme)
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: theme === 'light' ? colors.black : colors.darkShade}]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AppButton;