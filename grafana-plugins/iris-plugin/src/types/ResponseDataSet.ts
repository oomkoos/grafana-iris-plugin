export interface ResponseDataSet {
  data?: {
    data: number[][];
    step: number;
    legends: string[];
    endtime: number;
    cols: number;
    starttime: number;
  };

  success?: boolean;
}
