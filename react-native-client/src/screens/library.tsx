// Imports organized alphabetically and grouped by type
import React, { useCallback, useContext, useMemo, useState } from 'react';
import {View, StyleSheet, ImageBackground, TouchableWithoutFeedback} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { Tab, TabView } from '@rneui/themed';

// Custom imports
import MemoMostRecentBookPresentation from '../components/templates/most_recent_book_presentation';
import MemoBookList from '../components/organism/book-list';
import {IBookDetail} from "../components/organism/book-item";
import { AppContext } from '../app/app-context';
import Container from '../components/molecules/container';
import LibraryQuote from '../components/organism/library-quote';

// Selectors
import {selectBooks, selectMostRecentReadBook} from "../redux/slices/booksSlice";

// Custom hooks
import {useAppSelector} from "../hooks";

// Constants and utilities
import { IColors, getColors } from '../consts';
import {selectTheme} from "../redux/slices/settingSlice";




interface ILibraryProps extends BottomTabScreenProps<{}, never>{

}

const Library: React.FC<ILibraryProps>= ({navigation}) => {
        const [index, setIndex] = useState<number>(0);
        const books: IBookDetail[] = useAppSelector(selectBooks);
        const mostRecentReadBook  = useAppSelector(selectMostRecentReadBook);

        const quotes = useAppSelector(state => state.quotes.quotes[mostRecentReadBook.id]);
        const theme = useAppSelector(selectTheme);

        const {windowSize} = useContext(AppContext);
        const colors = useMemo(() => {
            return getColors(theme);
        }, [theme]);

        const favoriteBooks = useMemo(() => books.filter(book => book.isFavorite), [books]);
        const finishedBooks = useMemo(() => books.filter(book => book.isFinished), [books]);



        const onBookPress = useCallback((book: IBookDetail) => {
            // @ts-ignore
            navigation.navigate('BookDetails', {book})
        }, [])

        const navigateToQuote = useCallback(() => {
            // @ts-ignore
            navigation.navigate('Quotes', {filter: 'all', bookId: mostRecentReadBook.id})
        }, [])


        return (
            <View style={styles.libraryContainer}>
                <ImageBackground blurRadius={20} source={{uri: mostRecentReadBook.cover}} resizeMode="cover" >
                    <LinearGradient
                        colors={['rgba(0,0,0,0)', colors.backgroundWhite]} // Adjust the alpha (opacity) values as needed
                        style={styles.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}>
                    </LinearGradient>
                    <Container>
                        {/*Todo: select short quotes for mobile and long for tablets */}
                        <TouchableWithoutFeedback onPress={navigateToQuote}>
                            <View style={{marginTop: 20, marginBottom: windowSize.width > 400 ? 40 : 20 }}>
                                {quotes && quotes.length > 0 && <LibraryQuote quote={quotes.slice(-2)[0].quote} title={mostRecentReadBook.title}
                                                                              author={mostRecentReadBook.author}/>}
                            </View>
                        </TouchableWithoutFeedback>
                            {/*it's necessary to bookDetail to be memoized object that does not change the link*/}
                            <MemoMostRecentBookPresentation onBookPress={onBookPress}/>
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
                            <MemoBookList onBookPress={onBookPress} books={books}/>
                        </TabView.Item>
                        <TabView.Item>
                            <MemoBookList onBookPress={onBookPress} books={favoriteBooks}/>
                        </TabView.Item>
                        <TabView.Item>
                            <MemoBookList onBookPress={onBookPress} books={finishedBooks}/>
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

