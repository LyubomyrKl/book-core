import React, {useCallback, useMemo, useState} from 'react';
import {View, StyleSheet, Image, LayoutChangeEvent} from "react-native";
import {getColors} from "../../consts";
import {Shadow} from 'react-native-shadow-2';
import {useAppSelector} from "../../hooks";
import {selectTheme} from "../../redux/slices/settingSlice";


interface IBookCoverProps {
    uri: string;
    enableShadow?: boolean
}

const BookCover: React.FC<IBookCoverProps> = ({uri, enableShadow = false}) => {
    const [width, setWidth] = useState(0);
    const theme = useAppSelector(selectTheme)

    const colors = useMemo(() => getColors(theme), [theme]);

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width); // Assuming setWidth is a state setter function
    }, []);


    return (

            <Shadow disabled={enableShadow} style={{width: '100%', height: '100%', borderRadius: 10}}
                    distance={5}
                    startColor={'rgba(108,108,108,0.2)'}
                    endColor={'rgba(0,0,0,0)'}
                    offset={[-5, 25]}
                    corners={{topEnd: true, bottomEnd: true, topStart: true, bottomStart: true}}
                    sides={{ start: true, end: true, top: true, bottom: true }}
            >
                <View style={[styles.bookContainer]} onLayout={handleLayout}>
                    <View style={[styles.bookCoverItem, styles.bookBackCover, {backgroundColor: colors.textGrey}]}>
                        <Image
                            source={{uri}}
                            style={[styles.image]}
                            blurRadius={100}
                            resizeMode="cover"
                        />
                        {/*<FastImage*/}
                        {/*    style={[styles.image]}*/}
                        {/*    source={{*/}
                        {/*        uri,*/}
                        {/*        priority: FastImage.priority.normal,*/}
                        {/*    }}*/}
                        {/*    resizeMode={FastImage.resizeMode.cover}*/}
                        {/*/>*/}
                    </View>
                    <View style={[styles.bookCoverItem, styles.list, {
                        borderColor: colors.backgroundGrey,
                        right: width * .1 / 5
                    }]}></View>
                    <View style={[styles.bookCoverItem, styles.list, {
                        borderColor: colors.backgroundGrey,
                        right: width * .1 / 5 * 2
                    }]}></View>
                    <View style={[styles.bookCoverItem, styles.list, {
                        borderColor: colors.backgroundGrey,
                        right: width * .1 / 5 * 2.8
                    }]}></View>
                    <View style={[styles.bookCoverItem, styles.list, {
                        borderColor: colors.backgroundGrey,
                        right: width * .1 / 5 * 3.8
                    }]}></View>

                    <View style={[styles.bookCoverItem, {backgroundColor: colors.textGrey}]}>
                        <Image
                            source={{uri}}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                </View>
            </Shadow>
    );
};

const styles = StyleSheet.create({

    bookContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent', // Set a background color
    },

    bookCoverItem: {
        position: 'absolute',
        height: '100%',
        width: '90%',
        borderRadius: 10,
    },

    list: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        height: '98%',
    },

    bookBackCover:{
        right: 0,
    },

    image: {
        flex: 1,
        borderRadius: 10,
    },
})

export default React.memo(BookCover);