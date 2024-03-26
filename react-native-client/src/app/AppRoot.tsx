import { useEffect, useMemo} from "react";

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
        <AppStack.Navigator screenOptions={{animation: 'none'}}>
            <AppStack.Screen name={'Tabs'} options={{headerShown: false}}  component={Tabs}/>
            <AppStack.Screen options={{headerShown: false}} name={'BookDetails'} component={BookDetail} />
            <AppStack.Screen name={'Quotes'} component={Quotes} />
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
            <Tab.Screen name="Library" options={{headerShown: false}} component={Library} />
            <Tab.Screen name="Profile" options={{headerShown: false}} component={Profile} />
        </Tab.Navigator>
    );
}


