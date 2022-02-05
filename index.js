const express = require("express");
const crud = require("./test");

const PORT = process.env.PORT || 8080;
const app = express();

crud().then(products => {
  app.get(`/`, (req, res) => {
    res.send(`
      <h1 style="color:blue;">Bienvenidos al servidor express</h1>
      <p>Puede visitar las siguientes rutas:</p>
      <ul>
        <li>
          <p>Productos: <a href="https://clase-06-parionaventurajuliocesar.glitch.me/productos">https://clase-06-parionaventurajuliocesar.glitch.me/productos</a></p>
        </li>
        <li>
          <p>Productos random: <a href="https://clase-06-parionaventurajuliocesar.glitch.me/productorandom">https://clase-06-parionaventurajuliocesar.glitch.me/productorandom</a></p>
        </li>
      </ul>
    `);
  });
  app.get(`/productos`, (req, res) => {
    res.send(products);
  });
  app.get(`/productoRandom`, (req, res) => {
    let indexRandom = Math.floor(Math.random() * products.length); // Genera un número random entero entre 0 y el número de objetos dentro del array.
    res.send(products[indexRandom]);
  });
  
  app.listen(PORT, () => {
    console.log(`Servidor activo y escuchando en el puerto: ${PORT}`);
  });
});