export default interface BookData {
  nome: string;
  data_lancamento: string;
  descricao?: string;
  categoria: string;
  autores: number[];
}