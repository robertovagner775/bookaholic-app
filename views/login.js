import { Text, StyleSheet,Modal, View, Image, TouchableOpacity, Button } from 'react-native';
import {useState} from 'react';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Input from './../components/Input';
import Api from '../components/Api';

export default function Login({navigation}){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [usuario, setUsuario] = useState(null);

    const handlePostRequest = async ()  => {
        const response = await Api.post('/usuario/login', {
          email: email,
          senha: senha
        });
   

        if(response.status == 200) {
          setUsuario(response.data)
          setUsuarioSecurity(response.data)
          let usuario =  response.data
          navigation.navigate("Biblioteca", {usuario})
        } 
    
    };
 

    const fecharModal = () => {
      setModalVisible(false);
    }
    const getValor = (text, title) => {
      if(title === "E-mail") {
        setEmail(text)
      } else  {
        setSenha(text)
      }
    }
    const setUsuarioSecurity = async (data) => {
      const userString = JSON.stringify(data);
      await SecureStore.setItemAsync('usuario', userString);
    }
    const autenticacao =  async () => {
      if (usuario.email == email && usuario.senha == senha) {
        navigation.navigate("Home", {usuario});
      } else {
        setModalVisible(true)
      }
    }
  return (
     <View style={styles.container}>
       <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <AntDesign name="exclamationcircleo" size={60} color="#ffff00" />
              <Text style={styles.modalText}> Usuario não encontrado </Text>
              <TouchableOpacity style={styles.btnModal} onPress={fecharModal}>
                <Text  style={styles.btnModalText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


        <View>
          <View style={styles.cardLogo}>
          <Image style={styles.logo} source={require('../assets/imgs/bookaholic.png')} />
          </View>
          <View>
            <Text style={styles.titulo}>Seja Bem-Vindo!</Text>
          </View>
          
          <View style={styles.containerInput}>
              <Input getValor={getValor} iconName={"email-edit"} placeholder={"E-mail"}/>
          </View>

          <View style={styles.containerInput}>
            <Input getValor={getValor} iconName={"lock"} placeholder={"Senha"} secureTextEntry />
          </View>

          <View>

          <TouchableOpacity  style={styles.btnAcessar} onPress={handlePostRequest}>
              <Text style={styles.btnText}>Acessar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnRegistrar} onPress={()=> navigation.navigate('Registrar')}>
              <Text style={styles.btnTextDois}>Registrar</Text>
          </TouchableOpacity>


          </View>
          </View>

  
     </View>
   
    
  );
}


const styles = StyleSheet.create({
  container: {
     flex: 1,
    backgroundColor: "#F8F8FF",
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  titulo: {
    textAlign: 'center',
    fontSize:22,
    marginBottom: 12,
  },

  cardLogo: {
      justifyContent: 'center',
      alignItems: 'center',
  },

  logo: {
      width: 250,
      height: 250
  },

  textInput: {
    margin: 16,
    width: 275,
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 6,
    
  },
containerInput : {
  marginBottom: 12,
},
  btnAcessar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F01624',
    marginBottom: 8,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  btnRegistrar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    color:'#F01624',
    borderColor: '#F01624',

    borderRadius: 20,
    paddingVertical: 12,
     borderWidth: 2,
    paddingHorizontal: 32,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#fff',
  },

  btnTextDois: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
     color:'#811921',
  },
    centeredView: {
     flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginTop: 16,
    marginBottom: 15,
    textAlign: "center"
  },
  btnModal : {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#811921',
    borderRadius: 10,
    padding: 12

   
  },
  btnModalText : {
    color: "#fff"
  }

});