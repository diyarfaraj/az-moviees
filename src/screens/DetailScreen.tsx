import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {RootStackParamList} from '../types/rootStackParamList';
import {useRoute} from '@react-navigation/native';
import {Show} from '../types/Show';
import showService from '../api/showService';

const DetailScreen = () => {
  const [result, setResult] = useState<Show | undefined>(undefined);
  const route = useRoute();
  console.log(route.params);
  const getDetails = async (id: string) => {
    try {
      const res = await showService.get(`/${id}`);
      setResult(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  /*   useEffect(() => {
    getDetails(id);
  }, []); */

  if (!result) {
    return null;
  }

  return (
    <View>
      <Text>results show</Text>
      <Text>{result?.show.name} </Text>
      <Image style={styles.image} source={{uri: result.show.image.medium}} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
  },
});

export default DetailScreen;
