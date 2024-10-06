import { StyleSheet, FlatList, Image, View, Text } from 'react-native';

import { ProgressBar } from 'react-native-elements';
import CardBook from '../CardBook';

const CardCategoria = ({item}) => {

  return (

      <View style={styles.container}>
         <Image style={styles.imgCategoria} source={{uri: item.source}} />
         <Text style={
           {
             fontSize: 25,
             color: '#fff',
             fontWeight: 'bold',
             position: 'absolute',
             top: 75,
             left: 25,
      
           }
         }>{item.decription}</Text>
      </View>
  );
};
const styles = StyleSheet.create({

  container : {
     width: 400,
     height: 200,
     margin: 16,
     borderRadius: 16
  },
  imgCategoria : {
    width: '100%',
    height: '100%',
      borderRadius: 10
  }


});

export default CardCategoria;