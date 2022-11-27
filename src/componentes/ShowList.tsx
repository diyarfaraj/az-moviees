import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Show} from '../types/Show';
import {RootStackParamList} from '../types/rootStackParamList';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ShowItem from './ShowItem';
import {Routes} from '../navigation/MainContainer';

interface Props {
  title: string;
  res: Show[];
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    Routes.RESULT_DETAILS
  >;
}
const ShowLIst = ({title, res, navigation}: Props) => {
  if (!res.length) {
    return null;
  }

  const navigate = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 150}}
        data={res}
        keyExtractor={res => res.show.id.toString()}
        renderItem={(itemData: ListRenderItemInfo<Show>) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigate.navigate(Routes.RESULT_DETAILS, {
                  show: itemData.item,
                })
              }>
              <ShowItem result={itemData.item} />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
  },
  container: {},
});

export default ShowLIst;
