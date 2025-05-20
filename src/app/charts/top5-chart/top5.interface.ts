export interface Top5Datum {
  name: string;
  value: number;
  isPercent?: string;
}

export interface EChartLabelFormatterParams {
  value: unknown;
  data: unknown;
  name: string;
}
