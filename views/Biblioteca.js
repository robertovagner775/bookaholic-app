import { Text, StyleSheet, View, Image,ScrollView, TouchableOpacity, Animated, Dimensions} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { ProgressBar } from 'react-native-elements';
import DATA from './../data.json';
import {useEffect, useState} from 'react';
import Api from '../components/Api';
import ListaHorizontal from './../components/listaHorizontal';
import InputSearch from './../components/InputSearch';
import DrawerModal from './../components/DrawerModal';
import CardDesc from './../components/CardDesc';
import {SimpleLineIcons, AntDesign} from '@expo/vector-icons';
import { Modal } from 'react-native-paper';


export default function Biblioteca({navigation, route}){

  const [usuario, setUsuario] = useState(null);
  const [listMelhorLivros, setListMelhorLivros] = useState([]);
  const [livrosBiblioteca, setLivrosBiblioteca] = useState([]);
  const [dadosLeitura, setDadosLeitura] = useState({});
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [modalDescricao, setModalDescricao] = useState(false);

  useEffect(() => {
    const getLivroColunaUm =  async () => {
      const  {data} = await Api.get("/livros/melhores-livros");
      setListMelhorLivros(data)
    }
    getLivroColunaUm()
  }, []);

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


const logout = async () => {
  setUsuario(null)
  await SecureStore.deleteItemAsync("usuario")
}

useEffect(() => {
  if (usuario) {
    const getBibliotecaUsuario = async () => {
      try {
        const token_id = usuario.token_id;
        const response = await Api.get("/biblioteca/listar-livros-usuarios", {
          params: { id: usuario.idusuario },
          headers: { Authorization: `Bearer ${token_id}` },
        });
        console.log(response.data);
        setLivrosBiblioteca(response.data);
      } catch (error) {
        console.error("Erro ao obter biblioteca:", error);
      }
    };

    getBibliotecaUsuario();
  }
}, [usuario]);

const toggleDrawer = () => {
  setIsDrawerVisible(!isDrawerVisible);
};

  return (
     <ScrollView style={styles.container}>

          { usuario && (




        <View style={{
          paddingTop: 60,
        }}>
          <DrawerModal isVisible={isDrawerVisible} usuario={usuario} closeDrawer={() => setIsDrawerVisible(false)} />
          <View style={{
            backgroundColor: "#e64529",
            width: '100%',
            height: 300,
        
            position: 'absolute',
            borderRadius: 16,
            flex: 1
          }}></View>
        <View style={styles.containerTop}> 
        <Image style={styles.logo} source={require('../assets/imgs/bookaholic-white.png')} />
          
          <TouchableOpacity onPress={toggleDrawer} >
                <SimpleLineIcons name="menu" size={30} color="white" />
        </TouchableOpacity>
        </View>


      <View>
          <Text style={styles.titulo}>Recomendacao de Leituras</Text>
          <ListaHorizontal dataSet={listMelhorLivros} />
          
      </View>

       
     
      
      <ScrollView style={styles.containerScroll} contentContainerStyle={styles.contentContainer}>
          <Text style={{
              fontSize: 18,
              marginLeft: 16,
           
          }}>Livros na Biblioteca</Text>
        {livrosBiblioteca.map((item, index) => (
        
          <View key={index} style={styles.cardContainer}>
            <CardDesc itemSet={item} setModal={() => setModalDescricao(true)} />
 
          </View>
        )
        
        )
        
        } 
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



      <Modal
    
        animationType="fade"
        transparent={true}
        visible={modalDescricao}
        onRequestClose={() =>  setModalDescricao(false)}
        >

          <View style={styles.content}>

          <TouchableOpacity style={{
            position: 'absolute',
            top: 15,
            left: 15
          }} onPress={() => setModalDescricao(false)}>
                 <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
            <Image
              source={{ uri: 'https://sebodamata.com.br/wp-content/uploads/2021/05/aartedaguerra_suntzu.jpg' }}
              style={styles.bookCover}
            />
            <Text style={styles.bookTitle}>A Arte da Guerra</Text>
            <Text style={styles.bookDescription}>
              Um clássico sobre estratégia e tática militar, oferecendo ensinamentos aplicáveis a diversas áreas além da guerra, como negócios e gestão. Com foco em planejamento, liderança e antecipação.
            </Text>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Iniciar Leitura</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Retomar Leitura</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Compartilhar Leitura</Text>
            </TouchableOpacity>
          </View>
   
      </Modal>
     </ScrollView>
   
    
  );
}
const styles = StyleSheet.create({

  containerTop: {
    flexDirection: "row",
    zIndex: 1,
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  logo: {
    width: 75,
    height: 75, 
  },
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
    marginTop: 40,
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
 },
 content: {
  width: '100%',
  height: '100%',
  backgroundColor: '#fff',
  alignItems: 'center',

},
bookCover: {
  width: 200,
  height: 300,
  borderRadius: 10,
  marginBottom: 20,
},
bookTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 10,
},
bookDescription: {
  fontSize: 16,
  textAlign: 'center',
  color: '#666',
  marginBottom: 30,
},
button: {
  backgroundColor: '#A4161A',
  paddingVertical: 15,
  paddingHorizontal: 40,
  borderRadius: 30,
  marginBottom: 15,
  width: '80%',
  alignItems: 'center',
},
buttonText: {
  color: '#FFF',
  fontSize: 16,
  fontWeight: 'bold',
},
});