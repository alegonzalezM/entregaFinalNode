import { db } from '../../data/data.js';
import { collection, getDocs, getDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';

const col = collection(db, 'categorias');

export async function getAllCategoriesService() {
  const snapshot = await getDocs(collection(db, 'products'));
  const cats = [...new Set(snapshot.docs.map(d => d.data().categoria))];
  return cats.map((name, i) => ({ id: i + 1, name }));
}   

export async function getCategoryByIdService(id) {
  const d = await getDoc(doc(db, 'categorias', id));
  return d.exists() ? { id: d.id, ...d.data() } : null;
}

export async function createCategoryService(name) {
  const ref = await addDoc(col, { name });
  return { id: ref.id, name };
}

export async function deleteCategoryService(id) {
  const d = await getDoc(doc(db, 'categorias', id));
  if (!d.exists()) return null;
  await deleteDoc(d.ref);
  return true;
}   