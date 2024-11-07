import {SafeAreaView,StyleSheet, ScrollView, TouchableOpacity, View, Modal ,Text,TextInput, Button, Picker} from 'react-native';
import { createTable, saveProgress, loadProgress, createAnnotation, loadAnotations, verificaFinalizado, atualizaFinalizado } from '../database/database'; // Ajuste o caminho conforme necessário
 // Ajuste o caminho conforme necessário
 import { useFocusEffect } from '@react-navigation/native';
 import Fontisto from '@expo/vector-icons/Fontisto';
import React, { useRef, useState, useEffect, useCallback} from 'react';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 
import CardAnotacao from '../components/CardAnotacao'
import { Header } from './../components/Header';
import { Reader, useReader, ReaderProvider,   Themes, useLocation} from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';


const  EpubReader = ({dadosLeitura, navigation}) => {
  const [annotations, setAnnotations] = useState([]);
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [anottationVisible, setAnottationVisible] = useState(false);
  const [avisoLeitura, setAvisoLeitura] = useState(false);

 
   const {goPrevious, goNext, goToLocation, isLoading, readerRef, currentLocation} = useReader({
      src: dadosLeitura.livro.pathEpub,
      fileSystem: true,
      locations: 1000,
   });

 
  const [location, setLocation] = useState(null);
  const [lastLocation, setLastLocation] = useState(null);
  
  const removeItemArray = (anotacao) => {
    setAnnotations(annotations.filter(item => item !== anotacao));  
}

const goToLocationBook = (cfi) => {
  goToLocation(cfi)
  setAnottationVisible(false)
}
 
  useEffect(()  => {
    fetchProgress()
  }, []);
  
  const  fetchProgress = async () => { 

    const savedLocation = await loadProgress(dadosLeitura.idusuario , dadosLeitura.livro.id);
    setLastLocation(savedLocation.localLivro)
  }
  useEffect(()  => {
    fetchAnnotation()
  }, [modalVisible]);

  const  fetchAnnotation = async () => { 
    const annotation = await loadAnotations(dadosLeitura.idusuario, dadosLeitura.livro.id);
    setAnnotations(annotation)
  }

  const saveAnnotation = async () => {
    createTable()

    const pageNumber = currentLocation.start.displayed.page; 
    const cfi = currentLocation.start.cfi;




    createAnnotation(dadosLeitura.idusuario, dadosLeitura.livro.id, description , cfi, pageNumber)

    setAnottationVisible(false)


  };



 const marcarFinalizacao = async () => {
    atualizaFinalizado(dadosLeitura.idusuario, dadosLeitura.livro.id);
 }
  
 
 //verifica se o livro foi finalizado
useEffect(() => {
  const verificaFinalizacaoLivro = async () => {
    if(currentLocation && currentLocation.atEnd) {
    if(currentLocation.end.percentage == 1) {
      const result = await verificaFinalizado(dadosLeitura.idusuario , dadosLeitura.livro.id)

      if(result) {
        setAvisoLeitura(true) 
      } 
    }
    }

}
verificaFinalizacaoLivro();
}, [currentLocation && currentLocation.end ]);



 

  return (   
        <SafeAreaView style={{
          flex: 1,
          paddingTop: 50,
          backgroundColor: "#545454"
        }}>

       

      <Header dadosLeitura={dadosLeitura} current={currentLocation} onAddAnnotation={() => setModalVisible(true)} onViewAnnotation={() => setAnottationVisible(true)}/>

           <Reader
              reader={readerRef}
              src={dadosLeitura.livro.pathEpub}
            
              initialLocation={lastLocation}
           
              fileSystem={useFileSystem}
              defaultTheme={Themes.DARK}
        
            />

   

              


<Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Nova Anotação</Text>
              <TextInput
                placeholder="Digite uma descrição para a anotação"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
              />
                 <TouchableOpacity onPress={() => setModalVisible(false)} style={{
                    position: 'absolute',
                    right: 15,                
                }} >
                    <Text style={{
                      fontSize: 35,
                    }}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: '#F01624',
                    borderRadius: 12,
                    padding: 12,
                }}
                onPress={saveAnnotation} 
                >
                    <Text>ADICIONAR</Text>
                </TouchableOpacity>
      
          
            </View>
          </View>
        </Modal>


        <Modal
        animationType="fade"
        transparent={true}
        visible={anottationVisible}
        onRequestClose={() =>  setAnottationVisible(false)}
        >
          <ScrollView style={{
              backgroundColor: "#fff",
              padding: 8,
          }}>
                <TouchableOpacity onPress={() => setAnottationVisible(false)} style={{
                  justifyContent: "flex-end",
                  alignItems: 'flex-end'                 
                }} >
                    <Text style={{
                      fontSize: 35,
                    }}>X</Text>
                </TouchableOpacity>
                      {annotations.map((item, index) => (
              
              <View key={index} style={styles.cardContainer}>
                <CardAnotacao anotacao={item} removeAnotacao={removeItemArray} index={index} goToPosition={goToLocationBook} />
         
              </View>
            )
            
            )
            
            } 


          </ScrollView>
        </Modal>


        <Modal
        animationType="fade"
        transparent={true}
        visible={avisoLeitura}
        onRequestClose={() =>  setAvisoLeitura(false)}
        >
            <View style={{
              padding: 36,
              backgroundColor: "#ffff",
            }}>
                  <TouchableOpacity style={{
            position: 'absolute',
            top: 15,
            left: 15
          }} onPress={() => setAvisoLeitura(false)}>
                 <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text>
                    Pararabens voce terminou o seu livro!!
                </Text>
                <Text>
                  Deseja marcar que finalizou?
                </Text>
              </View>
              <View style={{
                flexDirection: 'row'
              }}>
                      <TouchableOpacity style={{
                    backgroundColor: "#fff",
                    borderColor: "red",
                    border: 1,
                    padding: 12
                }}>
                        <Text style={{
                          color: "red"
                        }}>Não <AntDesign name="close" size={24} color="red" /></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => marcarFinalizacao()} style={{
                    backgroundColor: "#fff",
                    borderColor: "green",
                    border: 1,
                    padding: 12
                }}>
                        <Text style={{
                          color: "green"
                        }}>Sim <AntDesign name="check" size={24} color="green" /> </Text>
                </TouchableOpacity>
          
              </View>
            </View>
        </Modal>

    
        <View style={{
          backgroundColor: "#545454",
            flexDirection: 'row',
            padding: 15,
        }}>

  <TouchableOpacity onPress={goPrevious} style={styles.cardButton}>
    <AntDesign name="arrowleft" size={25} color="black" />            
  </TouchableOpacity>
  <TouchableOpacity onPress={goNext} style={styles.cardButton}>
    <AntDesign name="arrowright" size={25} color="black" />            
  </TouchableOpacity>

 

</View>
</SafeAreaView>
   

  
   
  );
}

const LeitorEpub = ({navigation, route}) => {


  return (
    <ReaderProvider>
      <EpubReader dadosLeitura={route.params.dadosLeituraUsuario}/>

      
    </ReaderProvider>
  );
}
const styles = StyleSheet.create({

  cardButton : {
    backgroundColor: "#ffffff",
    borderRadius: 50,
    padding: 20,
    marginLeft: 12,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#6200ee',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  reader: {
    flex: 1, // Faz o Reader ocupar o espaço restante
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 45,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    height: 80,
    paddingBottom: 25,
    borderRadius: 12,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: 250,
  },


});

export default LeitorEpub;