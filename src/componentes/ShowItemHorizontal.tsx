import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Show} from '../types/Show';
import Icons from 'react-native-vector-icons/Feather';
import {Divider} from 'react-native-elements';

interface Props {
  result: Show;
}
const ShowItemHorizontal = ({result}: Props) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: result?.show.image?.original}}
        />
        <View style={styles.infoContainer}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            ellipsizeMode="tail"
            style={styles.name}>
            {result.show.name}
          </Text>

          {result.show.rating.average && (
            <Text style={styles.subInfo}>
              {result.show.rating.average} <Icons size={15} name="star" />
            </Text>
          )}
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
    flexDirection: 'column',
  },
  infoContainer: {
    marginLeft: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
    marginBottom: 5,
    flexShrink: 1,
  },
  subInfo: {
    fontSize: 15,
    marginBottom: 7,
  },
  divider: {
    color: 'black',
    width: 100,
    height: 2,
  },
});

export default ShowItemHorizontal;
