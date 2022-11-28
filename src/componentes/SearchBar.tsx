import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';

interface Pops {
  term: string;
  onTermChange: (newTerm: string) => void;
  onTermSubmit: () => void;
}

const SearchBar = ({term, onTermChange, onTermSubmit}: Pops) => {
  return (
    <View style={styles.backgroundStyle}>
      <Icons name="search" style={styles.iconStyle} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={term}
        onChangeText={newTerm => onTermChange(newTerm)}
        style={styles.inputStyle}
        placeholder="Search"
        onEndEditing={() => onTermSubmit()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 10,
    backgroundColor: '#D3D3D3',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    marginBottom: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 15,
  },
});

export default SearchBar;
