import React, {useContext, useMemo} from 'react';
import {Animated, StyleSheet, View} from "react-native";
import MemoBookItem, {IBookDetail} from "./book-item";
import FlatList = Animated.FlatList;
import {AppContext} from "../../app/app-context";
import { customAlphabet } from 'nanoid/non-secure';
import {TouchableRipple} from "react-native-paper";
import {getColors} from "../../consts";

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

interface IBookListProps {
    onBookPress: (id: IBookDetail) => void,
    books: IBookDetail[],
}

const BookList: React.FC<IBookListProps> = ({books, onBookPress}) => {
    const {windowSize, theme} = useContext(AppContext);
    const colors = useMemo(() => getColors(theme), [theme]);
    const renderBookItem = ({item}) => (
        // Todo: Add key to BookItem

            <View style={[styles.listItem, {  width: windowSize.width > 400 ? '50%' : '100%',}]}>
                <TouchableRipple rippleColor={colors.touchAnimation} style={{paddingRight: 30,}} onPress={() => onBookPress(item)} >
                    <MemoBookItem bookDetail={item}/>
                </TouchableRipple>
            </View>

    );

    return (
        <FlatList
            data={books}
            renderItem={renderBookItem}
            keyExtractor={(item) => item.title}
            numColumns={windowSize.width > 400 ? 2 : 1}
            style={styles.container}
        />
    );
};




const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingTop: 20,
        paddingBottom: 100,
    },

    listItem: {
        paddingRight: 20,
        marginBottom: 30,
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default React.memo(BookList)