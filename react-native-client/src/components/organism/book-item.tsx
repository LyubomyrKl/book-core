import React from 'react';
import {Button, View, Text, StyleSheet, Image, Alert} from "react-native";
import {colors} from "../../consts";
import AppButton from "../atoms/button";

interface IBookItemProps {
    isRecentlyRead: boolean;
    progress: number;
}

const BookItem: React.FC<IBookItemProps> = ({isRecentlyRead, progress = 10}) => {

    const press = () => {
        Alert.alert('You tapped the button!');
    }

    return (
        <View style={bookItem.bookItemBox}>
            <View style={bookItem.bookItemImageBox}>
                <Text>
                    <Image source={{ uri: 'https://example.com/image.jpg' }} style={{ width: 200, height: 200 }} />
                </Text>
            </View>
            <View style={bookItem.descriptionBox}>
                <View>
                    <Text style={bookItem.bookRecentlyReadText}>You recently read</Text>
                    <Text style={bookItem.bookTitle}>Moby Dick</Text>
                    <Text style={bookItem.bookAuthor}>Herman Melville</Text>
                    <Text style={bookItem.bookReadLeftText}>13h has been reading</Text>
                </View>

                <View>
                    <View style={{marginBottom: 10}}>
                        <Text style={bookItem.bookReadLeftText}> 17 / 532 ({progress}%)</Text>
                        <View style={bookItem.progressBarBox}>
                            <View style={[bookItem.progressBar, { height: isRecentlyRead ? 4 : 2 }]}>
                                <View style={[bookItem.progressBar, { height: isRecentlyRead ? 4 : 2 , backgroundColor: colors.textPurpleBlue , width: `${progress}%`,}]} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <AppButton onPress={press} title='Read'/>
                    </View>
                </View>
            </View>
        </View>
    );
};

const bookItem = StyleSheet.create({
    bookItemBox: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },

    bookItemImageBox: {
        marginRight: 20,
        width: 150,
        height: 140 * 1.54,
        backgroundColor: 'red'
    },

    descriptionBox: {
      display: 'flex',
      flexDirection: 'column',
        justifyContent: 'space-between'
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
        width: 170,
    },

});

export default BookItem;