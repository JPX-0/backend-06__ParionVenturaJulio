const {promises : fs} = require("fs");

class Contenedor {
  constructor(url) {
    this.url = url;
  }
  save = async (obj) => {
    const objs = await this.getAll(); // Obtiene el array parseado.
    const findObj = objs.find(item => item.title == obj.title); // Busca si coincide el nombre nuevo con uno ya existente.
    const findId = objs.map(item => item.id); // Devuelve un array de todos los ID

    let newId; // Guarda el nuevo ID
    if(findId.length == 0) newId = 1 // Se asegura en guardar un 1 si está vacío el array.
    else newId = Math.max.apply(null, findId) + 1; // Busca el mayor número entre los IDs el array y aumenta en 1 para efinirse como un nuevo ID.

    if(findObj) {
      throw new Error("Ya existe este producto, por favor ingrese uno nuevo.")
    } else {
      // Pushea el nuevo objeto y su nuevo ID, y retorna el mismo ID.
      objs.push({...obj, id: newId});
      await fs.writeFile(this.url, JSON.stringify(objs, null, 2));
      return newId;
    }
  }
  getById = async (id) => {
    const objs = await this.getAll(); // Obtiene el array parseado.
    const idFound = objs.find(item => item.id == id); // Busca si coincide el ID ingresado con uno ya existente.
    if(!idFound) return null;
    else return idFound;
  }
  getAll = async () => {
    try {
      const objs = await fs.readFile(this.url, "utf-8");
      return JSON.parse(objs);
    } catch (error) {
      throw new Error(`ERROR: ${error.message}`)
    }
  }
  deleteById = async (id) => {
    const objs = await this.getAll(); // Obtiene el array parseado.
    const deleteId = objs.filter(item => item.id != id) // Filtra todos los objetos que no coincidan el ID ingresado, y actualiza el array.
    await fs.writeFile(this.url, JSON.stringify(deleteId, null, 2));
  }
  deleteAll = async() => {
    await fs.writeFile(this.url, "[]"); // Se vacía el array.
  }
}

module.exports = Contenedor;