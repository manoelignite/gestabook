export type NotebookCondition = 'excelente' | 'boa' | 'ruim';

export interface Notebook {
  id?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  cart?: string;
  number?: number;
  condition?: NotebookCondition | string;
  maintenance?: boolean;
  type?: string;
}

export const DEFAULT_CART_OPTIONS: string[] = [
  'Carrinho 1',
  'Carrinho 2',
  'Carrinho 3',
  'Carrinho 4',
  'Carrinho 5',
  'DS-TA',
  'DS-TB',
  'DS-MA',
  'DS-MB'
];

export interface NotebookPreset {
  label: string;
  brand: string;
  model: string;
  icon?: string;
}

export const MODEL_PRESETS: NotebookPreset[] = [
  { label: 'Samsung Chromebook', brand: 'Samsung', model: 'Chromebook', icon: 'laptop_mac' },
  { label: 'Positivo Master N8440', brand: 'Positivo', model: 'Master N8440', icon: 'laptop_mac' },
  { label: 'ThinkPad L14', brand: 'Lenovo', model: 'ThinkPad L14', icon: 'laptop_mac' },
  { label: 'Positivo Master N1110', brand: 'Positivo', model: 'Master N1110', icon: 'laptop_mac' },
  { label: 'Positivo Master N1210', brand: 'Positivo', model: 'Master N1210', icon: 'laptop_mac' }
];

export interface ConditionOption {
  label: string;
  value: NotebookCondition;
  variant: 'green' | 'blue' | 'orange';
  icon: string;
}

export const CONDITION_OPTIONS: ConditionOption[] = [
  { label: 'Excelente', value: 'excelente', variant: 'green', icon: 'sentiment_very_satisfied' },
  { label: 'Boa', value: 'boa', variant: 'blue', icon: 'thumb_up' },
  { label: 'Ruim', value: 'ruim', variant: 'orange', icon: 'warning' }
];

export const getBrandModelText = (notebook?: Partial<Notebook> | null): string => {
  if (!notebook) return 'Notebook Sem Nome';
  const brand = notebook.brand?.trim() || '';
  const model = notebook.model?.trim() || '';
  if (brand && model) return `${brand} ${model}`;
  if (brand) return brand;
  if (model) return model;
  return 'Notebook Sem Nome';
};

export const getConditionVariant = (condition?: string): 'green' | 'blue' | 'orange' | 'default' => {
  switch (condition?.toLowerCase()) {
    case 'excelente': return 'green';
    case 'boa': return 'blue';
    case 'ruim': return 'orange';
    default: return 'default';
  }
};

export const getConditionIcon = (condition?: string): string => {
  switch (condition?.toLowerCase()) {
    case 'excelente': return 'sentiment_very_satisfied';
    case 'boa': return 'thumb_up';
    case 'ruim': return 'warning';
    default: return 'help';
  }
};

