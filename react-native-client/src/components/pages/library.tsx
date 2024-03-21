import React from 'react';
import {View, Text} from "react-native";
import {NavigationContainerProps} from "@react-navigation/native";
import BookDetail from "./book-detail";
import {createStackNavigator} from "@react-navigation/stack";
const Library = ({navigation}: any) => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text onPress={() => navigation.navigate('BookDetail')}>Home Screen</Text>
            </View>
        );
};

export default Library;

