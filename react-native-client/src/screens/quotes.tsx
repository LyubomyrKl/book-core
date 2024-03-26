import React from 'react';
import {View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

interface IQuotesProps extends NativeStackScreenProps<{}, 'Quotes'> {

}

const Quotes: React.FC<IQuotesProps> = () => {
    return (
        <View>
            <Quote/>
        </View>
    );
};

export default Quotes;