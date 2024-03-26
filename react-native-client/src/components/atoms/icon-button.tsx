import React, {useMemo} from 'react';
import {TouchableNativeFeedback, View} from "react-native";
import {getColors} from "../../consts";
import {selectTheme} from "../../redux/slices/settingSlice";
import {useAppSelector} from "../../hooks";
import Ionicons from "react-native-vector-icons/Ionicons";

interface IBackButtonProps {
    clickHandler: () => void;
    children: React.ReactNode;
}

const IconButton: React.FC<IBackButtonProps> = ({clickHandler, children}) => {
    const theme = useAppSelector(selectTheme)
    const colors = useMemo(() => getColors(theme), [theme])

    return (
        <View style={{
            borderRadius: 20,
            overflow: 'hidden',
        }}>
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(colors.textPurpleBlue, false)}
                onPress={clickHandler}>
                <View style={{
                    width: 40, // Adjust as per your requirement
                    height: 40, // Adjust as per your requirement
                    borderRadius: 20, // Make it half of width/height for a round shape
                    backgroundColor: 'rgba(255,255,255,0.10)', // Adjust opacity by changing the last value
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