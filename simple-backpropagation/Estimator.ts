export interface Estimator<Features> {
  estimate : (features: Features) => number;
  feedback : (features: Features, error: number) => void;
  inspect: () => void;  
} 
