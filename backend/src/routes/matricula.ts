import { Router } from "express";
import { Aluno, MatriculaRequest } from "../types/Matricula";

const router = Router();
const matriculas: Aluno[] = [];

// Validação de email simples
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

router.post("/", (req, res) => {
  try {
    const { nome, email, cursoId }: MatriculaRequest = req.body;

    // Validações
    if (!nome || !email || !cursoId) {
      return res.status(400).json({
        error: "Todos os campos são obrigatórios",
      });
    }

    if (nome.length < 3) {
      return res.status(400).json({
        error: "Nome deve ter pelo menos 3 caracteres",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Email inválido",
      });
    }

    // Verificar se email já está cadastrado
    const emailExistente = matriculas.find(
      (matricula) => matricula.email === email
    );
    if (emailExistente) {
      return res.status(400).json({
        error: "Email já cadastrado",
      });
    }

    // Criar nova matrícula
    const novaMatricula: Aluno = {
      id: matriculas.length + 1,
      nome,
      email,
      cursoId,
      dataMatricula: new Date(),
    };

    matriculas.push(novaMatricula);

    res.status(201).json({
      message: "Matrícula realizada com sucesso!",
      matricula: novaMatricula,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
});

export default router;
