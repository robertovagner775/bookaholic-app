/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { createTable, saveProgress, loadProgress } from '../../database/database';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Themes, useReader } from '@epubjs-react-native/core';
import { IconButton } from 'react-native-paper';

const THEMES = Object.values(Themes);

export function Header({dadosLeitura, current, onAddAnnotation, onViewAnnotation}) {
  const navigation = useNavigation();
  const { changeTheme, theme } = useReader();

  const salvarProgresso = () => {

    saveProgress(dadosLeitura.idusuario, dadosLeitura.livro.id , current.end.cfi, current.end.percentage)

    navigation.goBack()
  }
  const switchTheme = () => {
    const index = Object.values(THEMES).indexOf(theme);
    const nextTheme =
      Object.values(THEMES)[(index + 1) % Object.values(THEMES).length];

    changeTheme(nextTheme);
  };
  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        size={22}
        onPress={() => salvarProgresso()}
      />


      <View style={styles.actions}>
      <TouchableOpacity style={styles.buttonAction} onPress={onViewAnnotation}> 
        <Ionicons name="newspaper-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonAction} onPress={onAddAnnotation}>
      <FontAwesome name="pencil-square-o" size={24} color="black" />
      </TouchableOpacity >
        <TouchableOpacity style={styles.buttonAction} onPress={switchTheme}>
          <View
            style={{
              ...styles.themeIcon,
              backgroundColor: theme.body.background,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  themeIcon: {
    width: 24,
    height: 24,
    borderRadius: 32,
    borderColor: '#000',
    borderWidth: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  buttonAction: {
    marginLeft: 16
  }
});