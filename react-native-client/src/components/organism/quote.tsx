import React, {useContext, useMemo} from 'react';
import Svg, { Path, Circle, Rect, G} from 'react-native-svg';

import {Text, StyleSheet, View} from "react-native";
import {getColors} from "../../consts";
import {AppContext} from "../../app/app-context";

interface IQuote {
    quote: string;
    author: string;
    title: string;
}

const Quote = ({quote, author, title}:IQuote) => {
    const {theme} = useContext(AppContext)
    const colors = useMemo(() => getColors(theme), [theme]);

    return (
        <View style={[styles.quoteBox, {backgroundColor: colors.backgroundWhite}]}>
            <View style={styles.svg}>
                <Svg
                    width="80"
                    height="80"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 57 57"
                    xmlSpace="preserve"
                >

                    <G>
                        <Circle fill={colors.textGrey} cx="18.5" cy="31.5" r="5.5" />
                        <Path
                            fill={colors.textGrey}
                            d="M18.5,38c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5s6.5,2.916,6.5,6.5S22.084,38,18.5,38zM18.5,27c-2.481,0-4.5,2.019-4.5,4.5s2.019,4.5,4.5,4.5s4.5-2.019,4.5-4.5S20.981,27,18.5,27z"
                        />
                    </G>
                    <G>
                        <Circle fill={colors.textGrey} cx="35.5" cy="31.5" r="5.5" />
                        <Path
                            fill={colors.textGrey}
                            d="M35.5,38c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5s6.5,2.916,6.5,6.5S39.084,38,35.5,38zM35.5,27c-2.481,0-4.5,2.019-4.5,4.5s2.019,4.5,4.5,4.5s4.5-2.019,4.5-4.5S37.981,27,35.5,27z"
                        />
                    </G>
                    <Path
                        fill={colors.textGrey}
                        d="M13,32c-0.553,0-1-0.447-1-1c0-7.72,6.28-14,14-14c0.553,0,1,0.447,1,1s-0.447,1-1,1c-6.617,0-12,5.383-12,12C14,31.553,13.553,32,13,32z"
                    />
                    <Path
                        fill={colors.textGrey}
                        d="M30,32c-0.553,0-1-0.447-1-1c0-7.72,6.28-14,14-14c0.553,0,1,0.447,1,1s-0.447,1-1,1c-6.617,0-12,5.383-12,12C31,31.553,30.553,32,30,32z"
                    />
                </Svg>
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
        fontWeight: 'semibold',
        fontSize: 17,
    },
    author: {
        fontWeight: 'semibold',
        paddingVertical: 8,
        textAlign: 'right',
    },
    svg: {
        position: 'absolute',
        top: -30,
    }
})

export default Quote;