import { getAllProductsService, getProductByIdService, createProductService, deleteProductService} from "../services/productService.js";

export async function getAllProducts(req,res) {
 
     const categoria = req.query.categoria?.toLowerCase();     
    //   console.log("req.query completo:", req.query);
      console.log("categoria:", categoria);
    try{
     const products = await getAllProductsService(categoria);       
        if(products.length>0){
            return res.status(200).json({
                message: "Productos encontrados: ",
                data: products
            }
    )} else {
        return res.status(404).json({
            message: "No se encontraron productos"
        })
     }
    } catch(e){
         console.log(e.stack);
        res.status(500).json({
            
            message: "Error en la solicitud (controlador): " + e.message })
    }}

export const getProductsById = async (req,res) => {   //se verifica acá poraue no lo tengo q dejar llegar a la capa de servicios, een el caso de categoria es opcional pero el id es obligatorio => no lo dejo llegar a la capa de servicios para verificarlo, si no hay ID ya lo reboto acá
    try{    // usar siempre el try/ catch
  
    const id = req.params.id;
        if (!id) {
        return res.status(400).json({ message: "El ID es obligatorio" });
        }   
    const product= await getProductByIdService(id);
    if(product){
    return res.status(200).json({ message: 'Producto encontrado: ' , 
                           data:  product })
} else {
    return res.status(404).json({ message:"No se encontró el producto"} )
}} catch(e){
        res.status(500).json({
            message: "Error en la solicitud : " + e.message })
    }}

export async function createProduct(req, res) {
  try {
    const { nombre, precio, categoria, marca, stock } = req.body;

    if (!nombre || !precio) {
      return res.status(400).json({ message: "El nombre y el precio son obligatorios" });
    }

    const newProduct = await createProductService({ nombre, precio, categoria, marca, stock });
    res.status(201).json({ message: "Producto creado:", data: newProduct });
  } catch (e) {
    res.status(500).json({ message: "Error en la solicitud: " + e.message });
  }
}   

export async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    const deleted = await deleteProductService(id);
    if (deleted) {
      return res.status(200).json({ message: "Producto eliminado" });
    } else {
      return res.status(404).json({ message: "No se encontró el producto" });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en la solicitud: " + e.message });
  }
}