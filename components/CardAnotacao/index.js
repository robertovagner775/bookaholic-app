import { Text, StyleSheet,Modal, View, Image, TouchableOpacity, Button } from 'react-native';
import {useState, useEffect} from 'react';
import { createTable, saveProgress, loadProgress, deleteAnnotation } from './../../database/database'; // Ajuste o caminho conforme necessário
import Fontisto from '@expo/vector-icons/Fontisto';

import * as SecureStore from 'expo-secure-store';
import StarRating from 'react-native-star-rating-widget';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

 const CardAnotacao = ({anotacao, removeAnotacao, index, goToPosition}) => {
    const removerAnotacaoArray = () => {

        deleteAnnotation(anotacao.id);
        removeAnotacao(anotacao)
    }


     return(
      <TouchableOpacity style={styles.container} onPress={() => goToPosition(anotacao.cfi)}>
        <View style={{
            flex: 1
        }}>
            <View style={styles.cardTitulo}>
                <Text style={styles.titulo}>Anotação</Text>
                <Text style={styles.pagina}>Página {anotacao.pagina}</Text>
            </View>
            <View>
                <Text style={styles.descricaoAnotacao}>{anotacao.anotacao}</Text>
            </View>
        </View>
        <TouchableOpacity style={styles.CtBtnExcluir} onPress={() => removerAnotacaoArray()}>
                  <Fontisto name="trash" size={24} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
     )
};

const styles = StyleSheet.create({


    container : {
        backgroundColor: "#fff",
        padding: 12,
        elevation: 5,
        flexDirection: 'row'
    },
    titulo : {
        fontWeight: 'bold',
        fontSize: 20,
    },  
    pagina : {
        fontSize: 16
    },
    cardTitulo : {
        justifyContent: "space-between",
        flexDirection: "row"
    },  
    descricaoAnotacao : {
        color: 'gray',
        fontSize: 15,

    },
    CtBtnExcluir : {
        marginLeft: 6,
        justifyContent: 'center',
        alignItems: 'center'
    }

});


export default CardAnotacao;