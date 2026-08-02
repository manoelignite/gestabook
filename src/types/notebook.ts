export type NotebookCondition = 'excelente' | 'boa' | 'ruim';

export interface Notebook {
  id?: string;
  brand: string;
  model: string;
  cart: number;
  maintenance: boolean;
  number: number;
  condition: NotebookCondition;
}
