import React, {useMemo} from 'react';
import {View, StyleSheet, ImageBackground} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import Quote from "../organism/quote";
import Container from "../molecules/container";
import Tabs from "../organism/tabs";
import MostRecentBookPresentation from "../templates/most_recent_book_presentation";
import {IBookItemProps} from "../organism/book-item";
const Library = ({navigation}: any) => {
        const moveToDetail = (id: string) => {
            navigation.navigate('BookDetail', {id});
        }


        {/*it's necessary to bookDetail to be memoized value*/}
        const stubBookDetail: IBookItemProps.bookDetail = useMemo(() => {
            return {
                id: '1',
                title: 'Moby Dick',
                author: 'Herman Melville',
                cover: 'https://m.media-amazon.com/images/I/616R20nvohL._AC_UF1000,1000_QL80_.jpg',
                left: 13,
                pageCount: 532,
                pagePassCount: 134,
            }
        }, [])

        return (
            <View style={styles.libraryContainer}>
                <ImageBackground blurRadius={20} source={{uri: stubBookDetail.cover}} resizeMode="cover" style={styles.image}>
                    <LinearGradient
                        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.85)']} // Adjust the alpha (opacity) values as needed
                        style={styles.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}>
                    </LinearGradient>
                    <Container>
                            <Quote/>
                            {/*it's necessary to bookDetail to be memoized value*/}
                            <MostRecentBookPresentation bookDetail={stubBookDetail} navigation={navigation} isMostRecent/>
                    </Container>
                </ImageBackground>
                <Tabs/>
            </View>
        );
};

const styles = StyleSheet.create({
    image: {
        paddingVertical: 20
    },

    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});

export default Library;

