import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Show} from '../types/Show';
import RenderHtml from 'react-native-render-html';
import HeartButton from '../componentes/HeartButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

var height = Dimensions.get('screen').height;
var width = Dimensions.get('window').width;

const DetailScreen = () => {
  const [favorite, setFavorite] = useState(false);
  const route = useRoute();
  // @ts-ignore
  const {show} = route.params;
  let newShow = show as Show;

  const width = useWindowDimensions();
  const source = {
    html: newShow.show.summary,
  };

  const handleFavorite = async (show: Show) => {
    if (!favorite) {
      try {
        const showToStore = JSON.stringify(show);
        await AsyncStorage.setItem(`favorite-${show.show.id}`, showToStore);
        setFavorite(true);
        console.log(favorite);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await AsyncStorage.removeItem(`favorite-${newShow.show.id}`);
        setFavorite(false);
        console.log(favorite);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getFavorite = async () => {
    try {
      const show = await AsyncStorage.getItem(`favorite-${newShow.show.id}`);
      if (show !== null) {
        setFavorite(true);
      }
      console.log(favorite);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFavorite();
  }, []);

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
              <View style={styles.heartButton}>
                <Pressable
                  onPress={() => handleFavorite(newShow)}
                  style={styles.button}>
                  <HeartButton isFavorite={favorite} />
                </Pressable>
              </View>
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
  button: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: 'white',
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
  heartButton: {
    position: 'absolute',
    right: 40,
    top: -25,
  },
  releaseDate: {
    fontWeight: 'bold',
  },
});

export default DetailScreen;
