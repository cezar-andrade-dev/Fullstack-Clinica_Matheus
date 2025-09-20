import { Router } from "express";
import { Curso } from "../types/Matricula";

const router = Router();

const cursos: Curso[] = [
  {
    id: 1,
    nome: "Desenvolvimento Web Full Stack",
    descricao: "Aprenda a criar aplicações web completas",
    duracao: "6 meses",
    preco: 1999.9,
  },
  {
    id: 2,
    nome: "Data Science com Python",
    descricao: "Domine análise de dados e machine learning",
    duracao: "8 meses",
    preco: 2499.9,
  },
  {
    id: 3,
    nome: "UX/UI Design",
    descricao: "Crie interfaces incríveis e experiences memoráveis",
    duracao: "4 meses",
    preco: 1599.9,
  },
];

router.get("/", (req, res) => {
  res.json(cursos);
});

export default router;
