import { StyleSheet, FlatList, Image, View, Text, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {FontAwesome, SimpleLineIcons} from '@expo/vector-icons';
import { ProgressBar } from 'react-native-elements';
import CardBook from '../CardBook';
import { useNavigation } from '@react-navigation/native';

const CardUser = ({usuario}) => {
  
  const navigation = useNavigation();


  const logout = async () => {

    await SecureStore.deleteItemAsync("usuario");
    navigation.navigate('Login')

  }

  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'space-between'
      }}>
        <FontAwesome name="user-circle" size={50} color="black" />

        <TouchableOpacity style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "gray",
                    padding: 16,
                    marginLeft: 8,
                    borderRadius: 50
                }} onPress={() => logout()}>
                    <SimpleLineIcons name="logout" size={24} color="black" />
                </TouchableOpacity>
        </View>        
        <Text style={styles.txtnome}>{usuario.username}</Text>
        <Text style={styles.txtemail}>{usuario.email}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
    container : {
        height: 200,
        width: '100%',
       padding: 16 
 
    },
    txtnome : {
       fontSize: 22,
       fontWeight : 'bold',
    },
    txtemail : {
        fontSize: 18,

     },

});

export default CardUser;