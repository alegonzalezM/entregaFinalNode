import { getAllCategoriesService, getCategoryByIdService, createCategoryService, deleteCategoryService } from "../services/categoryService.js";

export async function getAllCategories(req, res) {
  try {
    const categories = await getAllCategoriesService();
    if (categories.length > 0) {
      res.status(200).json({ message: "Categorías encontradas:", data: categories });
    } else {
      res.status(404).json({ message: "No se encontraron categorías" });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en la solicitud: " + e.message });
  }
}

export async function getCategoryById(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "El ID es obligatorio" });
    }
    const category = await getCategoryByIdService(id);
    if (category) {
      res.status(200).json({ message: "Categoría encontrada:", data: category });
    } else {
      res.status(404).json({ message: "No se encontró la categoría" });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en la solicitud: " + e.message });
  }
}

export async function createCategory(req, res) {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }
    const newCategory = await createCategoryService(nombre);
    res.status(201).json({ message: "Categoría creada:", data: newCategory });
  } catch (e) {
    res.status(500).json({ message: "Error en la solicitud: " + e.message });
  }
}

export async function deleteCategory(req, res) {
  try {
    const id = req.params.id;
    const deleted = await deleteCategoryService(id);
    if (deleted) {
      res.status(200).json({ message: "Categoría eliminada" });
    } else {
      res.status(404).json({ message: "No se encontró la categoría" });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en la solicitud: " + e.message });
  }
}   