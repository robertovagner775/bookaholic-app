import { Text, StyleSheet, View, Image,ScrollView, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { ProgressBar } from 'react-native-elements';
import DATA from './../data.json';
import {useEffect, useState} from 'react';
import Api from '../components/Api';
import ListaHorizontal from './../components/listaHorizontal';
import CardDesc from './../components/CardDesc';

export default function Biblioteca({navigation, route}){

  const [usuario, setUsuario] = useState(null);
  const [listaLivrosBiblioteca, setLivrosBiblioteca] = useState({});



useEffect(() => {
  const getUsuario = async () => {
    const usuarioString = await SecureStore.getItemAsync("usuario");
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
 
    console.log(usuario)
    const getBibliotecaUsuario =  async () => { 
    const  response = await Api.get("/biblioteca/listar-livros-usuarios", {
        params : {
          id: usuario.idUsuario,
        },
        headers : {
          Authorization: "Bearer "+ usuario.token,
        },

      });

      setLivrosBiblioteca(response.data)
    }
    getBibliotecaUsuario()
 
  }, [usuario]);


  return (
     <ScrollView style={styles.container}>

          { usuario && (
            <View>
          <View style={{
            backgroundColor: "#e64529",
            width: '100%',
            height: '10%',

            position: 'absolute',
            borderRadius: 16,
            flex: 1
          }}></View>

          <View style={styles.containerLeitor}>
            <View style={styles.containerimgLeitor}>
                
            </View>
            <View style={styles.containerDescLeitor}>
              <Text style={styles.infoLeitor}>Roberto Vagner</Text>
              <Text style={styles.infoAddLeitor}>status personalizado</Text>
              <TouchableOpacity style={styles.butaoPersonalizado}>
                  <Text style={{
                    color: "#F01624",
                  }}>Dados Leitura</Text>
              </TouchableOpacity>
            </View>
        </View>

        <View>
          <Text style={styles.titulo}>Leituras em Andamento</Text>
          <ListaHorizontal dataSet={DATA} />
        </View>
     
      
      <ScrollView style={styles.containerScroll} contentContainerStyle={styles.contentContainer}>
          <Text style={{
              fontSize: 18,
              marginLeft: 16,
           
          }}>Livros na Biblioteca</Text>
        {DATA.map((item, index) => (
          <View key={index} style={styles.cardContainer}>
            <CardDesc itemSet={item} />
 
          </View>
        ))} 
      </ScrollView>
        </View>
          )}

      { !usuario && (
          <View 
            style={{
              flex: 1,
              height: 750,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: "#fffffff"
            }}
          >

                <Image style={{
                  height: 150,
                  width: 150,
                  marginBottom: 25
                }} source={require('../assets/imgs/bookaholic.png')} />

                <Text style={{
                  fontSize: 25,
                  fontWeight: 'bold',
            
                }}>Usuario não encontrado</Text>
                <Text style={{
                  fontSize: 25,
                }}
                >Entre em sua conta para acessar sua biblioteca pessoal</Text>

                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.butaoFaltaUsuario}>
                      <Text style={{
                        color: "#fff"
                      }}>CONECTAR-SE</Text>
                </TouchableOpacity>
          </View>
      )}
     </ScrollView>
   
    
  );
}
const styles = StyleSheet.create({
  containerScroll: {
    flex: 1,
    marginLeft: 10,
  },
 titulo : {
   fontSize: 18,
   marginLeft: 16,
   color: "#fff"
 },
 containerLeitor : {
    marginTop: 85,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
 },
 containerimgLeitor : {
   borderRadius: 50,
   marginRight: 18,
   width: 80,
   height: 80,
   backgroundColor: "#CFCFCF"
 },
 infoLeitor : {
   fontSize: 16,
   fontWeight: "bold",
   color: "#fff"
 },
 infoAddLeitor : {
   color: "#fff"
 },
 butaoPersonalizado : {
   width: 200,
   borderRadius: 5,
   justifyContent: "center",
   alignItems: "center",
   padding: 6,
   color: "#F01624",
   backgroundColor: "#fff",
   borderColor: "#F01624",  
   borderWidth: 2,
 },
 butaoFaltaUsuario : {
   width: 200,
   borderRadius: 8,
   justifyContent: "center",
   alignItems: "center",
   padding: 16,
    marginTop: 15,
   backgroundColor: "#F01624",
 }

});