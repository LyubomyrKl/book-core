import React from 'react';
import {View, StyleSheet, StatusBar} from "react-native";
import {NavigationContainerProps} from "@react-navigation/native";
import BookDetail from "./book-detail";
import {createStackNavigator} from "@react-navigation/stack";
import BookItem from "../organism/book-item";
import Quote from "../organism/quote";
import Container from "../molecules/container";
const Library = ({navigation}: any) => {
        return (
            <View style={library.libraryContainer}>
                <Container>
                    <Quote/>
                </Container>

                <BookItem/>
            </View>
        );
};

const library = StyleSheet.create({
    libraryContainer: {

    }
});

export default Library;

