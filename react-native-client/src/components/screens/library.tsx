import React, {useContext, useMemo, useState} from 'react';
import {View, StyleSheet, ImageBackground} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import Quote from "../organism/quote";
import Container from "../molecules/container";
import MemoMostRecentBookPresentation from "../templates/most_recent_book_presentation";
import {IBookDetail} from "../organism/book-item";
import {getColors} from "../../consts";
import {Tab, TabView} from "@rneui/themed";
import MemoBookList from "../organism/book-list";
import bookDetail from "./book-detail";
import stubBooks from "../../stub";
import {AppContext} from "../../app/app-context";
const Library = ({navigation}: any) => {
        const [index, setIndex] = useState(0);
        const stub = useMemo(() => stubBooks, [])
        const [mostRecent, setMostRecent] = useState<IBookDetail>(stub[0]);
        const {windowSize, theme} = useContext(AppContext)
        const colors = useMemo(() => getColors(theme), [theme])

        const moveToDetail = (id: string) => {
            navigation.navigate('BookDetail', {id});
        }

        const onBookPress = (book: IBookDetail) => {
            setMostRecent(book)
            navigation.navigate('BookDetails', {id: book.id})
        }

        return (
            <View style={styles.libraryContainer}>
                <ImageBackground blurRadius={20} source={{uri: mostRecent.cover}} resizeMode="cover" >
                    <LinearGradient
                        colors={['rgba(0,0,0,0)', colors.backgroundWhite]} // Adjust the alpha (opacity) values as needed
                        style={styles.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}>
                    </LinearGradient>
                    <Container>
                        {/*Todo: select short quotes for mobile and long for tablets */}
                        <View style={{marginTop: 20, marginBottom: windowSize > 400 ? 40 : 20 }}>
                            <Quote quote='It is better to fail in originality, than to succeed in imitation. Failure is the true test of greatness' title={mostRecent.title} author={mostRecent.author}/>
                        </View>
                            {/*it's necessary to bookDetail to be memoized object that does not change the link*/}
                            <MemoMostRecentBookPresentation id={bookDetail.id} bookDetail={mostRecent} navigation={navigation} isMostRecent/>
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
                <View style={{flex: 1, backgroundColor: colors.backgroundWhite}}>
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
                            <MemoBookList onBookPress={setMostRecent} books={stub}/>
                        </TabView.Item>
                        <TabView.Item>
                            <MemoBookList onBookPress={setMostRecent} books={stub}/>
                        </TabView.Item>
                        <TabView.Item>
                            <MemoBookList onBookPress={setMostRecent} books={stub}/>
                        </TabView.Item>
                    </TabView>
                </View>
            </View>
        );
};

const styles = StyleSheet.create({
    libraryContainer: {
      flex: 1,
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
