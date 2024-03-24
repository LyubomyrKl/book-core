import React, {useMemo} from 'react';
import { View, Text, StyleSheet} from "react-native";
import {colors} from "../../consts";
import AppButton from "../atoms/button";
import BookCover from "../molecules/book-cover";



export interface IBookDetail {
    id: string;
    title: string;
    author: string;
    cover: string;
    left: number;
    pageNumber: number;
}
export interface IBookItemProps extends IBookDetail{
    onButtonPress: () => void;
    isMostRecent?: boolean;
    bookDetail: IBookDetail;
}


const BookItem: React.FC<IBookItemProps> = ({onButtonPress, bookDetail, isMostRecent = false}) => {
    const percentProgress = useMemo(() => {
        return Math.round(bookDetail.pagePassCount / (bookDetail.pageCount / 100))
    }, [bookDetail.pagePassCount, bookDetail.pageCount])



    return (
        <View style={styles.bookItemBox} onPress>
            <View style={[styles.bookItemImageBoxStyle]}>
                <BookCover uri={bookDetail.cover}/>
            </View>
            <View style={styles.descriptionBox}>
                <View>
                    <Text style={styles.bookRecentlyReadText}>You most recently read</Text>
                    <Text style={styles.bookTitle}>{bookDetail.title}</Text>
                    <Text style={styles.bookAuthor}>{bookDetail.author}</Text>
                    <Text style={styles.bookReadLeftText}>{bookDetail.left}h has been reading</Text>
                </View>

                <View>
                    <View style={{marginBottom: 10}}>
                        <Text style={styles.bookReadLeftText}> {bookDetail.pagePassCount} / {bookDetail.pageCount} ({percentProgress}%)</Text>
                        <View style={styles.progressBarBox}>
                            <View style={[styles.progressBar, { height: isMostRecent ? 4 : 2 }]}>
                                <View style={[styles.progressBar, { height: isMostRecent ? 4 : 2 , backgroundColor: colors.textPurpleBlue , width: `${percentProgress}%`,}]} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <AppButton onPress={onButtonPress} title='Read'/>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bookItemBox: {
        flexDirection: 'row',
        width: '100%',
        aspectRatio: 2,
    },

    bookItemImageBoxStyle:  {
        marginRight: 20,
        width: '35%',

    },

    descriptionBox: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
    },

    bookRecentlyReadText: {
        color: colors.textGrey,
        marginBottom: 5
    },

    bookTitle: {
        fontSize: 28,
        fontWeight: '700'
    },

    bookAuthor: {
        color: colors.textGrey,
        fontSize: 16,
    },

    bookReadLeftText:{
        color: colors.textGrey,
        marginBottom: 10
    },

    progressBarBox: {
        display: 'flex',
        flexDirection: 'row',
    },

    progressBar: {
        backgroundColor: colors.backgroundGrey,
        width: '100%',

    },

});

export default React.memo(BookItem);