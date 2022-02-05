const Contenedor = require("./clase");

const crud = async () => {
  // --- Se asigna la ubicación del archivo de los productos. ---
  const products = new Contenedor("./productos.txt");
  // --- Guarda un nuevo objeto y se decide omitir el retorno del ID de sus objetos. ---
  await products.save(
    {
      title: "Escuadra",
      price: 123.45,
      thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
    });
  await products.save(
    {
      title: "Calculadora",
      price: 234.56,
      thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
    })
  await products.save(
    {
      title: "Globo Terráqueo",
      price: 345.67,
      thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
    })
  // --- Muestra el array de objetos. ---
  const objs = await products.getAll();
  return objs;
};

module.exports = crud;