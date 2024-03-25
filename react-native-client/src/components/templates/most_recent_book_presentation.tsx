import React, {useCallback, useContext} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Alert} from "react-native";
import MemoBookItem, {IBookDetail} from "../organism/book-item";
import {AppContext} from "../../app/app-context";


interface IMostRecentBookPresentationProps{
    navigation: any;
    bookDetail: IBookDetail;
    id: string
}


const MostRecentBookPresentation: React.FC<IMostRecentBookPresentationProps> = ({id, bookDetail, navigation}) => {
    const {windowSize} = useContext(AppContext)

    const readBook = useCallback((id: string) => {
        Alert.alert('Read book', `Read book with id: ${id}`)
    }, [navigation, id]);


    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('BookDetail', {id})}>
            <View style={[mostRecentBookStyle.mostRecentBookPresentationWrapper, {marginBottom: windowSize.width > 400 ? 20 : 0}]}>
                <View style={{ maxWidth: windowSize.width > 400 ? 500 : '100%'}}>
                    <MemoBookItem onButtonPress={readBook} bookDetail={bookDetail} isMostRecent/>
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
});

export default React.memo(MostRecentBookPresentation);