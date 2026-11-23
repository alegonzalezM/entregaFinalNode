import { buscarPorConsulta, obtenerPorId, obtenerProductos, crearProducto, eliminarProducto } from '../models/productsModels.js';

export const getAllProductsService = async (categoria) => {
  if (categoria) {
    return await buscarPorConsulta(categoria);
  }
  return await obtenerProductos();
};

export const getProductByIdService = async (id) => {
  return await obtenerPorId(id);
};

export const createProductService = async (data) => {
  return await crearProducto(data);
};

export const deleteProductService = async (id) => {
  return await eliminarProducto(id);
};   