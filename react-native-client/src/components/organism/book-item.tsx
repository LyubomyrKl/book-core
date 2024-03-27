import React, {useContext, useMemo} from 'react';
import { View, Text, StyleSheet} from "react-native";
import {getColors} from "../../consts";
import AppButton from "../atoms/button";
import BookCover from "../molecules/book-cover";
import {AppContext} from "../../app/app-context";
import {useAppSelector} from "../../hooks";
import {selectTheme} from "../../redux/slices/settingSlice";
import ProgressBar from "../atoms/progress-bar";

export interface IBookDetail {
    id: string;
    title: string;
    author: string;
    cover: string;
    left: number;
    pageCount: number,
    pagePassCount: number,
    isFinished: boolean,
    isFavorite: boolean

}
export interface IBookItemProps {
    onButtonPress?: (id:string) => void;
    isMostRecent?: boolean;
    bookDetail: IBookDetail;
}


const BookItem: React.FC<IBookItemProps> = ({onButtonPress = () => {}, bookDetail, isMostRecent = false}) => {
    const {windowSize} = useContext(AppContext)
    const theme = useAppSelector(selectTheme)

    const colors = useMemo(() => getColors(theme), [theme])


    const percentProgress = useMemo(() => {
        return Math.round(bookDetail.pagePassCount / (bookDetail.pageCount / 100))
    }, [bookDetail.pagePassCount, bookDetail.pageCount])


    const titleFontSize  = !isMostRecent ? 20 : isMostRecent &&  windowSize.width  > 400 ? 28 : bookDetail.title.length > 20 ? 20 : 24

    return (
        <View style={styles.bookItemBox}>
            <View style={[styles.bookItemImageBoxStyle]}>
                <BookCover uri={bookDetail.cover} enableShadow={!isMostRecent}/>
            </View>
            <View style={styles.descriptionBox}>
                <View>
                    {isMostRecent && <Text style={{color: colors.textGrey}}>You most recently read</Text>}
                    <Text style={[styles.bookTitle, {color: colors.textBlack, fontSize: titleFontSize }]}>{bookDetail.title}</Text>
                    <Text style={[styles.bookAuthor, {color: colors.textGrey,fontSize: isMostRecent ? 16 : 14}]}>{bookDetail.author}</Text>
                    <Text style={[styles.bookReadLeftText, {color: colors.textGrey, fontSize: isMostRecent ? 14 : 12}]}>{bookDetail.left}h has been reading</Text>
                </View>

                <View>
                    <View style={{marginBottom: 10}}>
                        <Text style={[styles.bookReadLeftText, {color: colors.textBlack,}]}> {bookDetail.pagePassCount} / {bookDetail.pageCount} ({percentProgress}%)</Text>
                        <ProgressBar isFatLine={isMostRecent} percentProgress={percentProgress}/>
                    </View>
                    {isMostRecent && <View>
                        <AppButton onPress={() => onButtonPress(bookDetail.id)} title='Read'/>
                    </View>}
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

    bookTitle: {
        fontWeight: '700'
    },

    bookAuthor: {
        fontSize: 16,
    },

    bookReadLeftText:{
        marginBottom: 10
    },
});

export default React.memo(BookItem);