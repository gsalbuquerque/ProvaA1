const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const porta = 3000;
app.set("port", porta);

let contador = 1;

const clientes = [
  {
    id: 1,
    nome: "Gustavo Albuquerque",
    endereco: "Caucaia Do Alto",
    cidade: "Cotia",
  },
];

app.get("/cliente", (req, res, next) => {
  res.send(clientes);
});

app.post("/cliente", (req, res, next) => {
  const cliente = req.body;
  clientes.push({
    id: (contador += 1),
    nome: cliente.nome,
    endereco: cliente.endereco,
    cidade: cliente.cidade,
  });
  console.log(clientes);
  res.end();
});

app.put("/cliente/:id", (req, res, next) => {
  const clienteComDadosNovos = req.body;
  const index = clientes.findIndex((c) => c.id === parseInt(req.params.id));
  const clienteAtualizar = clientes[index];

  clienteAtualizar.nome = clienteComDadosNovos.nome;
  clienteAtualizar.endereco = clienteComDadosNovos.endereco;
  clienteAtualizar.cidade = clienteComDadosNovos.cidade;

  res.status(204).send();
});

app.delete("/cliente/:id", (req, res, next) => {
  const idParam = req.params.id;
  const index = clientes.findIndex((c) => c.id === parseInt(idParam));
  clientes.splice(index, 1);
  res.status(204).send();
});

const server = http.createServer(app);
server.listen(3000);