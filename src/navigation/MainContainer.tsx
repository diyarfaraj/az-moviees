import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SearchScreen from '../screens/SearchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from '../screens/DetailScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoriteScreen from '../screens/FavoriteScreen';
import HomeScreen from '../screens/HomeScreen';

//Screen names
export enum Routes {
  SEARCH_STACK = 'SearchStack',
  RESULT_DETAILS = 'Details',
  FAVORITES = 'Favorites',
  HOME_STACK = 'Home',
}

const searchNav = 'Search';
const favoritesNav = 'Favorite';
const homeNav = 'Welcome';

const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const FavoriteStack = createNativeStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      options={{headerShown: false}}
      name={Routes.HOME_STACK}
      component={HomeScreen}
    />
    <HomeStack.Screen
      options={{
        headerShown: true,
        headerTintColor: '#f5c518',
      }}
      name={Routes.RESULT_DETAILS}
      component={DetailScreen}
    />
  </HomeStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      options={{headerShown: false}}
      name={Routes.SEARCH_STACK}
      component={SearchScreen}
    />
    <SearchStack.Screen
      options={{
        headerShown: true,
        headerTintColor: '#f5c518',
      }}
      name={Routes.RESULT_DETAILS}
      component={DetailScreen}
    />
  </SearchStack.Navigator>
);

const FavoriteStackScreen = () => (
  <FavoriteStack.Navigator>
    <FavoriteStack.Screen
      options={{headerShown: false}}
      name={Routes.FAVORITES}
      component={FavoriteScreen}
    />
    <FavoriteStack.Screen
      options={{
        headerShown: true,
        headerTintColor: '#f5c518',
      }}
      name={Routes.RESULT_DETAILS}
      component={DetailScreen}
    />
  </FavoriteStack.Navigator>
);
const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeNav}
        screenOptions={({route}) => ({
          tabBarLabelStyle: {
            fontSize: 11,
          },
          tabBarActiveTintColor: '#f5c518',
          tabBarInactiveTintColor: 'grey',

          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName = '';
            let rn = route.name;

            if (rn === searchNav) {
              iconName = focused ? 'search' : 'search';
              color = focused ? '#f5c518' : 'grey';
            } else if (rn === favoritesNav) {
              iconName = focused ? 'heart' : 'heart';
              color = focused ? '#f5c518' : 'grey';
            } else if (rn === homeNav) {
              iconName = focused ? 'home' : 'home';
              color = focused ? '#f5c518' : 'grey';
            }

            return <Icon name={iconName} size={20} color={color} />;
          },

          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 3,
          },
        })}>
        <Tab.Screen name={homeNav} component={HomeStackScreen} />
        <Tab.Screen name={searchNav} component={SearchStackScreen} />
        <Tab.Screen name={favoritesNav} component={FavoriteStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
