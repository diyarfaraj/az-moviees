import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {PureComponent, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import ShowLIst from '../componentes/ShowList';
import {Routes} from '../navigation/MainContainer';
import {RootStackParamList} from '../types/rootStackParamList';
import {Show} from '../types/Show';

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

  useEffect(() => {
    getFavorite();
  }, []);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Text style={styles.header}>🎬 Favorite Movies</Text>
      <SafeAreaView>
        <ShowLIst title="Result" res={shows} navigation={navigation} />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  },
});

export default FavoriteScreen;
