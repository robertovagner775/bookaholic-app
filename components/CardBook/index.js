import { Text, StyleSheet,Modal, View, Image, TouchableOpacity, Button } from 'react-native';
import {useEffect, useState} from 'react';

import Api from '../Api';
import StarRating from 'react-native-star-rating-widget';
 const CardBook = ({itemSet}) => {

     const [rating, setRating] = useState(0.0);
     const [qtd, setQtd] = useState(0);

     useEffect(() => {
      const getRating =  async () => {
        const  {data} = await Api.get("/livros/viewAvaliacao?id=" + itemSet.id);
        setRating(data.score)
        setQtd(data.quantidade)
    
      }
      getRating()
    }, [itemSet]);

     return(
      <View  style={styles.imgContainer}>
   
        <Image style={styles.imgBook} source={{uri: itemSet.path_imagem}} />
        <Text style={styles.tituloLivro}>{itemSet.titulo}</Text>

           <View style={styles.container}>
      <StarRating
        rating={rating}
        onChange={() => {}} 
        starSize={15} // Tamanho das estrelas
        color={rating > 0 ? 'red' : '#cccccc'} // Cor das estrelas (vermelho ao avaliar, cinza quando não avaliadas)
        starStyle={styles.starStyle} // Estilo das estrelas
        containerStyle={styles.starContainer} // Estilo do container das estrelas
      />

      <Text>( {qtd } )</Text>
    </View>
        
      </View>
     )
};

const styles = StyleSheet.create({

   container: {
    backgroundColor: '#f0f0f0', // Fundo cinza suave
    borderRadius: 10,
    flexDirection: 'row'
  },
  starStyle: {
    marginHorizontal: 2, // Diminui a distância entre as estrelas
  },
  starContainer: {
    justifyContent: 'center', // Centraliza as estrelas dentro do container
  },

  tituloLivro : {
    textAlign: 'center',
    width: 125,
  },
  tituloLivroSmall : {
    textAlign: 'center',
    width: 100,
    fontSize: 12,
  },
  imgContainer : {
    margin: 12,


  },
  imgBook : {
    
    borderRadius: 12,
    width: 125,
    height: 200,
  }

});


export default CardBook;
