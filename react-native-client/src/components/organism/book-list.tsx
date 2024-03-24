import React, {useContext, useEffect, useId, useState} from 'react';
import {Alert, Animated, Dimensions, ScrollView, StyleSheet, View} from "react-native";
import BookItem, {IBookDetail} from "./book-item";
import FlatList = Animated.FlatList;
import {AppContext} from "../../app/app-context";
import { customAlphabet } from 'nanoid/non-secure';
import {TouchableRipple} from "react-native-paper";
import {colors} from "../../consts";

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

interface IBookListProps {
    books: IBookDetail[],
    navigation: any,
}

const BookList: React.FC<IBookListProps> = ({books, navigation}) => {
    const {windowSize} = useContext(AppContext);

    const renderItems = ({item}) => (
        // Todo: Add key to BookItem
        <View style={[styles.listItem, {  width: windowSize.width > 400 ? '50%' : '100%',}]}>
            <TouchableRipple rippleColor={colors.backgroundGrey} style={{paddingRight: 30}} onPress={() => Alert.alert('click')} >
                <BookItem
                    bookDetail={item}
                    onButtonPress={() => navigation.navigate('BooksDetail', {id: item.id})}
                />
            </TouchableRipple>
        </View>

    );


    return (
        <FlatList
            data={books}
            renderItem={renderItems}
            keyExtractor={() => nanoid()}
            numColumns={windowSize.width > 400 ? 2 : 1}
            style={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingTop: 20,
    },

    listItem: {
        paddingRight: 20,
        marginBottom: 30,
    }
});

export default BookList;