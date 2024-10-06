import React, {useState} from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

const InputSearch = (props) => {

  const navigation = useNavigation();
  const [value, setValue] = useState("");

  const searchValue = () => {
    navigation.navigate("Search", {value});
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={props.placeholder}
        style={styles.input}
        value={value}
        onChangeText={setValue}
        underlineColorAndroid="transparent"
      />
      <TouchableOpacity onPress={searchValue}>
      
      <Feather name={"search"} size={24} color={"#811921"} style={styles.icon} />
      </TouchableOpacity>
    </View> 
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 245,
    marginHorizontal: 20,
  },
  input: {
    height: 50,
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 40,
    borderRadius: 8,
    marginBottom: 8,
    fontSize: 18,

  },
  icon: {
    position: "absolute",
    top: 15,
    right: 12,
  },
 
});

export default InputSearch;