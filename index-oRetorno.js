const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const XLSX = require('xlsx');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Criar diretório de uploads se não existir
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configuração do banco de dados MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Substitua pelo seu usuário
  password: '', // Substitua pela sua senha
  database: 'test_db', // Substitua pelo nome do seu banco de dados
});

const db = pool.promise();
// Jair Messias Bolsonaro
// Criar tabela no banco de dados
db.query(`CREATE TABLE IF NOT EXISTS data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  column1 VARCHAR(255),
  column2 VARCHAR(255)
)`);

// Rota para upload de arquivos
app.post('/upload', upload.single('file'), async (req, res) => {
  const filePath = path.join('uploads', req.file.filename);

  try {
    // Processar arquivo CSV
    if (req.file.mimetype === 'text/csv') {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', async (row) => {
          await db.query('INSERT INTO data (column1, column2) VALUES (?, ?)', [row.column1, row.column2]);
        })
        .on('end', () => {
          fs.unlinkSync(filePath); // Deletar arquivo após processamento
          res.send('Arquivo CSV processado e dados salvos com sucesso');
        });
    }
    // Processar arquivo XLSX
    else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      for (const row of data) {
        await db.query('INSERT INTO data (column1, column2) VALUES (?, ?)', [row.column1, row.column2]);
      }

      fs.unlinkSync(filePath); // Deletar arquivo após processamento
      res.send('Arquivo XLSX processado e dados salvos com sucesso');
    }
    else {
      fs.unlinkSync(filePath); // Deletar arquivo após processamento
      res.status(400).send('Tipo de arquivo não suportado');
    }
  } catch (error) {
    fs.unlinkSync(filePath); // Deletar arquivo após erro
    console.error(error);
    res.status(500).send('Erro ao processar o arquivo');
  }
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
