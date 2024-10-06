import { Text, StyleSheet,Modal, View, Image, TouchableOpacity, Button } from 'react-native';
import {useState} from 'react';
import StarRating from 'react-native-star-rating-widget';
import { useNavigation } from '@react-navigation/native'

 const CardDesc = ({itemSet}) => {

    const navigation = useNavigation();
    const [rating, setRating] = useState(0);
     
     return(
      <TouchableOpacity  style={styles.container} onPress={() => navigation.navigate("Leitor")}>
   
        <Image style={styles.imgBook} source={{uri: itemSet.source}} />

        <View style={{
            justifyContent: "space-around"
        }}>
            <View>
                <Text style={{
                  fontSize: 18,
                  fontWeight: "bold"
                }}>Titulo do Livro</Text>
                <Text style={{
                  fontSize: 16,
                  color: "gray",
                }}>Nome do Autor</Text>
            </View>
            <View>
              <StarRating
                  rating={rating}
                  onChange={() => {}} 
                  starSize={30} // Tamanho das estrelas
                  color={rating > 0 ? 'red' : '#CFCFCF'} // Cor das estrelas (vermelho ao avaliar, cinza quando não avaliadas)
                  starStyle={styles.starStyle} // Estilo das estrelas
                  containerStyle={styles.starContainer} // Estilo do container das estrelas
                />
            </View>
        </View>


      </TouchableOpacity>
     )
};

const styles = StyleSheet.create({
  
  container : {
    margin: 16,
    flexDirection: "row",
  },
  imgBook : {
    marginRight: 8,
    borderRadius: 12,
    width: 140,
    height: 215,
  },

 
  starStyle: {
   
    marginHorizontal: 0, // Diminui a distância entre as estrelas
  },
  starContainer: {
     
    justifyContent: 'center', // Centraliza as estrelas dentro do container
  },

});


export default CardDesc;