import React, {useMemo} from 'react';
import {Text, TouchableNativeFeedback, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useAppSelector} from "../../hooks";
import {selectTheme} from "../../redux/slices/settingSlice";
import {getColors} from "../../consts";

export interface IDescriptionItemProps {
    title: string;
    icon: string;
    value: string;
    pressable?: boolean;
    onPress?: () => void;
    styles?: Object;
}

const DescriptionItem: React.FC<IDescriptionItemProps> =  ({title, icon, value, pressable = false, onPress , styles}) => {
    const theme = useAppSelector(selectTheme);
    const colors = useMemo(() => getColors(theme), [theme]);

    return (

        <View style={[{
            borderRadius: 10,
            overflow: 'hidden',
            minHeight: 40,
            marginBottom: 10,
        }, styles]}>
            <TouchableNativeFeedback  disabled={!pressable} background={TouchableNativeFeedback.Ripple(colors.textPurpleBlue, true)} style={{borderRadius: 10}} onPress={onPress}>
                <View style={{
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                    backgroundColor: colors.backgroundGrey,
                    alignItems: 'center',
                    borderRadius: 10,
                    // marginBottom: 15,
                    flexDirection: 'row'
                }}>
                    <View style={{marginRight: 10}}>
                        {icon}
                    </View>
                    <View>
                        <Text style={{color: colors.textBlack}}>{title}</Text>
                        <Text style={{color: colors.textGrey}}>{value}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback >
        </View>

    )
};

export default DescriptionItem;