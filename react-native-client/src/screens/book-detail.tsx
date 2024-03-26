import React, {useContext, useMemo, useState} from 'react';
import {ImageBackground, View, StyleSheet, TouchableWithoutFeedback, Alert, Animated, Text, ScrollView} from "react-native";
import  {IBookDetail} from "../components/organism/book-item";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {LinearGradient} from "expo-linear-gradient";
import BookCover from "../components/molecules/book-cover";
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
import BottomPopup from "../components/organism/bottom-popup";


interface IBookDetailProps extends NativeStackScreenProps<{}, 'BookDetail'> {
    book: IBookDetail
}

const BookDetail: React.FC<IBookDetailProps>= ({navigation, route}) => {
    const { windowSize} = useContext(AppContext)
    const dispatch = useAppDispatch();
    const bookDetail: IBookDetail = route.params.book;
    const theme = useAppSelector(selectTheme);
    const colors = useMemo(() => getColors(theme), [theme]);

    const percentProgress = useMemo(() => {
        return Math.round(bookDetail.pagePassCount / (bookDetail.pageCount / 100))
    }, [bookDetail.pagePassCount, bookDetail.pageCount])

    const [isMenuVisible, setIsMenuVisible] = useState(true);
    const onReadBook = () => {
        dispatch(setMostRecentReadBook(bookDetail))
        Alert.alert('Read book', `Read book with id: ${bookDetail.id}`)
    }

    const quotesItems: IDescriptionItemProps[] = useMemo(() => (
        [
            {
                title: 'Total Quotes',
                icon: <Entypo name='quote' size={30} color='teal'/>,
                value: '10',
                onPress: () => navigation.navigate('Quote'),
                pressable: true,
            },
            {
                title: 'Favorite Quotes',
                icon: <Ionicons name='heart-outline' size={30} color='purple'/>,
                value: '3',
                onPress: () => navigation.navigate('Quote'),
                pressable: true,
            },
            {
                title: 'Recent Quotes',
                icon: <Ionicons name='sparkles' size={30} color='yellow'/>,
                value: 'View recent quotes',
                onPress: () => navigation.navigate('Quote'),
                pressable: true,
            },
        ]
    ), [])

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
                <View style={{marginVertical: 35, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <IconButton clickHandler={() => navigation.goBack()}>
                        <Ionicons name='arrow-back' size={24} color={colors.gray}/>
                    </IconButton>
                    <IconButton clickHandler={() => setIsMenuVisible(() => true)}>
                        <Entypo name='dots-three-vertical' size={20} color={colors.gray}/>
                    </IconButton>
                </View>
                <TouchableWithoutFeedback onPress={onReadBook}>
                    <View style={styles.background}>
                        <View style={{ width: windowSize.width > 400 ? 150 : 150, aspectRatio: 0.707}}>
                            <BookCover uri={`${bookDetail.cover}`} enableShadow={true}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>



            <Container>


                <Text style={{
                    fontWeight: 'bold',
                    fontSize: windowSize.width > 400 ? 30 : 20,
                    color: colors.textBlack,
                }}>{bookDetail.title}</Text>
                <Text style={{
                    fontWeight: 'semibold',
                    fontSize: windowSize.width > 400 ? 16 : 14,
                    color: colors.textGrey,
                    marginBottom: 20
                }}>{bookDetail.author}</Text>

                <View style={{marginBottom: -10}}>
                    <Text style={{ color: colors.textGrey}}>{percentProgress}%</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginBottom: 10
                }}>
                    <View style={{ flex: 1 }}>
                        <ProgressBar isFatLine percentProgress={percentProgress}/>
                    </View>
                    <Text style={{marginLeft: 20, marginBottom: 20, color: colors.textGrey}}>{bookDetail.pagePassCount} / {bookDetail.pageCount}</Text>
                    {windowSize.width > 400 ? (
                        <AppButton key='read-button' onPress={onReadBook} style={{marginLeft: 40, width: 170}} title='Read' />
                    ) : (
                        <View style={{ width: '100%' }}>
                            <AppButton key='read-button' onPress={onReadBook} title='Read' />
                        </View>
                    )}
                </View>


                <View style={{marginBottom: 20}}>
                    <Text style={{color: colors.textGrey, fontSize: 20, marginBottom: 10}}>Quotes</Text>
                    {quotesItems.map((props) => <DescriptionItem key={props.title} {...props}/>)}
                </View>

                <View style={{marginBottom: 20}}>
                    <Text style={{color: colors.textGrey, fontSize: 20, marginBottom: 10}}>Progress</Text>
                    {progressItems.map((props) => <DescriptionItem key={props.title} {...props}/>)}
                </View>

                <View style={{marginBottom: 20}}>
                    <Text style={{color: colors.textGrey, fontSize: 20, marginBottom: 10}}>Summarization</Text>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{color: colors.textBlack, textTransform: 'uppercase', fontSize: 20}}>Coming soon</Text>
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

    background: {
        height: 300,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20
    }
})
export default BookDetail;