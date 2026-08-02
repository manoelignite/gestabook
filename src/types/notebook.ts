export type NotebookCondition = 'excelente' | 'boa' | 'ruim';

export interface Notebook {
  id?: string;
  brand: string;
  model: string;
  serialNumber: string;
  cart: number;
  maintenance: boolean;
  number: number;
  condition: NotebookCondition;
}
