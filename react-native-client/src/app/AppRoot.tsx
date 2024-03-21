import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Profile from "../components/pages/profile";
import Library from "../components/pages/library";
import BookDetail from "../components/pages/book-detail";
import {createStackNavigator} from "@react-navigation/stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
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
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list' : 'ios-list-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName || ''} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Profile" options={{headerShown: false}} component={Profile} />
            <Tab.Screen name="Library" options={{headerShown: false}} component={Library} />
        </Tab.Navigator>
    );
};

