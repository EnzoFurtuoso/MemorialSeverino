const express = require('express');
const api = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'memorial'
});

db.connect((err) => {
    if(err) {
    console.log('Erro ao conectar ao banco de dados: ', err);
    return
    }
    console.log('Conectado ao banco de dados');
});

api.post('/messages', (req, res) => {
    const message = req.body;

    const query = 'INSERT INTO messages SET ?';
    db.query(query, message, (err, result) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.send({
                message: 'Mensagem enviada com sucesso!',
                id: result.insertId
            })
        }
    })

    api.get('/messages', req, res => {
        const query = 'SELECT * FROM messages';
        db.query(query, (err, results) => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(results);
            }
        })
    })

    api.get('/messages/:id', (req, res) => {
        const id = req.params.id;
        const query = 'SELECT * FROM messages WHERE id =?';
        db.query(query, id, (err, result) => {
            if(err) {
                res.status(404).send(err);
            } else {
                res.send(result);
            }
        })
    })

    api.put('/messages/:id', (req, res) => {
        const id = req.params.id;
        const message = req.body;
        const query = 'UPDATE messages SET ? WHERE id = ?';

        db.query(query, [message.id], (err, result) => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send({
                    message: 'Mensagem atualizada com sucesso!'
                })
            }
        });
    });

    api.delete('/messages/:id', (req, res) => {
        const id = req.params.id;
        const query = 'DELETE FROM messages WHERE id = ?';
        db.query(query, id, (err, result) => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send({
                    message: 'Mensagem excluída com sucesso!'
                })
            }
        });
    });
    api.listen(3000, () => {
    console.log('API rodando na porta 3000');
});

});