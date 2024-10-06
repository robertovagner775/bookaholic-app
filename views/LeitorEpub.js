import {SafeAreaView,StyleSheet, TouchableOpacity, View, Text, Picker} from 'react-native';

import { useRef, useState, useEffect } from 'react';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Header } from './../components/Header';
import { Reader, useReader, ReaderProvider,   Themes,} from '@epubjs-react-native/core';



import { useFileSystem } from '@epubjs-react-native/expo-file-system';


const  EpubReader = () => {



    const bucketName = "bookaholic-504c7.appspot.com";
    const filePath = "epub/livro-test.epub";
    const encodedFilePath = encodeURIComponent(filePath);
    const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodedFilePath}?alt=media`;
   const readerRef = useRef(null);
   const {goPrevious, goNext} = useReader();
   const [position, setPosition] = useState();

   const handleLocationChanged = (position) => {
      setPosition(position);
   }


  return (
    
     
        <SafeAreaView style={{
          flex: 1,
          paddingTop: 50,
          backgroundColor: "#545454"
        }}>

       

      <Header />
      
           <Reader
            
              src="https://firebasestorage.googleapis.com/v0/b/bookaholic-504c7.appspot.com/o/epub%2Flivro-test.epub?alt=media"
              fileSystem={useFileSystem}
               defaultTheme={Themes.DARK}
              onLocationChanged={handleLocationChanged}

             
            />
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

const LeitorEpub = () => {
  return (
    <ReaderProvider>
      <EpubReader />
    </ReaderProvider>
  );
}
const styles = StyleSheet.create({

  cardButton : {
    backgroundColor: "#ffffff",
    borderRadius: 50,
    padding: 20,
    marginLeft: 12
  }

});

export default LeitorEpub;