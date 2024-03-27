import React, { useMemo} from 'react';

import {Text, StyleSheet, View} from "react-native";
import {getColors} from "../../consts";
import {useAppSelector} from "../../hooks";
import {selectTheme} from "../../redux/slices/settingSlice";
import QuoteSvg from "../atoms/quote-svg";

interface IQuote {
    quote: string;
    author: string;
    title: string;
}

const LibraryQuote = ({quote, author, title}:IQuote) => {
    const theme = useAppSelector(selectTheme)
    const colors = useMemo(() => getColors(theme), [theme]);

    if (quote.length > 150){
        quote = quote.slice(0, 140) + '...'
    }

    return (
        <View style={[styles.quoteBox, {backgroundColor: colors.backgroundWhite}]}>
            <View style={styles.svg}>
                <QuoteSvg color={colors.textGrey} size={80}/>
            </View>
            <Text style={[styles.quote, {color: colors.textBlack}]}>{quote}</Text>
            <Text style={[styles.author, {color: colors.textGrey}]}>    ---- {author} from {title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    quoteBox: {
        position: 'relative',
        paddingTop: 25,
        paddingHorizontal: 15,
        borderRadius:15,
        opacity: 0.8,

    },
    quote: {
        fontWeight: '400',
        fontSize: 17,
    },
    author: {
        fontWeight: '600',
        paddingBottom:8,
        textAlign: 'right',
    },
    svg: {
        position: 'absolute',
        top: -30,
    }
})

export default LibraryQuote;