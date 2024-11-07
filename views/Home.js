import {Dimensions,  Text, StyleSheet,Modal,ScrollView, View, Image, TouchableOpacity} from 'react-native';
import DATACATEGORIA from './../DATACATEGORIA.json';
import React,  {useEffect, useState} from 'react';

import ListaHorizontal from './../components/listaHorizontal';
import { useSharedValue } from 'react-native-reanimated';
import  Carousel from 'react-native-reanimated-carousel';

import Api from './../components/Api';
import InputSearch from './../components/InputSearch';
import DrawerModal from './../components/DrawerModal';
import {SimpleLineIcons} from '@expo/vector-icons';
import CardCategoria from '../components/CardCategoria';



export default function Home({navigation}){
      const [listLivro, setListLivro] = useState([]);
      const [listMelhorLivros, setListMelhorLivros] = useState([]);
      const [isDrawerVisible, setIsDrawerVisible] = useState(false);
      const [usuario, setUsuario] = useState(null);


      useEffect(() => {
        const getUsuario = async () => {
          const usuarioString = await SecureStore.getItemAsync("usuario");
          console.log("valor retornado: " + usuarioString)
          if (usuarioString) {
            const usuario = JSON.parse(usuarioString);
            setUsuario(usuario);
            console.log('Dados do usuário recuperados:', usuario);
          } else {
            console.log('Nenhum dado encontrado para a chave "usuario".');
          }
        }
        getUsuario()
      }, [route.params])  

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
      
const data = [0, 1, 2, 3, 4, 5];

 const width = Dimensions.get('window').width;
 const toggleDrawer = () => {
  setIsDrawerVisible(!isDrawerVisible);
};

  
  return (
  
     <ScrollView style={styles.container}>
        <DrawerModal isVisible={isDrawerVisible} closeDrawer={() => setIsDrawerVisible(false)} />


          <View style={styles.containerTop}> 
            <Image style={styles.logo} source={require('../assets/imgs/bookaholic.png')} />
            <InputSearch placeholder={"Pesquise um Livro"} onChangeText />
            <TouchableOpacity onPress={toggleDrawer}>
              <SimpleLineIcons name="menu" size={30} color="black" />
            </TouchableOpacity>
        </View>


        <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={DATACATEGORIA}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <CardCategoria  item={item} />
                )}
            />


  
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
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 15,
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