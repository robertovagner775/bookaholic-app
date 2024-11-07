
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardUser from '../CardUser';

const DrawerModal = ({ isVisible, closeDrawer, usuario, dadosLeitura }) => {
  const screenWidth = Dimensions.get('window').width;
  const slideAnim = new Animated.Value(-screenWidth); 



  const openDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: 0, 
      duration: 300, 
      useNativeDriver: true,
    }).start();
  };

  const close = () => {
    Animated.timing(slideAnim, {
      toValue: -screenWidth, 
      duration: 300,
      useNativeDriver: true,
    }).start(() => closeDrawer());
  };

  if (isVisible) {
    openDrawer();
  }

  return (
    <Modal visible={isVisible} transparent={true} animationType="none">
      <TouchableOpacity style={styles.overlay} onPress={close} />
      <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
   
        {usuario && (
          <View>
            <Text>{usuario.username}</Text> 
            <TouchableOpacity style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Informacoes de leitura</Text>
            </TouchableOpacity>
          </View>
        )}

            <CardUser />
            <TouchableOpacity style={styles.itemMenu}>
                  <MaterialCommunityIcons name="view-dashboard" size={24} color="#F01624" />
                <Text style={{
                  color: "#F01624",
                  
                }}>Informacoes de leitura</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemMenu}>
                  <MaterialCommunityIcons name="view-dashboard" size={24} color="#F01624" />
                <Text style={{
                  color: "#F01624",
                  
                }}>Sobre</Text>
            </TouchableOpacity>
        <TouchableOpacity onPress={close} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Fechar</Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '75%', // Largura do drawer
    backgroundColor: '#fff',
    padding: 20,
    elevation: 5,
  },
  drawerText: {
    fontSize: 18,
    marginBottom: 20,
  
  },
  itemMenu : {
  width: '100%',
   borderRadius: 5,
   justifyContent: "space-between",
   alignItems: "space-between",
   flexDirection: "row",
   padding: 10,
   color: "#F01624",
   backgroundColor: "#fff",
   borderColor: "#F01624",  
   borderWidth: 2,
  },
  closeButton: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});


export default DrawerModal;