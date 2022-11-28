import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  SafeAreaView,
  View,
  Image,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import {Show} from '../types/Show';
import {RootStackParamList} from '../types/rootStackParamList';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Routes} from '../navigation/MainContainer';
import ShowItemHorizontal from './ShowItemHorizontal';

interface Props {
  title: string;
  res: Show[];
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    Routes.RESULT_DETAILS
  >;
}
const ShowListHorizontal = ({title, res}: Props) => {
  const width = useWindowDimensions();

  if (!res.length) {
    return null;
  }

  const navigate = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text>See all</Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}
        data={res}
        keyExtractor={res => res?.show?.id.toString()}
        renderItem={(itemData: ListRenderItemInfo<Show>) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigate.navigate(Routes.RESULT_DETAILS, {
                  show: itemData.item,
                })
              }>
              <ShowItemHorizontal result={itemData.item} />
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

  titleContainer: {
    backgroundColor: '#f5c518',
    paddingVertical: 5,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {},
});

export default ShowListHorizontal;
