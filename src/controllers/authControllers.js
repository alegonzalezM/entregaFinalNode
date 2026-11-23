import { loginUserService } from '../services/authServices.js';

export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Se requieren los campos email y password",
    });
  }

  try {
    const userData = await loginUserService(email, password);
    return res.status(200).json({
      message: "Usuario autenticado exitosamente",
      data: userData,
    });
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }
    return res.status(500).json({
      message: "Error interno al iniciar sesión",
      error: error.message,
    });
  }
}   