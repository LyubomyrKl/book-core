import React, { useEffect, useMemo} from "react";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";

import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {getColors} from "../consts";


import Profile from "../screens/profile";
import Library from "../screens/library";
import BookDetail from "../screens/book-detail";
import Quotes from "../screens/quotes";
import {useAppDispatch, useAppSelector} from "../hooks";
import {selectTheme, setTheme} from "../redux/slices/settingSlice";

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppRoot() {

    return (
        // @ts-ignore
        <AppStack.Navigator screenOptions={{animation: 'none'}}>
            <AppStack.Screen name={'Tabs'} options={{headerShown: false}}  component={Tabs}/>
            {/*// @ts-ignore*/}
            <AppStack.Screen options={{headerShown: false}} name='BookDetails' component={BookDetail} />
            {/*// @ts-ignore*/}
            <AppStack.Screen options={{headerShown: false}} name='Quotes' component={Quotes} />
        </AppStack.Navigator>
    );
}
export default AppRoot;

const Tabs = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);

    const colors = useMemo(() => getColors(theme), [theme]);

    useEffect(() => {
        dispatch(setTheme(theme));
    }, [theme])

    return (
        <Tab.Navigator
            initialRouteName={'Library'}
            screenOptions={({ route }) => ({
                tabBarStyle: { backgroundColor: colors.backgroundWhite },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';

                    if (route.name === 'Library') {
                        return <Ionicons name='library-outline' size={size} color={color} />;
                    } else if (route.name === 'Profile') {
                        return <Octicons name='person' size={size} color={color} />;
                    }
                    // You can return any component that you like here!
                    return <Octicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.textPurpleBlue,
                tabBarInactiveTintColor: colors.textGrey,

            })}
        >
            {/*// @ts-ignore*/}
            <Tab.Screen name="Library" options={{headerShown: false}} component={Library} />
            {/*// @ts-ignore*/}
            <Tab.Screen name="Profile" options={{headerShown: false}} component={Profile} />
        </Tab.Navigator>
    );
}


