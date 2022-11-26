import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Show} from '../types/Show';
import StarRating from 'react-native-star-rating';
import RenderHtml from 'react-native-render-html';

const height = Dimensions.get('screen').height;
var width = Dimensions.get('window').width;

const DetailScreen = () => {
  const route = useRoute();
  // @ts-ignore
  const {show} = route.params;
  let newShow = show as Show;
  console.log(newShow);
  const width = useWindowDimensions();
  const source = {
    html: newShow.show.summary,
  };

  if (!show) {
    return null;
  }

  return (
    <React.Fragment>
      {
        <View>
          <ScrollView scrollIndicatorInsets={{right: 1}}>
            <Image
              style={styles.image}
              source={{
                uri: newShow.show.image.original,
              }}
            />
            <View style={styles.container}>
              <Text style={styles.movieTitle}>{newShow.show.name}</Text>

              {newShow.show.genres && (
                <View style={styles.genresContainer}>
                  {newShow.show.genres.map(genre => (
                    <Text style={styles.genre} key={genre}>
                      {genre}
                    </Text>
                  ))}
                </View>
              )}
              {/* <StarRating maxStars={10} rating={3} starSize={10} /> */}

              <Text style={styles.releaseDate}>
                {'Release Date: ' + newShow.show.premiered}
              </Text>
            </View>
            <View style={styles.overview}>
              <RenderHtml contentWidth={width.width / 4} source={source} />
            </View>
          </ScrollView>
        </View>
      }
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  image: {
    width: width,
    height: height / 1.5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 10,
    marginBottom: 13,
  },
  genre: {
    marginRight: 15,
    fontWeight: 'bold',
  },
  overview: {
    paddingHorizontal: 15,
    textAlign: 'center',
  },
  releaseDate: {
    fontWeight: 'bold',
  },
});

export default DetailScreen;
