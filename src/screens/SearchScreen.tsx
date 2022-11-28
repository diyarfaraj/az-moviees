import React, {useState} from 'react';
import {Text, StyleSheet, ActivityIndicator, SafeAreaView} from 'react-native';

import SearchBar from '../componentes/SearchBar';
import useResults from '../hooks/useResults';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/rootStackParamList';
import {Routes} from '../navigation/MainContainer';
import ShowLIst from '../componentes/ShowList';

export interface SearchProps {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    Routes.RESULT_DETAILS
  >;
}

const SearchScreen = ({navigation}: SearchProps) => {
  const [term, setTerm] = useState('');
  const [searchApi, result, errors, loading] = useResults();

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={(newTerm: string) => setTerm(newTerm)}
        onTermSubmit={() => searchApi(term)}
      />
      {errors ? <Text>{errors}</Text> : null}
      {loading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <SafeAreaView>
          <ShowLIst title="Result" res={result} navigation={navigation} />
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
