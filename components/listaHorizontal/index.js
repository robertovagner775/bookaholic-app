import { StyleSheet, FlatList } from 'react-native';
import CardBook from '../CardBook';

const ListaHorizontal = (props) => {

  return (
      <FlatList
          data={props.dataSet}
          keyExtractor={(item) => item.id}
          style={{margin: 20}}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          snapToAlignment={'start'}
          renderItem={({item}) => <CardBook itemSet={item} navigation={props.navigation}/>}

       />
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 275,
 
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

export default ListaHorizontal;