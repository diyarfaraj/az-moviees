import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {PureComponent, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import ShowLIst from '../componentes/ShowList';
import {Routes} from '../navigation/MainContainer';
import {RootStackParamList} from '../types/rootStackParamList';
import {Show} from '../types/Show';
import {useFocusEffect} from '@react-navigation/native';

interface FavoriteProps {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    Routes.RESULT_DETAILS
  >;
}

const FavoriteScreen = ({navigation}: FavoriteProps) => {
  const [shows, setShows] = useState<Show[]>([]);

  const removeFavorite = async (show: Show) => {
    try {
      await AsyncStorage.removeItem(`favorite-${show.show.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const getFavorite = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      let shows: Show[] = [];
      result.map(req => {
        // @ts-ignore
        let obj = JSON.parse(req[1]);
        let show = obj as Show;
        shows.push(show);
        console.log(shows);
      });

      setShows(shows);
    } catch (e) {
      console.log('error in getfavorite', e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getFavorite();
    }, []),
  );

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>🎬 Your favorite shows</Text>
      </View>
      <SafeAreaView>
        <ShowLIst title="" res={shows} navigation={navigation} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 10,
    backgroundColor: '#f5c518',
  },
  header: {
    fontSize: 20,

    textAlign: 'center',
  },
});

export default FavoriteScreen;
