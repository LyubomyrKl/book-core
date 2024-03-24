import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableWithoutFeedback} from "react-native";
import BookItem, {IBookDetail} from "../organism/book-item";


interface IMostRecentBookPresentationProps{
    navigation: any;
    bookDetail: IBookDetail;
}

const windowDimensions = Dimensions.get('window');


const MostRecentBookPresentation: React.FC<IMostRecentBookPresentationProps> = ({bookDetail, navigation}) => {
    const [windowWidth, setWindowWidth] = useState(windowDimensions);

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            'change',
            ({window, screen}) => {
                setWindowWidth(window);
            },
        );
        return () => subscription?.remove();
    }, []);

    const readBook = useCallback((id: string) => {
        navigation.navigate('BookDetail', {id});
    }, [navigation, bookDetail.id]);


    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('BookDetail', {id: bookDetail['id']})}>
            <View style={mostRecentBookStyle.mostRecentBookPresentationWrapper}>
                <View style={[mostRecentBookStyle.bookItemBox, { maxWidth: windowWidth.width > 400 ? 400 : '100%'}]}>
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

    },
    bookItemBox: {
        marginVertical: 0,
        marginHorizontal: 'auto',
    }
});

export default MostRecentBookPresentation;