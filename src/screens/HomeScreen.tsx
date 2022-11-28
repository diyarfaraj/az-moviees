import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';

import SearchBar from '../componentes/SearchBar';
import useResults from '../hooks/useResults';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/rootStackParamList';
import {Routes} from '../navigation/MainContainer';
import ShowLIst from '../componentes/ShowList';
import ShowListHorizontal from '../componentes/ShowListHorizontal';
import {Show} from '../types/Show';

var height = Dimensions.get('screen').height;
var width = Dimensions.get('window').width;

export interface HomeProps {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    Routes.RESULT_DETAILS
  >;
}

const HomeScreen = ({navigation}: HomeProps) => {
  const [term, setTerm] = useState('');
  const [searchApi, result, errors, loading] = useResults();

  const filterResultsByGenre = (genre: string): Show[] => {
    return result.filter(result => {
      const re = result.show.genres.includes(genre);
      console.log(re);
      return result.show.genres.includes(genre);
    });
  };

  return (
    <>
      {errors ? <Text>{errors}</Text> : null}
      {loading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <SafeAreaView>
          <ScrollView>
            <Image
              style={styles.image}
              source={{
                uri: result[result.length - 1]?.show.image.original,
              }}
            />
            <ShowListHorizontal
              title="Top picks for you this week"
              res={filterResultsByGenre('Drama')}
              navigation={navigation}
            />
            <ShowListHorizontal
              title="Mystery"
              res={filterResultsByGenre('Crime')}
              navigation={navigation}
            />
            <ShowListHorizontal
              title="Comedy"
              res={filterResultsByGenre('Comedy')}
              navigation={navigation}
            />
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height / 1.5,
    paddingBottom: 10,
  },
});

export default HomeScreen;
