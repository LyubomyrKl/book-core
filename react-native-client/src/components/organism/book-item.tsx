import React from 'react';
import {Button, View, Text, StyleSheet} from "react-native";

const BookItem = () => {
    return (
        <View style={bookItem.bookItemBox}>
            <View style={bookItem.bookItemImageBox}>
                <Text>
                    BookItem
                </Text>
            </View>
            <View>
                <Text>Moby Dick</Text>
                <Text>Herman Melville</Text>

                <View>
                    <Text>13 г читання</Text>
                    <View>
                        <View><Text>Progress bar</Text></View>
                        <Text> 17 / 532</Text>
                    </View>
                </View>
                <View>
                    <Button title='Read'/>
                </View>
            </View>
        </View>
    );
};

const bookItem = StyleSheet.create({
    bookItemBox: {
        display: 'flex',
        flexDirection: 'row'
    },

    bookItemImageBox: {
        marginRight: 20,
    }
});

export default BookItem;