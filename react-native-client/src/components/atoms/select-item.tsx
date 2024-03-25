import React, {useContext, useMemo} from "react";
import {TouchableNativeFeedback, View} from "react-native";
import {getColors} from "../../consts";
import {AppContext} from "../../app/app-context";

interface ISelectItemProps {
    children: React.ReactNode;
    onPress: () => void;
    isActive?: boolean;
    styles?: Object;
}

const SelectItem: React.FC<ISelectItemProps> = ({children, onPress, isActive, styles}) => {
    const {theme, language} = useContext(AppContext);
    const colors =  useMemo(() => getColors(theme), [theme]);

    return (
        <View style={[internalStyles.roundParent, styles]}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.touchAnimation, true)} style={{borderRadius: 10}} onPress={onPress}>
                <View style={[internalStyles.selectItem, {backgroundColor: colors.backgroundGrey}, isActive && {backgroundColor: colors.textPurpleBlue}]}>
                    {children}
                </View>
            </TouchableNativeFeedback >
        </View>
    )
}


const internalStyles = {
    roundParent: {
        borderRadius: 10,
        overflow: 'hidden',
        minHeight: 40,
        marginBottom: 10,
    },


    selectItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        padding: 10,
        borderRadius: 10,
    },

}


export default React.memo(SelectItem);