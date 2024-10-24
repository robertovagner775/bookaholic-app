import { Text, StyleSheet,Modal,ScrollView, View, Image} from 'react-native';
import DATACATEGORIA from './../DATACATEGORIA.json';
import React, {useEffect, useState} from 'react';
import ListaHorizontal from './../components/listaHorizontal';
import Carousel from './../components/Carousel';
import Api from './../components/Api';
import InputSearch from './../components/InputSearch';
import {SimpleLineIcons} from '@expo/vector-icons';


export default function Home({navigation}){
      const [listLivro, setListLivro] = useState([]);
      const [listMelhorLivros, setListMelhorLivros] = useState([]);

      useEffect(() => {
        const getLivroColunaUm =  async () => {
          const  {data} = await Api.get("/livros/melhores-livros");
          setListMelhorLivros(data)
        }
        getLivroColunaUm()
      }, []);
      useEffect(() => {
      const getLivroColunaDois =  async () => {
        const  {data} = await Api.get("/livros/imagens");
        setListLivro(data)
      }
      getLivroColunaDois()
    }, []);
      
  return (
  
  
     <ScrollView style={styles.container}>


          <View style={styles.containerTop}> 
            <Image style={styles.logo} source={require('../assets/imgs/bookaholic.png')} />
            <InputSearch placeholder={"Pesquise um Livro"} onChangeText />
            <SimpleLineIcons name="menu" size={30} color="black" />
        </View>



        <Carousel dataSet={DATACATEGORIA} /> 
        

        <Text style={styles.titulo}>Mais Bem Avaliados</Text>
        <ListaHorizontal dataSet={listMelhorLivros} />


        <Text style={styles.titulo}>Livros Mais Acessados</Text>
        <ListaHorizontal dataSet={listLivro} />


     </ScrollView>
   
    
  );
}


const styles = StyleSheet.create({
  container : {
    marginTop: 60,
  },
  containerTop: {
    flexDirection: "row",
    alignItems: "center"
  },
  logo: {
    width: 75,
    height: 75, 
  },
  titulo : {
   fontSize: 18,
   marginLeft: 16
  },

});