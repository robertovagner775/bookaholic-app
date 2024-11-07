import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import InputSearch from '../components/InputSearch';
import CardBook from '../components/CardBook';
import Api from '../components/Api';

import { SimpleLineIcons } from '@expo/vector-icons';

const CATEGORIES = [
  { id: '1', name: 'Terror' },
  { id: '2', name: 'Fantasia' },
  { id: '3', name: 'Romance' },
  { id: '4', name: 'Ficção Científica' },
  { id: '5', name: 'Aventura' },
];

const trendingBooks = [
  { id: '1', title: 'O Poder do Hábito', cover: { uri: 'https://m.media-amazon.com/images/I/815iPX0SgkL._AC_UF1000,1000_QL80_.jpg' }, page: 'LivroPoderHabito' },
  { id: '2', title: 'Entendendo Algoritmos', cover: { uri: 'https://m.media-amazon.com/images/I/71Vkg7GfPFL._AC_UF1000,1000_QL80_.jpg' }, page: 'LivroAlgoritmos' },
  { id: '3', title: 'A Revolução dos Bichos', cover: { uri: 'https://m.media-amazon.com/images/I/91BsZhxCRjL._AC_UF1000,1000_QL80_.jpg' }, page: 'LivroRevolucao' },
  { id: '4', title: 'A Arte da Guerra', cover: { uri: 'https://sebodamata.com.br/wp-content/uploads/2021/05/aartedaguerra_suntzu.jpg' }, page: 'LivroArteGuerra' },
];

export default function Search({ navigation, route }) {
  const [searchTerm, setSearchTerm] = useState(route.params?.value || '');


  const [filterGoodBooks, setFilteredGoodBooks] = useState(listMelhorLivros);
  const [filterBooks, setFilteredBooks] = useState(listLivro);

  const [listLivro, setListLivro] = useState([]);
      const [listMelhorLivros, setListMelhorLivros] = useState([]);

      useEffect(() => {
        const getLivroColunaUm =  async () => {
          const  {data} = await Api.get("/livros/melhores-livros");
          setListMelhorLivros(data)
        }
        getLivroColunaUm()
      }, []);
      useEffect(() => {
      const getLivroColunaDois =  async () => {
        const  {data} = await Api.get("/livros/imagens");
        setListLivro(data)
      }
      getLivroColunaDois()
    }, []);



  useEffect(() => {
    if (route.params?.value) {
      setSearchTerm(route.params.value);
    }
  }, [route.params]);

  
  
  useEffect(() => {
    const books = listLivro.filter(book =>
      book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    
    const booksGood = listMelhorLivros.filter(book =>
      book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setListLivro(books);
    setListMelhorLivros(booksGood)

  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Image style={styles.logo} source={require('../assets/imgs/bookaholic.png')} />
        <InputSearch placeholder="Pesquise um Livro" onChangeText={setSearchTerm} value={searchTerm} />
        <SimpleLineIcons name="menu" size={30} color="black" onPress={() => navigation.openDrawer()} />
      </View>

      <ScrollView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mais Bem Avaliados</Text>
          <FlatList
            data={listMelhorLivros}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardBook itemSet={item} />
              /*
              <TouchableOpacity
                style={styles.bookItem}
           
              >
                <View style={styles.bookWrapper}>
                  <Image source={item.cover} style={styles.bookCover} />
                  <Text style={styles.bookTitle}>{item.title}</Text>
                  <Text style={styles.bookRating}>★★★★☆</Text>
                </View>
              </TouchableOpacity>

              */
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>



        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ultimos Adicionados</Text>
          <FlatList
            data={listLivro}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <CardBook itemSet={item} />
              /*
              <TouchableOpacity
                style={styles.bookItem}
           
              >
                <View style={styles.bookWrapper}>
                  <Image source={item.cover} style={styles.bookCover} />
                  <Text style={styles.bookTitle}>{item.title}</Text>
                  <Text style={styles.bookRating}>★★★★☆</Text>
                </View>
              </TouchableOpacity>

              */


            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
    marginTop: 60,
  },
  containerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  logo: {
    width: 75,
    height: 75,
  },
  section: {
    marginTop: 20,
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookWrapper: {
    alignItems: 'center',
    marginRight: 15,
  },
  bookItem: {
    justifyContent: 'center',
  },
  bookCover: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  bookTitle: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 100,
  },
  bookRating: {
    marginTop: 5,
    textAlign: 'center',
  },
  categoryItem: {
    backgroundColor: '#e1e1e1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
  },
});