import React, {useEffect, useState } from 'react';
import { StyleSheet,Modal, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome5, Feather, AntDesign} from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import Api from '../components/Api';


const Descricao = ({ navigation, route }) => {

  const livro = route.params.itemSet;
  const rating = route.params.rating;
  const [usuario, setUsuario] = useState(null);
  const [isAdded, setIsAdded] = useState(false);


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

  const addLivroBiblioteca = async (dados) => {
    try {
    let requisicao =  {                   
        id_usuario : usuario.idusuario,
        id_imagem : livro.idImagem
    }
    
      const response = await  Api.post('/biblioteca/livros', requisicao,  {
        headers: {
          Authorization: `Bearer ${usuario.token_id}`
        }
      });

      Alert.alert("Sucesso", "livro adicionado a biblioteca")
      console.log('Resposta da API:', response.data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  }

  const book = {
    "id": 1,
    "title": "O Poder do Hábito",
    "autor": "Charles Duhigg",
    "source": "https://m.media-amazon.com/images/I/51Pw06uU8FL._SY445_SX342_.jpg",
    "rating": 4.5,
    "descricao": "O Poder do Hábito é um livro que explora a ciência por trás da formação de hábitos, mostrando como eles moldam nossas vidas e como podemos mudá-los para alcançar nossos objetivos. O autor, Charles Duhigg, usa exemplos reais de empresas, atletas e indivíduos para explicar como os hábitos funcionam e como podemos usá-los a nosso favor.",
    "paginas": 368,
    "idioma": "Português"
  };

  return (
    <View style={styles.container}> 

        <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={24} color="black" /> 
        </TouchableOpacity>

        <Modal
      animationType="fade"
      transparent={true}
      visible={isAdded}
      onRequestClose={() => {
        // Funcionalidade para quando o modal é fechado
      }}
    >
      <View style={{
       position: 'absolute',
       top: 0,
       left: 0,
       right: 0,
       bottom: 0,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}>

        <View style={{
          width: 250,
          height: 280,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: "#fff"
        }}>
          <TouchableOpacity onPressIn={() => setIsAdded(false)} style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start'
                    }} onPress={() => setAvisoLeitura(false)}>
                           <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
          <Image
            style={{ width: 150, height: 150}}
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKP64A25whiNZaFbEp_-xBchU9D1RFT3CFms1M2qCxBEy0Gyf03sl-PWjq-6JbONjaWkM&usqp=CAU'}}
          />
          <Text style={{
            fontSize: 18,
          }}>Livro adicionado à biblioteca!</Text>
        </View>

      </View>
    </Modal>
      
      <View style={styles.content}>
        <View style={styles.bookInfo}>
          <View style={styles.bookCoverContainer}>
            <Image
              style={styles.bookCover}
              source={{ uri: livro.path_imagem }}
            />
          </View>
          <View style={styles.bookDetails}>
            <Text style={styles.bookTitle}>{livro.titulo}</Text>
            <Text style={styles.bookAuthor}><Text>Por </Text>{livro.escritor.nome}</Text>

            <View style={styles.infoContainer}>
              <View style={styles.details}>
                <FontAwesome5 name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingValue}>{rating}</Text>
                <TouchableOpacity>
                  <FontAwesome5 name="comment-alt" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailLabel}>Idioma:</Text>
                <Text style={styles.detailValue}>{book.idioma}</Text>
              </View>
              <TouchableOpacity style={styles.details}>
                   <Feather name="share-2" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <Text style={styles.description}>{livro.sinopse}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.readButton} onPress={() => addLivroBiblioteca()}>
                <Text style={styles.buttonText}>Adicionar á Biblioteca</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF', 
    padding: 20,
   alignItems: 'center',
   justifyContent: 'center',


  },
  header: {
        position: 'absolute',
        top: 45,
        left: 15
  

  },
  content: {
    flex: 1, 
    width: '100%',
    marginTop: 60, 
    alignItems: 'center' 
  },
  bookInfo: {
    flex: 1,
    width: '100%',
    alignItems: 'center' 
  },
  bookCoverContainer: {
    width: '60%',
    height: 375, 
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 10
  },
  bookCover: {
    width: '100%',
    height: '100%', 
    resizeMode: 'cover' 
  },
  bookDetails: {
    width: '100%', 
    padding: 20
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 5,
    textAlign: 'center' 
  },
  bookAuthor: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center' 
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%'
  },
  rating: { 
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingDetails: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingValue: {
    fontSize: 16,
    marginLeft: 5,
    color: '#333'
  },
  details: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    margin: 10
  },
  detailLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5
  },
  detailValue: {
    fontSize: 16,
    color: '#333'
  },
  description: {
    fontSize: 14,
    color: '#333', 
    marginBottom: 20,
    textAlign: 'center' 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%' 
  },
  readButton: {
    flex: 1,
    backgroundColor: '#F01624',
    padding: 15,
    borderRadius: 10,
    marginRight: 10
  },
  addButton: {
    flex: 1,
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});



export default Descricao;