import React, {useEffect, useState} from 'react';
import { Text, StyleSheet, ScrollView, Dimensions, View } from 'react-native';
import { PieChart, BarChart, LineChart } from 'react-native-chart-kit';
import { dadosGrafico, getDadosFinalizados } from '../database/database'; // Ajuste o caminho conforme necessário
import { TouchableOpacity } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';

export default function GraficosDeLeitura({ navigation, route }) {
  


  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  
  useEffect(() => {
    const generateChartData = (bookData) => {
      const monthNames = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
      ];

      const currentDate = new Date();
      let lastFourMonths = [];


      for (let i = 3; i >= 0; i--) {
        const monthIndex = (currentDate.getMonth() - i + 12) % 12;
        const monthName = monthNames[monthIndex];
        lastFourMonths.push({
          name: monthName,
          population: 0,
        });
      }


      bookData.forEach(book => {
        const finalizationDate = new Date(book.dataFinalizacao);
        const monthName = monthNames[finalizationDate.getMonth()];

 
        const monthData = lastFourMonths.find(month => month.name === monthName);
        if (monthData && finalizationDate.getFullYear() === currentDate.getFullYear()) {
          monthData.population++;
        }
      });


      const labels = lastFourMonths.map(month => month.name);
      const data = lastFourMonths.map(month => month.population);

      return {
        labels,
        datasets: [
          {
            data,
          },
        ],
      };
    };

 
    const fetchAndSetChartData = async () => {
      try {
        const bookData = await getDadosFinalizados();
        const formattedData = generateChartData(bookData);
        setChartData(formattedData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchAndSetChartData();
  }, []);

  const [dataSet, setData] = useState([]);
  const [dataLine, setDataLine] = useState({});



  useEffect(() =>  {
      const getDadosGraficoLinha = async () => {
        const result =  await getDadosFinalizados();
        console.log(result)
        const dados = getLastFourMonthsChartData(result);
       setDataLine(dados)
      }
      getDadosGraficoLinha()
    },  [])
     


  useEffect(() => {
    const getDados  = async () => {
      const dados = await dadosGrafico()
  
      setData(dados)
      console.log(dados)
    }
    getDados()
  }, [])



  return (
    <ScrollView style={styles.container}>

      <View style={{
        marginTop: 36
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
           <FontAwesome5 name="arrow-left" size={24} color="black" /> 
        </TouchableOpacity>
      </View>


      <Text style={styles.titulo}>Veja o seu Progresso de Leitura!</Text>
      
      <Text style={styles.subTitulo}>Status das Leituras no Momento</Text>
      <PieChart
        data={dataSet}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={styles.chart}
        accessor="population"
        backgroundColor="#fff"
        paddingLeft="15"
      />
      
      <Text style={styles.subTitulo}>Livros Finalizados Nos Ultimos Mêses</Text>
      <BarChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          elevation: 5,
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={styles.chart}
      />
      
      
  
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e64529',
  },
  titulo: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  subTitulo: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 4,
    marginVertical: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,

  },
});