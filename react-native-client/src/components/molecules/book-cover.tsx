import React, { useState} from 'react';
import {Dimensions, View, StyleSheet, Image} from "react-native";
import {colors} from "../../consts";
import { Shadow } from 'react-native-shadow-2';
import {LinearGradient} from "expo-linear-gradient";

interface IBookCoverProps {
    uri: string;
}

const BookCover: React.FC<IBookCoverProps> = ({uri}) => {
    const [width, setWidth] = useState(0);
    const handleLayout = event => {
        event.persist();
        const { width } = event.nativeEvent.layout;
        setWidth(() => width);
    };



    return (

            <View style={[styles.bookContainer]} onLayout={handleLayout}>
                <View style={[styles.bookCoverItem, styles.bookBackCover]}>
                    <Image
                        source={{uri}}
                        style={[styles.image]}
                        blurRadius={100}
                        resizeMode="cover"
                    />
                </View>
                <View style={[styles.bookCoverItem, styles.list, {
                    right: width * .1 / 5
                }]}></View>
                <View style={[styles.bookCoverItem, styles.list, {
                    right: width * .1 / 5 * 2
                }]}></View>
                <View style={[styles.bookCoverItem, styles.list, {
                    right: width * .1 / 5 * 2.8
                }]}></View>
                <View style={[styles.bookCoverItem, styles.list, {
                    right: width * .1 / 5 * 3.8
                }]}></View>

                <View style={[styles.bookCoverItem, styles.bookFrontCover]}>
                    <Image
                        source={{uri}}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
            </View>
    );
};

const styles = StyleSheet.create({

    bookContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent', // Set a background color
        overflow: 'hidden', // Add overflow: hidden
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
        borderColor: colors.backgroundGrey,
        height: '98%',
    },

    bookBackCover:{
        right: 0,
        backgroundColor: colors.textGrey,
    },

    bookFrontCover:{
        backgroundColor: colors.textGrey,
    },
    image: {
        flex: 1,
        borderRadius: 10,
    },
})

export default React.memo(BookCover);