// src/models/productsModels.js
import { db } from '../../data/data.js';
import { collection, getDocs, getDoc, doc, addDoc, deleteDoc, query, where } from 'firebase/firestore';

const col = collection(db, 'products');

export const obtenerProductos = async () => {
  try{
  const snapshot = await getDocs(col);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
} catch(error){
  console.error(`Error obteniendo la colección PRODUCTOS`, error);
  throw error;
}
};

export const obtenerPorId = async (id) => {
  try{
  const d = await getDoc(doc(db, 'products', id));
  return d.exists() ? { id: d.id, ...d.data() } : null;
} catch(error){
   console.error(`Error obteniendo el producto con ID ${id}`, error);
  throw error;
}
};

export const buscarPorConsulta = async (categoria) => {
  const q = query(col, where('categoria', '==', categoria));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const crearProducto = async (data) => {
  const ref = await addDoc(col, { ...data, createdAt: new Date().toISOString() });
  return { id: ref.id, ...data };
};

export const eliminarProducto = async (id) => {
  const d = await getDoc(doc(db, 'products', id));
  if (!d.exists()) return null;
  await deleteDoc(d.ref);
  return true;
};   