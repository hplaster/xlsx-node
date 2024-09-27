import { sql } from './db.js'

(async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS teste (
        StoreID SERIAL,
        nome VARCHAR(255)
        -- AreaStore VARCHAR(255),
        -- Property VARCHAR(255),
        -- Type VARCHAR(255),
        -- Old_New VARCHAR(255),
        -- CheckoutNumber VARCHAR(255),
        -- Revenue VARCHAR(255)
      );
    `;
    console.log('Tabela criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar a tabela:', err);
  } finally {
    await sql.end();
  }
})();

(async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS yahoo_transacoes (
        Date VARCHAR(255),
        Open DECIMAL,
        High DECIMAL,
        Low DECIMAL,
        Close DECIMAL,
        AdjClose DECIMAL,
        Volume INT
      );
    `;
    console.log('Tabela criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar a tabela:', err);
  } finally {
    await sql.end();
  }
})();
