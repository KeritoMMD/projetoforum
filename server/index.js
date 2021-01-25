const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "admin",
    password: "ifsp@1234",
    database: "forum"
});

const port = process.env.PORT || 3001;  



//Usuarios

app.post("/api/insertUsuario", (req, res) => {
    
    const prontuario = req.body.prontuario;
    const nome = req.body.nome;
    const senha = req.body.senha;
    const tipo = req.body.tipo;

    const sqlInsert = "INSERT INTO usuarios (prontuario, senha, nomeUsuario, tipo) VALUES (?,md5(?),?,?)"
    
    db.query(sqlInsert, [prontuario, senha, nome, tipo], (err, results) => {

        res.send()
    });
    
})

app.post("/api/login", (req, res) => {
   
    const prontuario = req.body.prontuario;
    const senha = req.body.senha;

    const sqlSelect = "SELECT * FROM usuarios WHERE prontuario = ? AND senha = md5(?);"
    
    db.query(sqlSelect, [prontuario, senha], (err, results) => {
        res.send(results)
    });
    
})

app.get("/api/getUsuario/:id", (req, res) => {
   
    const idUsuario = req.params.id;

    const sqlSelect = "SELECT * FROM usuarios WHERE idUsuario = " + idUsuario
    
    db.query(sqlSelect, (err, results) => {
        res.send(results)
    });
    
})

app.put("/api/updateUsuario", (req, res) => {
   
    const prontuario = req.body.prontuario;
    const senha = req.body.senha;
    const idUsuario = req.body.idUsuario;
    const nome = req.body.nome;
    const tipo = req.body.tipo;

    const sqlUpdate = "UPDATE usuarios SET nomeUsuario = ?, prontuario = ?, tipo = ?, senha = md5(?) WHERE idUsuario = ?;"
    
    db.query(sqlUpdate, [nome, prontuario, tipo, senha, idUsuario], (err, results) => {
        res.send(results)
    });
    
})







//Cursos

app.post("/api/insertCurso", (req, res) => {
    
    const nome = req.body.nome;


    const sqlInsert = "INSERT INTO cursos (nomeCurso) VALUES (?)"
    
    db.query(sqlInsert, [nome], (err, results) => {

        res.send()
    });
    
})

app.get("/api/getCursos", (req, res) => {
   

    const sqlSelect = "SELECT * FROM cursos;"
    
    db.query(sqlSelect, (err, results) => {
        res.send(results)
    });
    
})

app.delete('/api/deleteCurso/:id', (req, res) => {
    const idCurso = req.params.id;


    const sqlDelete = "DELETE FROM cursos WHERE idCurso = " + idCurso

    db.query(sqlDelete, (err, results) => {

        res.send(results)
    });

})

app.put("/api/updateCurso", (req, res) => {
   
    const idCurso = req.body.idCurso;
    const nome = req.body.nome;


    const sqlUpdate = "UPDATE cursos SET nomeCurso = ? WHERE idCurso = ?;"
    
    db.query(sqlUpdate, [nome, idCurso], (err, results) => {

        res.send(results)
    });
    
})





//Tópicos

app.get("/api/getTopicos/:id", (req, res) => {
    const idCurso = req.params.id;

    const sqlSelect = "SELECT idTopico, idCurso, titulo, DATE_FORMAT(STR_TO_DATE(dataCriacao, '%Y-%m-%d'), '%d/%m/%Y') AS 'dataCriacao', descricao FROM topicos WHERE idCurso = " + idCurso
    
    db.query(sqlSelect, (err, results) => {
        res.send(results)
    });
    
})


app.post("/api/insertTopico", (req, res) => {
    
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    const idCurso = req.body.idCurso;

    const sqlInsert = "INSERT INTO topicos set idCurso = ?, titulo =?, dataCriacao = curdate(), descricao = ?";
    
    db.query(sqlInsert, [idCurso, titulo, descricao], (err, results) => {

        res.send()
    });
    
})


app.put("/api/updateTopico", (req, res) => {
   
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    const idTopico = req.body.idTopico;

    const sqlUpdate = "UPDATE topicos SET titulo = ?, descricao = ? WHERE idTopico = ?;"
    
    db.query(sqlUpdate, [titulo, descricao, idTopico], (err, results) => {

        res.send(results)
    });
    
})


app.delete('/api/deleteTopico/:id', (req, res) => {
    const idTopico = req.params.id;


    const sqlDelete = "DELETE FROM topicos WHERE idTopico = " + idTopico

    db.query(sqlDelete, (err, results) => {

        res.send(results)
    });

})


//Mensagens

app.get("/api/getMensagens/:id", (req, res) => {
    const idTopico = req.params.id;

    const sqlSelect = "SELECT u.nomeUsuario, m.*, DATE_FORMAT(STR_TO_DATE(m.dataCriacao, '%Y-%m-%d'), '%d/%m/%Y') AS 'dataCriacaom' FROM mensagens m, usuarios u WHERE m.idTopico= " + idTopico + 
    " AND m.idUsuario = u.idUsuario ORDER BY m.idMensagem ASC";
    
    db.query(sqlSelect, (err, results) => {
        res.send(results)
    });
    
})

app.post("/api/insertMensagem", (req, res) => {
    
    const mensagem = req.body.mensagem;
    const idTopico = req.body.idTopico;
    const idUsuario = req.body.idUsuario;

    const sqlInsert = "INSERT INTO mensagens set idUsuario = ?, idTopico =?, dataCriacao = curdate(), conteudo = ?";
    
    db.query(sqlInsert, [idUsuario, idTopico, mensagem], (err, results) => {

        res.send()
    });
    
})

app.delete('/api/deleteMensagem/:id', (req, res) => {
    const idMensagem = req.params.id;


    const sqlDelete = "DELETE FROM mensagens WHERE idMensagem = " + idMensagem

    db.query(sqlDelete, (err, results) => {

        res.send(results)
    });

})




app.listen(port, () => {
    console.log("Running on port " + port);
})