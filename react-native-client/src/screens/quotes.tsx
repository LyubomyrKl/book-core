import React, { useCallback, useEffect, useMemo } from 'react';
import { Alert, ScrollView, Text, TouchableNativeFeedback, View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {IQuote, setAllQuotes, setFavoriteQuotes, setRecentQuotes} from "../redux/slices/quotesSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectTheme } from "../redux/slices/settingSlice";
import { getColors } from "../consts";
import IconButton from "../components/atoms/icon-button";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Container from "../components/molecules/container";

export type TQuoteFilter = 'all' | 'favorite' | 'recent';



// @ts-ignore
interface IQuotesProps extends NativeStackScreenProps<{}, never> {
    route: {
        params: {
            filter: TQuoteFilter;
            bookId: string;
        };
    };
}
const Quotes: React.FC<IQuotesProps> = ({ route, navigation }) => {
    const dispatch = useAppDispatch();
    const quotes = useAppSelector(state => state.quotes.filteredQuotes);
    const theme = useAppSelector(selectTheme);
    const colors = useMemo(() => getColors(theme), [theme]);

    const { filter, bookId } = route.params;

    const onPress = useCallback(() => {
        Alert.alert('Quote', 'Quote will lead to page with quote');
    }, []);

    const getReducer = useCallback((filter: TQuoteFilter) => {
        switch (filter) {
            case 'all':
                return setAllQuotes;
            case 'favorite':
                return setFavoriteQuotes;
            case 'recent':
                return setRecentQuotes;
        }
    }, []);

    useEffect(() => {
        dispatch(getReducer(filter)(bookId));
    }, [dispatch, filter, getReducer, bookId]);

    const NoQuotesComponent = useCallback(() => (
        <View style={[styles.noQuotesContainer, { backgroundColor: colors.backgroundWhite }]}>
            <Text style={[styles.noQuotesText, { color: colors.textGrey }]}>You have no quotes in this book</Text>
            <AntDesign name="exception1" size={100} color={colors.textGrey} />
        </View>
    ), [colors]);

    const renderQuoteItem = useCallback((quote: IQuote) => (
        <View key={quote.quoteId} style={[styles.quoteContainer, { backgroundColor: colors.backgroundGrey }]}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.textPurpleBlue, true)} style={styles.touchableArea} onPress={onPress}>
                <View style={styles.innerContainer}>
                    <Text style={[styles.quoteText, { color: colors.textBlack }]}>{quote.quote}</Text>
                    <IconButton clickHandler={() => navigation.goBack()}>
                        <Entypo name='dots-three-vertical' size={20} color={colors.textGrey} />
                    </IconButton>
                </View>
            </TouchableNativeFeedback>
        </View>
    ), [colors, onPress, navigation]);

    return (
        <View style={[styles.container, {backgroundColor: colors.backgroundWhite}]}>
            <View style={styles.header}>
                <IconButton size={50} bgColor={colors.transparentPurpleBlue} clickHandler={() => navigation.goBack()}>
                    <Ionicons name='arrow-back' size={30} color={colors.textGrey} />
                </IconButton>
            </View>
            <ScrollView style={styles.scrollView}>
                <Container>
                    {!quotes || quotes.length === 0 ?
                        <NoQuotesComponent />
                        :
                        <View style={styles.quoteWrapper}>
                            {quotes.map(renderQuoteItem)}
                        </View>
                    }
                </Container>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    scrollView: {
        paddingTop: 65,
    },
    noQuotesContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    noQuotesText: {
        textTransform: 'uppercase',
        fontSize: 20,
        marginBottom: 10,
        fontWeight: '600'
    },
    quoteContainer: {
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
    },
    touchableArea: {
        borderRadius: 10,
    },
    innerContainer: {
        paddingVertical: 15,
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    quoteWrapper: {
        paddingBottom: 65
    },

    quoteText: {
        fontSize: 16,
        flex: 1,
    },
});

export default Quotes;