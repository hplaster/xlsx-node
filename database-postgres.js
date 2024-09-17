import { sql } from './db.js';
import { randomUUID } from 'node:crypto';

export class DatabasePostgres {
    async list() {
        let transacao

        /*
        if (search) {
            transacao = await sql`SELECT * FROM yahoo_transacoes WHERE Date ILIKE ${'%'+search+'%'}`
        } else {
                */transacao = await sql`SELECT * FROM yahoo_transacoes`/*
        }
        console.log(transacao)*/
        return transacao
    }

    async create(Date, Open, High, Low, Close, AdjClose, Volume) {
        //const TransactionID = randomUUID()

        await sql`INSERT INTO yahoo_transacoes ( Date, Open, High, Low, Close, AdjClose, Volume ) VALUES ( ${Date}, ${Open}, ${High}, ${Low}, ${Close}, ${AdjClose}, ${Volume} )`

    }

    async update(id, ) {
        
    }

    async delete(id) {
        
    }
}
