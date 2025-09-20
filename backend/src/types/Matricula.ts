export interface Curso {
  id: number;
  nome: string;
  descricao: string;
  duracao: string;
  preco: number;
}

export interface Aluno {
  id?: number;
  nome: string;
  email: string;
  cursoId: number;
  dataMatricula?: Date;
}

export interface MatriculaRequest {
  nome: string;
  email: string;
  cursoId: number;
}
