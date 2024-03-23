import React from 'react';
import Svg, { Path, Circle, Rect, G} from 'react-native-svg';

import {Text, StyleSheet, View} from "react-native";
import {colors} from "../../consts";

const Quote = () => {
    return (
        <View style={quote.quoteBox}>
            <View style={quote.svg}>
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
                        <Circle fill="#BDC3C7" cx="18.5" cy="31.5" r="5.5" />
                        <Path
                            fill="#BDC3C7"
                            d="M18.5,38c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5s6.5,2.916,6.5,6.5S22.084,38,18.5,38zM18.5,27c-2.481,0-4.5,2.019-4.5,4.5s2.019,4.5,4.5,4.5s4.5-2.019,4.5-4.5S20.981,27,18.5,27z"
                        />
                    </G>
                    <G>
                        <Circle fill="#BDC3C7" cx="35.5" cy="31.5" r="5.5" />
                        <Path
                            fill="#BDC3C7"
                            d="M35.5,38c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5s6.5,2.916,6.5,6.5S39.084,38,35.5,38zM35.5,27c-2.481,0-4.5,2.019-4.5,4.5s2.019,4.5,4.5,4.5s4.5-2.019,4.5-4.5S37.981,27,35.5,27z"
                        />
                    </G>
                    <Path
                        fill="#BDC3C7"
                        d="M13,32c-0.553,0-1-0.447-1-1c0-7.72,6.28-14,14-14c0.553,0,1,0.447,1,1s-0.447,1-1,1c-6.617,0-12,5.383-12,12C14,31.553,13.553,32,13,32z"
                    />
                    <Path
                        fill="#BDC3C7"
                        d="M30,32c-0.553,0-1-0.447-1-1c0-7.72,6.28-14,14-14c0.553,0,1,0.447,1,1s-0.447,1-1,1c-6.617,0-12,5.383-12,12C31,31.553,30.553,32,30,32z"
                    />
                </Svg>
            </View>
            <Text style={quote.quote}>Some stories have to be written because no one would believe the absurdity of it all</Text>
            <Text style={quote.author}>    ---- Shannon L. Alder</Text>
        </View>
    );
};

const quote = StyleSheet.create({
    quoteBox: {
        marginTop: 20,
        marginBottom: 40,
        position: 'relative',
        paddingTop: 25,
        paddingBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#e5e5e5',
        borderRadius:15,
    },
    quote: {
        fontWeight: 'semibold',
        fontSize: 17,
    },
    author: {
        fontWeight: 'semibold',
        paddingVertical: 8,
        textAlign: 'right',
        color: colors.textGrey,
    },
    svg: {
        position: 'absolute',
        top: -30,
    }
})

export default Quote;