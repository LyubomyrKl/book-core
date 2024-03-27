import React, {useCallback, useContext, useMemo} from 'react';
import {ImageBackground, View, StyleSheet, TouchableWithoutFeedback, Alert, Text, ScrollView} from "react-native";
import  {IBookDetail} from "../components/organism/book-item";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {LinearGradient} from "expo-linear-gradient";
import MemoBookCover from "../components/molecules/book-cover";
import {getColors} from "../consts";
import {AppContext} from "../app/app-context";
import Container from "../components/molecules/container";
import {useAppDispatch, useAppSelector} from "../hooks";
import {selectTheme} from "../redux/slices/settingSlice";
import ProgressBar from "../components/atoms/progress-bar";
import AppButton from "../components/atoms/button";
import IconButton from "../components/atoms/icon-button";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import DescriptionItem, {IDescriptionItemProps} from "../components/atoms/description-item";
import {setMostRecentReadBook} from "../redux/slices/booksSlice";
import {TQuoteFilter} from "./quotes";



interface IBookDetailProps extends NativeStackScreenProps<{}, never> {
    book: IBookDetail
}

const BookDetail: React.FC<IBookDetailProps>= ({navigation, route}) => {
    const { windowSize} = useContext(AppContext)
    const dispatch = useAppDispatch();
    // @ts-ignore
    const bookDetail: IBookDetail = route.params?.book;
    const theme = useAppSelector(selectTheme);
    const colors = useMemo(() => getColors(theme), [theme]);

    const quotesQuotes = useAppSelector(state => state.quotes.quotes[bookDetail.id])
    const favoriteQuotes = useAppSelector(state => state.quotes.favoriteQuotesIds[bookDetail.id])

    const percentProgress = useMemo(() => {
        return Math.round(bookDetail.pagePassCount / (bookDetail.pageCount / 100))
    }, [bookDetail.pagePassCount, bookDetail.pageCount])


    const onReadBook = useCallback((bookDetail: IBookDetail) => {
        dispatch(setMostRecentReadBook(bookDetail));

        Alert.alert('Read book', `will navigate to read book with id ${bookDetail.id}`)
        // navigation.navigate('ReadBook', {book: bookDetail})
    }, []);


    const openQuotes = useCallback((filter:TQuoteFilter, bookId: string) => {
        // @ts-ignore
        navigation.navigate('Quotes', {filter, bookId})
    }, [])


    const quotesItems: IDescriptionItemProps[] = useMemo(() => (
        [
            {
                title: 'Total Quotes',
                icon: <Entypo name='quote' size={30} color='teal'/>,
                value: quotesQuotes ? quotesQuotes.length.toString() : 'you have not quotes yet',
                onPress: () => openQuotes('all', bookDetail.id),
                pressable: true,
            },
            {
                title: 'Favorite Quotes',
                icon: <Ionicons name='heart-outline' size={30} color='purple'/>,
                value: favoriteQuotes ? favoriteQuotes.length.toString() : 'you have not favorite quotes yet',
                onPress: () => openQuotes('favorite', bookDetail.id),
                pressable: true,
            },
            {
                title: 'View recent quotes',
                icon: <Ionicons name='sparkles' size={30} color='yellow'/>,
                value: quotesQuotes ? `"${quotesQuotes.slice(-1)[0].quote}"` : 'no recent quotes yet',
                onPress: () => openQuotes('recent', bookDetail.id),
                pressable: true,
            },
        ]
    ), [quotesQuotes, favoriteQuotes, bookDetail.id])

    const progressItems: IDescriptionItemProps[] = useMemo(() => (
        [
            {
                title: 'Time spent on reading',
                icon:  <Ionicons name='time-outline' size={30}  color="orange"/>,
                value: '10h 30m'
            },
            {
                title: 'Last opened',
                icon: <Ionicons name='book-outline' size={30} color='blue'/>,
                value: '10 month ago'
            },
            {
                title: 'Reading speed',
                icon: <Ionicons name='speedometer-outline' size={30} color='red'/>,
                value: '0 words / min '
            },
        ]
    ), [])



    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.backgroundWhite}}>

            <ImageBackground blurRadius={20} source={{uri: bookDetail.cover}} resizeMode="cover" >
                <LinearGradient
                    colors={['rgba(0,0,0,0)', colors.backgroundWhite]} // Adjust the alpha (opacity) values as needed
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}>
                </LinearGradient>
                <View style={styles.header}>
                    <IconButton clickHandler={() => navigation.goBack()}>
                        <Ionicons name='arrow-back' size={24} color={colors.gray}/>
                    </IconButton>
                    <IconButton clickHandler={() => {}}>
                        <Entypo name='dots-three-vertical' size={20} color={colors.gray}/>
                    </IconButton>
                </View>
                <TouchableWithoutFeedback onPress={() => onReadBook(bookDetail)}>
                    <View style={styles.background}>
                        <View style={{ width: windowSize.width > 400 ? 150 : 150, aspectRatio: 0.707}}>
                            <MemoBookCover uri={`${bookDetail.cover}`} enableShadow={true}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>

            <Container>
                <Text style={[styles.title, {
                    fontSize: windowSize.width > 400 ? 30 : 20,
                    color: colors.textBlack,
                }]}>{bookDetail.title}</Text>
                <Text style={[styles.author, {
                    fontSize: windowSize.width > 400 ? 16 : 14,
                    color: colors.textGrey
                }]}>{bookDetail.author}</Text>

                <View style={styles.percentWrapper}>
                    <Text style={{ color: colors.textGrey}}>{percentProgress}%</Text>
                </View>
                <View style={styles.progressBarWrapper}>
                    <View style={{ flex: 1 }}>
                        <ProgressBar isFatLine percentProgress={percentProgress}/>
                    </View>
                    <Text style={[styles.counter, {color: colors.textGrey}]}>{bookDetail.pagePassCount} / {bookDetail.pageCount}</Text>
                    {windowSize.width > 400 ? (
                        <AppButton key='read-button' onPress={() => onReadBook(bookDetail)} style={styles.readButton} title='Read' />
                    ) : (
                        <View style={{ width: '100%' }}>
                            <AppButton key='read-button' onPress={() => onReadBook(bookDetail)} title='Read' />
                        </View>
                    )}
                </View>


                <View style={{marginBottom: 20}}>
                    <Text style={[styles.sectionTitle, {color: colors.textGrey}]}>Quotes</Text>
                    {quotesItems.map((props) => <DescriptionItem key={props.title} {...props}/>)}
                </View>

                <View style={{marginBottom: 20}}>
                    <Text style={[styles.sectionTitle, {color: colors.textGrey}]}>Progress</Text>
                    {progressItems.map((props) => <DescriptionItem key={props.title} {...props}/>)}
                </View>

                <View style={{marginBottom: 20}}>
                    <Text style={[styles.sectionTitle, {color: colors.textGrey}]}>Summarization</Text>
                    <View style={{alignItems: 'center'}}>
                        <Text style={[styles.comingSoonText, {color: colors.textBlack}]}>Coming soon</Text>
                        <Ionicons name="hourglass-outline" size={150} color={colors.textGrey} />
                    </View>
                </View>
            </Container>
        </ScrollView>
    );
};



const styles = StyleSheet.create({
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },

    header: {
        marginVertical: 35,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    title: {
        fontWeight: 'bold',
    },

    author: {
        fontWeight: '600',

        marginBottom: 20
    },

    percentWrapper: {marginBottom: -10},


    progressBarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 10
    },

    counter: {
        marginLeft: 20,
        marginBottom: 20,
    },

    readButton: {
        marginLeft: 40,
        width: 170
    },

    sectionTitle: {
        fontSize: 20,
        marginBottom: 10
    },

    comingSoonText: {
        textTransform: 'uppercase',
        fontSize: 20
    },

    background: {
        height: 300,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20
    }
})
export default React.memo(BookDetail);