import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Profile from "../components/pages/profile";
import Library from "../components/pages/library";
import BookDetail from "../components/pages/book-detail";
import {createStackNavigator} from "@react-navigation/stack";
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, TouchableOpacity, Animated } from 'react-native';
import {colors} from "../consts";
const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppRoot() {
    return (
        <AppStack.Navigator>
            <AppStack.Screen name={'Tabs'} options={{headerShown: false}}  component={Tabs}/>
            <AppStack.Screen name={'BookDetail'} component={BookDetail} />
        </AppStack.Navigator>
    );
}
export default AppRoot;

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
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


