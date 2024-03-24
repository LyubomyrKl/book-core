import React, {useMemo} from 'react';
import {View, StyleSheet, ImageBackground, Text} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import Quote from "../organism/quote";
import Container from "../molecules/container";
import MostRecentBookPresentation from "../templates/most_recent_book_presentation";
import {IBookItemProps} from "../organism/book-item";
import {colors} from "../../consts";
import {Tab, TabView} from "@rneui/themed";
import BookList from "../organism/book-list";
import bookDetail from "./book-detail";
const Library = ({navigation}: any) => {
        const [index, setIndex] = React.useState(0);

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


        const bookStub = [stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail ,stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail ,stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail,
            stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail ,stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail ,stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail,
            stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail ,stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail ,stubBookDetail, stubBookDetail, stubBookDetail, stubBookDetail,]

    console.log(bookStub.length)
        return (
            <View style={styles.libraryContainer}>
                <ImageBackground blurRadius={20} source={{uri: stubBookDetail.cover}} resizeMode="cover" >
                    <LinearGradient
                        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.85)']} // Adjust the alpha (opacity) values as needed
                        style={styles.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}>
                    </LinearGradient>
                    <Container>
                        {/*Todo: pass quotes from most recent book*/}
                            <Quote/>
                            {/*it's necessary to bookDetail to be memoized value*/}
                            <MostRecentBookPresentation id={bookDetail.id} bookDetail={stubBookDetail} navigation={navigation} isMostRecent/>
                    </Container>

                <Tab
                    value={index}
                    onChange={(e) => setIndex(e)}
                    indicatorStyle={{
                        backgroundColor: colors.textPurpleBlue,
                        height: 3,
                    }}
                >
                    <Tab.Item
                        title="Recent"
                        titleStyle={{ fontSize: 8, color: colors.textGrey }}
                        icon={{ name: 'book', type: 'ionicon', color: colors.textPurpleBlue }}
                    />
                    <Tab.Item
                        title="Favorite"
                        titleStyle={{ fontSize: 8, color: colors.textGrey }}
                        icon={{ name: 'heart', type: 'ionicon', color: colors.textPurpleBlue }}
                    />
                    <Tab.Item
                        title="Finished"
                        titleStyle={{ fontSize: 8, color: colors.textGrey }}
                        icon={{ name: 'infinite', type: 'ionicon', color: colors.textPurpleBlue }}
                    />
                </Tab>
                </ImageBackground>
                <View style={{height: '100%'}}>
                    <TabView
                        value={index}
                        onChange={setIndex}
                        animationType="spring"
                        tabItemContainerStyle={{
                            borderRightWidth: 1,
                            borderRightColor: colors.backgroundGrey,
                        }}
                    >
                        <TabView.Item>
                            <BookList books={bookStub} navigation={navigation} />
                        </TabView.Item>
                        <TabView.Item>
                            <BookList books={bookStub} navigation={navigation} />
                        </TabView.Item>
                        <TabView.Item>
                            <BookList books={bookStub} navigation={navigation} />
                        </TabView.Item>
                    </TabView>
                </View>

            </View>
        );
};

const styles = StyleSheet.create({
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});

export default Library;

