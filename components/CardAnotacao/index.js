import { Text, StyleSheet,Modal, View, Image, TouchableOpacity, Button } from 'react-native';
import {useState, useEffect} from 'react';
import { createTable, saveProgress, loadProgress } from './../../database/database'; // Ajuste o caminho conforme necessário

import * as SecureStore from 'expo-secure-store';
import StarRating from 'react-native-star-rating-widget';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

 const CardAnotacao = () => {
     return(
      <TouchableOpacity  style={styles.container} >
        <View style={styles.cardTitulo}>
            <Text style={styles.titulo}>anotacao teste</Text>
            <Text style={styles.titulo}>Pag 10</Text>
        </View>
        <View>
            <Text style={styles.descricaoAnotacao}>essa e uma anotação da pagina tal a tal</Text>
        </View>
      </TouchableOpacity>
     )
};

const styles = StyleSheet.create({


    container : {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        elevation: 5,
    },
    titulo : {
        fontWeight: 'bold',
        fontSize: 20,
    },  
    cardTitulo : {
        justifyContent: "space-between",
        flexDirection: "row"
    },  
    descricaoAnotacao : {
        color: 'gray',
        fontSize: 15,

    }

});


export default CardAnotacao;