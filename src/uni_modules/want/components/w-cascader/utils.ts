export enum FieldName {
  TEXT = 'text',
  VALUE = 'value',
  CHILDREN = 'children',
}

export type Option = Record<string, any>;

export interface ITab {
  options: Option[];
  selected: Option | null;
}

export const defaultFieldNames = {
	text: FieldName.TEXT,
	value: FieldName.VALUE,
	children: FieldName.CHILDREN,
}