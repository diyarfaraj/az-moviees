import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SearchScreen from '../screens/SearchScreen';
import Ionicons from 'react-native-vector-icons/';
import Icon from 'react-native-vector-icons/Feather';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import DetailScreen from '../screens/DetailScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoriteScreen from '../screens/FavoriteScreen';

//Screen names
export enum Routes {
  SEARCH_STACK = 'SearchStack',
  RESULT_DETAILS = 'ResultDetail',
  FAVORITES = 'Favorites',
}

const searchNav = 'Search';
const favoritesNav = 'Favorite';

const SearchStack = createNativeStackNavigator();
const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      options={{headerShown: false}}
      name={Routes.SEARCH_STACK}
      component={SearchScreen}
    />
    <SearchStack.Screen name={Routes.RESULT_DETAILS} component={DetailScreen} />
  </SearchStack.Navigator>
);
const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={searchNav}
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
            }

            // return <Ionicons name={iconName} size={size} color={color} />;
            return <Icon name={iconName} size={20} color={color} />;
          },

          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 3,
          },
        })}
        /*   tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "grey",
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 },
        }} */
      >
        <Tab.Screen name={searchNav} component={SearchStackScreen} />
        <Tab.Screen name={favoritesNav} component={FavoriteScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
