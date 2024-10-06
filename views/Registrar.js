import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from './../components/Input';



export default function Registrar({navigation}) {


  const [error, setError] = useState({});
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirmar, setConfirmarSenha] = useState('');

  



  const getValor = (text, title) => {
      if(title === "Nome de usuario") {
        setNome(text);
      } else if (title === "E-mail" ) {
        setEmail(text);
      } else if (title === "Senha") {
        setSenha(text);
      } else {
        setConfirmarSenha(text)
      }
   }

  const validarRegistro = () => {
    let errors = {}; 

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    if(nome == "" || nome.length <= 4) {
      errors.nome = "nome precisa ter mais de 4 caracteres"
    }
    if(!emailRegex.test(email)) {
     errors.email = "email invalido"
    }
    if(!passwordRegex.test(senha)) {
      errors.senha = "senha deve conter 8 caracteres,uma letra maiuscula,no minimo um numero"

    }
    if(senha !== senhaConfirmar || senhaConfirmar == "") {
      errors.confirmarSenha = "senhas não coincidem"
    }

    setError(errors); 
    if(Object.keys(errors).length === 0) {
      submit()
    } 
  }

  const submit = async () => {
      let usuario = {
        "nome" : nome,
        "email" : email,
        "senha" : senha
      }

       try {
    
            await AsyncStorage.setItem("usuario", JSON.stringify(usuario));
          
            console.log("dados inseridos com sucesso")
            navigation.goBack()
          } catch (error) {
              console.warn('Erro ao salvar os dados no AsyncStorage:', error);
          }
  }



  const getStyleError = () => {
    let style = {};

    style.borderColor = "#ff3333";

    return style;
  }

  return (
   
  
     <View style={styles.container}>
        <View>
          <View style={styles.cardLogo}>
          <Image style={styles.logo} source={require('../assets/imgs/bookaholic.png')} />
          </View>
          <View >
            <Text style={styles.titulo}>Criar uma Conta</Text>
          </View>
           <View style={styles.campo}>
              <Input styleError={error.nome != undefined  ? getStyleError() : undefined}   iconName={"account"} placeholder={"Nome de usuario"} 
              getValor={getValor}/>
              {error &&  error.nome && (
                  <Text style={styles.erroMensagem}>{error.nome}</Text>
              )}
          </View>
          <View style={styles.campo}>
              <Input styleError={error.email != undefined  ? getStyleError() : undefined}   iconName={"email-edit"} placeholder={"E-mail"} getValor={getValor} />
                {error && error.email && (
                  <Text style={styles.erroMensagem}>{error.email}</Text>
              )}
          </View>

          <View style={styles.campo}>
            <Input iconName={"lock"} placeholder={"Senha"} secureTextEntry styleError={error.senha != undefined  ? getStyleError() : undefined}  getValor={getValor} />

              {error &&  error.senha && (
                  <Text style={styles.erroMensagem}>{error.senha}</Text>
              )}
          </View>

          <View style={styles.campo}>
            <Input styleError={error.confirmarSenha != undefined  ? getStyleError() : undefined} iconName={"lock"}  placeholder={"Confirmar Senha"} secureTextEntry getValor={getValor} />

              {error &&  error.confirmarSenha && (
                  <Text style={styles.erroMensagem}>{error.confirmarSenha}</Text>
              )}
          </View>

          <View>

          <TouchableOpacity  style={styles.btnAcessar} onPress={validarRegistro}>
              <Text style={styles.btnText}>Registrar-se</Text>
          </TouchableOpacity>
         


          </View>
          </View>
     </View>
   
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8FF",
    flex: 1,
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
  campo : {
    marginBottom: 10,
    width: 270 
  },
  erroMensagem : {
    color: "#ff3333",
    fontSize: 10
  },

  textInput: {
    margin: 16,
    width: 275,
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 6,
    
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
    color:'#811921',
    borderColor: '#811921',

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

});