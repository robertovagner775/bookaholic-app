import {SafeAreaView,StyleSheet, TouchableOpacity, View, Modal ,Text,TextInput, Button, Picker} from 'react-native';
import { createTable, saveProgress, loadProgress, createAnnotation, loadAnotations } from '../database/database'; // Ajuste o caminho conforme necessário
 // Ajuste o caminho conforme necessário
 import { useFocusEffect } from '@react-navigation/native';
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

 
   const {goPrevious, goNext, goToLocation, isLoading, readerRef, currentLocation} = useReader({
      src: dadosLeitura.livro.pathEpub,
      fileSystem: true,
      locations: 1000,
   });

 
  const [location, setLocation] = useState(null);
  const [lastLocation, setLastLocation] = useState(null);
  
      

  useEffect(()  => {
    fetchProgress()
  }, []);
  
  const  fetchProgress = async () => { 

    const savedLocation = await loadProgress(dadosLeitura.idusuario , dadosLeitura.livro.id);
    setLastLocation(savedLocation.localLivro)

    const annotation = await loadAnotations(dadosLeitura.idusuario, dadosLeitura.livro.id);
    setAnnotations(annotation)
    console.log(annotation)

  }
  
  const saveAnnotation = async () => {
    createTable()

    const pageNumber = currentLocation.start.index; 
    const cfi = currentLocation.start.cfi;

    createAnnotation(dadosLeitura.idusuario, dadosLeitura.livro.id, description , cfi,pageNumber)


  };

  
 
 




 

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
          <View style={{
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
                <CardAnotacao />
                <CardAnotacao />
                <CardAnotacao />
                <CardAnotacao />


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