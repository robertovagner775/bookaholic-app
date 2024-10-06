import { StyleSheet, FlatList, Dimensions} from 'react-native';
import CardCategoria from '../CardCategoria';

import {useState, useEffect, useRef} from 'react';

const Carousel = (props) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const scrollAndScheduleNext = () => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % props.dataSet.length;
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }
        setTimeout(scrollAndScheduleNext, 3000); // Re-agendar o próximo
        return nextIndex;
      });
    };

    scrollAndScheduleNext(); // Iniciar o ciclo

    // Limpeza opcional: Pode ser difícil interromper a cadeia de timeouts, mas é bom ter uma abordagem.


  }, []);

  return (
      <FlatList
        
          data={props.dataSet}
          keyExtractor={(item) => item.id}
          style={{margin: 20}}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          extraData={currentIndex}
       
          renderItem={({item}) => <CardCategoria item={item} navigation={props.navigation}/>}

       />
  );
};
const styles = StyleSheet.create({

 
});

export default Carousel;