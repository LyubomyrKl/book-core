import React, {useCallback, useContext} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Alert} from "react-native";
import MemoBookItem, {IBookDetail} from "../organism/book-item";
import {AppContext} from "../../app/app-context";
import {useAppSelector} from "../../hooks";
import {selectMostRecentReadBook, setMostRecentReadBook} from "../../redux/slices/booksSlice";


interface IMostRecentBookPresentationProps{
    onBookPress: (book: IBookDetail) => void;
}


const MostRecentBookPresentation: React.FC<IMostRecentBookPresentationProps> = ({onBookPress}) => {
    const {windowSize} = useContext(AppContext)
    const mostRecentReadBook = useAppSelector(selectMostRecentReadBook);


    const readBook = useCallback((id: string) => {
        Alert.alert('Read book', `Read book with id: ${id}`)
    }, [mostRecentReadBook]);



    return (
        <TouchableWithoutFeedback onPress={() => mostRecentReadBook && onBookPress(mostRecentReadBook)}>
            <View style={[mostRecentBookStyle.mostRecentBookPresentationWrapper, {marginBottom: windowSize.width > 400 ? 20 : 0}]}>
                <View style={{ maxWidth: windowSize.width > 400 ? 500 : '100%'}}>
                    <MemoBookItem onButtonPress={readBook} bookDetail={mostRecentReadBook} isMostRecent/>
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