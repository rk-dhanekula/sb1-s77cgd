export interface Rule {
  id: string;
  name: string;
  condition: string;
  consequence: string;
  priority: number;
  category: string;
  active: boolean;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  diagnosis: string;
  accp_score: number;
}

export interface RuleEvaluationResult {
  patientId: string;
  ruleId: string;
  result: boolean;
  message: string;
}