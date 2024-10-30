import { Patient, Rule, RuleEvaluationResult } from '../types';

export function evaluateRules(patients: Patient[], rules: Rule[]): RuleEvaluationResult[] {
  const results: RuleEvaluationResult[] = [];

  for (const patient of patients) {
    for (const rule of rules) {
      try {
        // Create a safe evaluation context with patient data
        const context = { ...patient };
        
        // Evaluate the rule condition
        const result = new Function(...Object.keys(context), `return ${rule.condition}`)(...Object.values(context));
        
        results.push({
          patientId: patient.id,
          ruleId: rule.id,
          result,
          message: rule.consequence
        });
      } catch (error) {
        console.error(`Error evaluating rule ${rule.id} for patient ${patient.id}:`, error);
        results.push({
          patientId: patient.id,
          ruleId: rule.id,
          result: false,
          message: 'Error evaluating rule'
        });
      }
    }
  }

  return results;
}