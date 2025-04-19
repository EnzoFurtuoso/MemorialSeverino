const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'memorial'
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Criar tabela se não existir
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS depoimentos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        mensagem TEXT NOT NULL
    )
`;

    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Erro ao criar tabela: ' + err.message);
        } else {
            console.log('Tabela "depoimentos" criada ou já existe.');
        }
    });

   // Rota para salvar depoimentos
// Rota para salvar depoimentos
app.post('/depoimentos', (req, res) => {
    const { nome, mensagem } = req.body;

    if (!nome || !mensagem) {
        return res.status(400).json({
            error: 'Nome e mensagem são obrigatórios.'
        });
    }

    const query = `INSERT INTO depoimentos (nome, mensagem) VALUES (?, ?)`;
    db.query(query, [nome, mensagem], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: 'Erro ao salvar depoimento: ' + err.message
            });
        }

        res.status(201).json({
            id: results.insertId,
            nome,
            mensagem
        });
    });
});

// Rota para listar depoimentos
app.get('/depoimentos', (req, res) => {
    const query = `SELECT * FROM depoimentos`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: 'Erro ao buscar depoimentos: ' + err.message
            });
        }
        res.json(results);
    });
});

//Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})