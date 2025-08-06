import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Sobre({navigation}) {
  return (
    <View style={styles.container}>
      <Image style={styles.logoLarge} source={require('../assets/imgs/bookaholic.png')} />

      {/* Sobre Nós */}
      <Text style={styles.title}>SOBRE NÓS</Text>
      <Text style={styles.description}>
        O Bookaholic é uma plataforma criada para tornar a leitura acessível e prazerosa.
        Valorizamos a cultura literária, conectando pessoas que amam explorar novas histórias.
        Nossa missão é oferecer uma experiência dinâmica e envolvente, promovendo o hábito da leitura.
      </Text>
      
      {/* Desenvolvedores */}
      <Text style={styles.developers}>
        Desenvolvedores:
        {"\n"}Nicoly de Lima
        {"\n"}Roberto Vagner
        {"\n"}Victor Santiago
        {"\n"}Vivian Tiné
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f1f1',
    paddingHorizontal: 20,
  },
  logoLarge: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
    lineHeight: 24,
  },
  developers: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});