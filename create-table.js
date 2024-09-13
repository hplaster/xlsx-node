import { sql } from './db.js'

sql`
    CREATE TABLE operacoes (
        Date 
        Open
        High
        Low
        'Close*'
        'Adj Close**'
        Volume
    )
`
