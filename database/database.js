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
  console.log(result.lastInsertRowId, result.changes);
};

const  createAnnotation = async (idusuario, idlivro, anotacao, localLivro, pag ) => {
  const result = await db.runAsync('INSERT INTO anotacao (idusuario, idlivro, anotacao, cfi, pagina) VALUES (?, ?, ?, ?, ?)',idusuario, idlivro, anotacao, localLivro, pag);
  console.log(result.lastInsertRowId, result.changes);
};

const loadAnotations = async (userId, bookId) => {
  const allRows  = await db.getAllAsync('SELECT * FROM anotacao WHERE idusuario = ? AND idlivro = ?', userId, bookId);
  return allRows
}

const loadProgress = async (userId, bookId) => {
 // const result = await db.getAllAsync('SELECT location FROM progresso WHERE idusuario = ? AND idlivro = ? LIMIT 1', userId, bookId);

  //return result.rows[0]['location']

  const allRows  = await db.getFirstAsync('SELECT * FROM progressoLeitura WHERE idusuario = ? AND idlivro = ? ORDER BY id DESC LIMIT 1', userId, bookId);
  return allRows

};


export { createTable, saveProgress, loadProgress, createAnnotation, loadAnotations};