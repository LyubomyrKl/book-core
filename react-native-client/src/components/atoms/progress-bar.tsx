import React, {useMemo} from 'react';
import {View, StyleSheet} from "react-native";
import {getColors} from "../../consts";
import {selectTheme} from "../../redux/slices/settingSlice";
import {useAppSelector} from "../../hooks";

interface ProgressBarProps {
    isFatLine: boolean;
    percentProgress?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({isFatLine, percentProgress}) => {
    const theme = useAppSelector(selectTheme)
    const colors = useMemo(() => getColors(theme), [theme])

    return (
        <View style={styles.progressBarBox}>
            <View style={[styles.progressBar, { height: isFatLine ? 4 : 2, backgroundColor: colors.backgroundGrey,}]}>
                <View style={[styles.progressBar, { height: isFatLine ? 4 : 2 , backgroundColor: colors.textPurpleBlue , width: `${percentProgress}%`}]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    progressBarBox: {
        display: 'flex',
        flexDirection: 'row',
    },

    progressBar: {
        width: '100%',
    },
})

export default React.memo(ProgressBar);