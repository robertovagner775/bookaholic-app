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


export default function Bibliote({navigation, route}){

    return(
    <View>

        <View>
            <View>
                 <Image style={styles.logo} source={require('../assets/imgs/bookaholic.png')} />
            </View>

            <View>
                <Text>Assinatura do BookAholic</Text>
                <Text>Mensal</Text>
            </View>
            <View>
                <Text>R$12,00</Text>
                
            </View>
        </View>
    </View>
    )
}
const styles = StyleSheet.create({

  
});