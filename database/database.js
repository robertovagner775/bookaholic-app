import { all } from 'axios';
import * as SQLite from 'expo-sqlite';
import React, { useState, useEffect } from 'react';


const db = SQLite.openDatabaseSync('progressoLeitura.db');


const createTable = async () => {
 await db.execAsync(
      `CREATE TABLE IF NOT EXISTS progressoLeitura (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        idusuario INTEGER, 
        idlivro INTEGER, 
        localLivro TEXT,
        porcentagem REAL
      )`,)
      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS anotacao (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          idusuario INTEGER, 
          idlivro INTEGER, 
          anotacao TEXT,
          cfi TEXT,
          pagina INTEGER
        )`,)
}
const saveProgress = async (userId, bookId, location, percentage) => {
  const result = await db.runAsync('INSERT INTO progressoLeitura (idusuario, idlivro, localLivro, porcentagem) VALUES (?, ?, ?, ?)',userId, bookId, location, percentage);

};
const  createAnnotation = async (idusuario, idlivro, anotacao, localLivro, pag ) => {
  const result = await db.runAsync('INSERT INTO anotacao (idusuario, idlivro, anotacao, cfi, pagina) VALUES (?, ?, ?, ?, ?)',idusuario, idlivro, anotacao, localLivro, pag);

};
const loadAnotations = async (userId, bookId) => {
  const allRows  = await db.getAllAsync('SELECT * FROM anotacao WHERE idusuario = ? AND idlivro = ?', userId, bookId);
  return allRows
}
const loadProgress = async (userId, bookId) => {
  const allRows  = await db.getFirstAsync('SELECT * FROM progressoLeitura WHERE idusuario = ? AND idlivro = ? ORDER BY id DESC LIMIT 1', userId, bookId);
  return allRows
};
const deleteAnnotation = async (idanotacao) => {
  const  deleteFromId = await db.runAsync('DELETE FROM anotacao WHERE id = ?', idanotacao);
}


const verificaFinalizado = async (idusuario, idlivro) => {
    const result = await db.getAllAsync("SELECT * FROM progressoLeitura WHERE idlivro = ? and idusuario = ? and dataFinalizacao IS NOT NULL ", idlivro, idusuario)
    if(result.length === 0) {
      return true;
    } else {
      return false;
    }

 
}

const getDadosFinalizados =  async () => {
  const result = await db.getAllAsync("SELECT DISTINCT idlivro, dataFinalizacao FROM progressoLeitura WHERE dataFinalizacao IS NOT NULL")
  return result
}

const atualizaFinalizado = async (idusuario, idlivro) => {
  const result = await db.getFirstAsync("SELECT * FROM progressoLeitura WHERE idlivro = ? and idusuario = ? ORDER BY id DESC", idlivro, idusuario)
  const dataAtual = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const resultRow  =  await db.runAsync('UPDATE progressoLeitura SET dataFinalizacao=? WHERE id = ?', dataAtual,  result.id)
}

const dadosGrafico = async () => {
  try {
    // pega o prograsso mais recente 
    const resultRecord = await getLastProgressIds();

    //realiza o calculo dos status
    const dados = calculateBookStatus(resultRecord);

    //contabiliza os valores
    let emAndamento = 0;
    let finalizado = 0;
    let semAcesso = 0;
    dados.forEach((dado) => {
        if(dado.status == "Em Andamento") {
          emAndamento += 1;
        } else if (dado.status == "Finalizado") {
          finalizado += 1;
        } else {
          semAcesso += 1;
        }
    })

    // monta o array de grafico de pizza com os dados referente aos status
  
    let arrayStatus = [
      { name : "em Andamento", population : emAndamento, color: '#ff6384'},
      {name : "finalizado", population : finalizado, color: '#36a2eb'},
      {name : "sem Acesso", population : semAcesso, color: '#ffce56' }
    ]




   return arrayStatus
    
  } catch (error) {
    console.error('Erro ao obter dados para o gráfico:', error);
  }
};
const getLastProgressIds = async () => {



    const result = await db.getAllAsync(`
      SELECT idLivro , porcentagem, MAX(id) AS ultimoID FROM progressoLeitura pl GROUP BY idLivro
    `);

    return result

}


function calculateBookStatus(records) {
  const bookStatus = {}; // Armazena os status de cada livro

  // Log dos registros para depuração


  // Itera sobre cada registro retornado
  records.forEach(record => {

    // Verifica se o campo idLivro está presente
    if (!record.idlivro) {

      return;
    }

    // Inicializa o status do livro, se não existir ainda
    if (!bookStatus[record.idlivro]) {
      bookStatus[record.idlivro] = {
        status: 'Sem Acesso',
        porcentagemMaxima: 0
      };
    }

    // Atualiza a porcentagem máxima encontrada para o livro
    if (record.porcentagem > bookStatus[record.idlivro].porcentagemMaxima) {
      bookStatus[record.idlivro].porcentagemMaxima = record.porcentagem;
    }

    // Define o status com base na porcentagem
    if (bookStatus[record.idlivro].porcentagemMaxima === 1) {
      bookStatus[record.idlivro].status = 'Finalizado';
    } else if (bookStatus[record.idlivro].porcentagemMaxima > 0) {
      bookStatus[record.idlivro].status = 'Em Andamento';
    }

    // Log do status do livro atualizado

  });

  // Transforma o objeto bookStatus em um array de objetos com idLivro e status
  const resultado = Object.entries(bookStatus).map(([idlivro, { status }]) => ({
    idlivro,
    status
  }));

  // Log do resultado final para depuração

  return resultado;
}
export { createTable, saveProgress, loadProgress, createAnnotation, loadAnotations, deleteAnnotation, dadosGrafico, verificaFinalizado, atualizaFinalizado, getDadosFinalizados};