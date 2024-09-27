import reader from 'xlsx';
import { DatabasePostgres } from './database-postgres.js';
//import csv from 'csv-parser';

const database = new DatabasePostgres()
/*
const file = reader.readFile('./planilha_reduzida.xlsx');
const sheets = file.SheetNames;

for (let i = 0; i < sheets.length; i++) {
    const data = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    //let contador = 0
    data.forEach(async (res) => {
        //console.log(res)
        //contador++
/*        console.log(res.Date)
        console.log(res.Open)
        console.log(res.High)
        console.log(res.Low)
        console.log(res.Close)
        console.log(res.AdjClose)
        console.log(res.Volume)*/
/*        await database.create(res.Date, res.Open, res.High, res.Low, res.Close, res.AdjClose, res.Volume)
        //console.log(contador)
    })
}*/


//console.log(database.list())
await database.createTeste("seila4")
await database.createTeste("seila5")
await database.createTeste("seila-oRetorno2")
