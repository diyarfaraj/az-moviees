import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Show} from '../types/Show';
import Icons from 'react-native-vector-icons/Feather';
import {Divider} from 'react-native-elements';

interface Props {
  result: Show;
}
const SearchItem = ({result}: Props) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: result.show.image.original}}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{result.show.name}</Text>
          {result.show.premiered && (
            <Text style={styles.subInfo}>
              {result.show.premiered?.slice(0, 4)} -{' '}
              {result.show.ended?.slice(0, 4)}
            </Text>
          )}
          {result.show.rating.average && (
            <Text style={styles.subInfo}>
              {result.show.rating.average} <Icons size={15} name="star" />
            </Text>
          )}

          <Text style={styles.subInfo}>{result.show.genres.join(' ')}</Text>
        </View>
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 3,
    display: 'flex',
    flexDirection: 'row',
  },
  infoContainer: {
    marginLeft: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  subInfo: {
    fontSize: 17,
  },
  divider: {
    color: 'black',
    width: 100,
    height: 2,
  },
});

export default SearchItem;
