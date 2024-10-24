import { Text, StyleSheet,Modal, View, Image, TouchableOpacity, Button } from 'react-native';
import {useState, useEffect} from 'react';
import { createTable, saveProgress, loadProgress } from './../../database/database'; // Ajuste o caminho conforme necessário

import * as SecureStore from 'expo-secure-store';
import StarRating from 'react-native-star-rating-widget';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

 const CardDesc = ({itemSet}) => {

    const navigation = useNavigation();
    const [rating, setRating] = useState(0);
    const [dadosLeituraUsuario, setDadosLeituraUsuario] = useState({});
    const [progresso, setProgresso] = useState(0.00);
    useEffect(() =>  {
      const setarDados = async ()  => {
        const usuarioString = await SecureStore.getItemAsync("usuario");

        if(usuarioString) {
            let obj = JSON.parse(usuarioString)
            console.log('teste de usuario: '+ obj.idusuario)
            const savedLocation = await loadProgress(obj.idusuario , itemSet.id);
            setProgresso(savedLocation.porcentagem)
            console.log(savedLocation.porcentagem)
            setDadosLeituraUsuario(
              {
            idusuario: obj.idusuario,
            livro: itemSet
            })
         }
      }
      console.log("teste " + itemSet.pathImagem)
      setarDados()
    }, [])

  

     return(
      <TouchableOpacity  style={styles.container} onPress={() => navigation.navigate("Leitor", {dadosLeituraUsuario})}>
   
        <Image style={styles.imgBook} source={{uri: itemSet.pathImagem}} />

        <View style={{
            justifyContent: "space-around"
        }}>
            <View>
                <Text style={{
                  fontSize: 18,
                  fontWeight: "bold"
                }}>{itemSet.titulo}</Text>
                <Text style={{
                  fontSize: 16,
                  color: "gray",
                }}>{itemSet.subtitulo}</Text>
            </View>
            <View>
            <Progress.Bar progress={progresso} width={200} height={12} color="red" fill="#0000000" />

              <StarRating
                  rating={rating}
                  onChange={() => {}} 
                  starSize={30}
                  color={rating > 0 ? 'red' : '#CFCFCF'} 
                  starStyle={styles.starStyle} 
                  containerStyle={styles.starContainer} 
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
   
    marginHorizontal: 0, 
  },
  starContainer: {
     
    justifyContent: 'center', 
  },

});


export default CardDesc;