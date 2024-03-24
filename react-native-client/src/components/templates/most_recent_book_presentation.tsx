import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableWithoutFeedback} from "react-native";
import BookItem, {IBookDetail} from "../organism/book-item";
import {AppContext} from "../../app/app-context";


interface IMostRecentBookPresentationProps{
    navigation: any;
    bookDetail: IBookDetail;
    id: string
}




const MostRecentBookPresentation: React.FC<IMostRecentBookPresentationProps> = ({id, bookDetail, navigation}) => {
    const {windowSize} = useContext(AppContext)

    const readBook = useCallback((id: string) => {
        navigation.navigate('BookDetail', {id});
    }, [navigation, id]);


    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('BookDetail', {id})}>
            <View style={mostRecentBookStyle.mostRecentBookPresentationWrapper}>
                <View style={[mostRecentBookStyle.bookItemBox, { maxWidth: windowSize.width > 400 ? 400 : '100%'}]}>
                    <BookItem onButtonPress={readBook} bookDetail={bookDetail} isMostRecent/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const mostRecentBookStyle = StyleSheet.create({
    mostRecentBookPresentationWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20

    },
    bookItemBox: {
        marginVertical: 0,
        marginHorizontal: 'auto',
    }
});

export default MostRecentBookPresentation;