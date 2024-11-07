import { StyleSheet, FlatList, Image, View, Text } from 'react-native';
import {FontAwesome, SimpleLineIcons} from '@expo/vector-icons';
import { ProgressBar } from 'react-native-elements';
import CardBook from '../CardBook';

const CardUser = () => {

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
        <Text style={styles.txtnome}>Roberto Vagner</Text>
        <Text style={styles.txtemail}>robertovagner04@gmail.com</Text>
    </View>
  );
};
const styles = StyleSheet.create({
    container : {
        height: '20%',
        width: '100%',
        padding: 16,
 
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