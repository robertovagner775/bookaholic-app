import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

const Input = ({styleError,  ...props }) => {
  const [sec, setSec] = useState(props.secureTextEntry);
   const [color, setColor] = useState("black");

  useEffect(() => {
    if(styleError !== undefined) {
      setColor("#ff3333")
    } else {
      setColor("black")
    }

  }, [styleError]); 

  const setValor = (text) => {
    props.getValor(text, props.placeholder)
  }


  return (
    <View style={styles.container}>
      <TextInput
        placeholder={props.placeholder}
        style={StyleSheet.flatten([styles.input, styleError])}
        onChangeText={setValor}
        underlineColorAndroid="transparent"
        {...props}
        secureTextEntry={sec}
      />
     
     <MaterialCommunityIcons name={props.iconName} size={24} color={color} style={styles.icon} />
      
      {props.secureTextEntry && (
         <TouchableOpacity onPress={()=>setSec(!sec)}>
        <AntDesign name="eye" size={24} color="black" style={styles.iconSecret}/>
        </TouchableOpacity>
      )}
    
    </View> 
  );
};

const InputSenha = () => {
     return (
    <View style={styles.container}>
      <TextInput
        placeholder={text}
        style={styles.input}
        underlineColorAndroid="transparent"
      />
   
  
    </View> 
  );
}
  
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 275,
  },
  input: {
   
    height: 50,
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 40,
    borderRadius: 6,
 
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 1,
  },
  icon: {
    position: "absolute",
    top: 15,
    left: 12,
  },
  iconSecret: {
    position: "absolute",
    top: 15,
    right: 12,
  },
});

export default Input;
