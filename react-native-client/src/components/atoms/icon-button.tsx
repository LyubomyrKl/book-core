import React, {useMemo} from 'react';
import {TouchableNativeFeedback, View} from "react-native";
import {getColors} from "../../consts";
import {selectTheme} from "../../redux/slices/settingSlice";
import {useAppSelector} from "../../hooks";

interface IBackButtonProps {
    size?: number;
    bgColor?: string;
    clickHandler: () => void;
    children: React.ReactNode;
}

const IconButton: React.FC<IBackButtonProps> = ({clickHandler, children, bgColor = 'rgba(255,255,255,0.10)', size = 40}) => {
    const theme = useAppSelector(selectTheme)
    const colors = useMemo(() => getColors(theme), [theme])

    return (
        <View style={{
            borderRadius: 1000,
            overflow: 'hidden',
        }}>
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(colors.textPurpleBlue, false)}
                onPress={clickHandler}>
                <View style={{
                    width: size, // Adjust as per your requirement
                    height: size, // Adjust as per your requirement
                    borderRadius: 20, // Make it half of width/height for a round shape
                    backgroundColor: bgColor, // Adjust opacity by changing the last value
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {children}
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

export default IconButton;