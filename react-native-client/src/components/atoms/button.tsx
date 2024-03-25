import React, {useContext, useMemo, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, useColorScheme, Animated} from "react-native";
import {getColors} from "../../consts";
import {AppContext} from "../../app/app-context";

interface IAppButton {
    title: string;
    onPress?: () => void;
    isDisabled?: boolean;
}

const AppButton: React.FC<IAppButton> = (props) => {
    const {title, onPress, isDisabled} = props;
    const [animation] = useState(new Animated.Value(1));
    const {theme} = useContext(AppContext)
    const colors = useMemo(() => getColors(theme), [theme]);
    const handlePressIn = () => {
        Animated.spring(animation, {
            toValue: 0.8,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(animation, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
            <TouchableOpacity
                disabled={!isDisabled}
                style={[styles.button, {backgroundColor: isDisabled ? '#bbbbbb' : theme === 'light' ? colors.textBlack : colors.darkShade}]}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
            >
                <Animated.View style={ {transform: [{ scale: animation }]}}>
                    <Text style={[styles.buttonText]}>{title}</Text>
                </Animated.View>
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

export default React.memo(AppButton);