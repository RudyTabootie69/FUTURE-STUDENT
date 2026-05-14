export type Sex = "male" | "female" | "";

export interface PaymentSummary {
  brand?: string | null;
  last4?: string | null;
}

export class ApplicationJourney {
  pathStage: number;
  pathStagePage: number;


  constructor(pathStage: number, pathStagePage: number) {
      this.pathStage = pathStage;  
      this.pathStagePage = pathStagePage;
  }
}
