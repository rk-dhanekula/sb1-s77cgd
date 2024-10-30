import React, { useState, useEffect } from 'react';
import { Rule, Patient, RuleEvaluationResult } from './types';
import { RulesList } from './components/RulesList';
import { RuleEditor } from './components/RuleEditor';
import { PatientTable } from './components/PatientTable';
import { Modal } from './components/Modal';
import { SearchBar } from './components/SearchBar';
import { evaluateRules } from './utils/ruleEngine';
import { Plus } from 'lucide-react';

const initialRules: Rule[] = [
  {
    id: '1',
    name: 'High ACCP Score',
    condition: 'accp_score >= 57',
    consequence: 'Flag for case management review',
    priority: 1,
    category: 'Case Management',
    active: true,
  }
];

const samplePatients: Patient[] = [
  {
    id: 'P001',
    name: 'John Doe',
    dateOfBirth: '1980-01-01',
    gender: 'Male',
    diagnosis: 'Hypertension',
    accp_score: 58,
  }
];

export function App() {
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [selectedRules, setSelectedRules] = useState<string[]>([]);
  const [patients, setPatients] = useState<Patient[]>(samplePatients);
  const [evaluationResults, setEvaluationResults] = useState<RuleEvaluationResult[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const results = evaluateRules(patients, rules.filter(r => r.active));
    setEvaluationResults(results);
  }, [patients, rules]);

  const handleRuleSave = (rule: Rule) => {
    if (selectedRule) {
      setRules(rules.map(r => r.id === rule.id ? rule : r));
    } else {
      setRules([...rules, { ...rule, id: String(rules.length + 1) }]);
    }
    setIsModalOpen(false);
    setSelectedRule(null);
  };

  const handleRuleSelect = (rule: Rule) => {
    setSelectedRule(rule);
    setIsModalOpen(true);
  };

  const handleRuleDelete = (ruleId: string) => {
    setRules(rules.filter(r => r.id !== ruleId));
    setSelectedRules(selectedRules.filter(id => id !== ruleId));
  };

  const handleRuleToggle = (ruleId: string) => {
    setRules(rules.map(r => 
      r.id === ruleId ? { ...r, active: !r.active } : r
    ));
  };

  const handleRuleFilter = (ruleId: string) => {
    setSelectedRules(prev => 
      prev.includes(ruleId)
        ? prev.filter(id => id !== ruleId)
        : [...prev, ruleId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-aetna-purple">
              Healthcare Rules Engine
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-aetna-purple text-white rounded-md hover:bg-aetna-purple-dark transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Rule
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-1">
            <RulesList
              rules={rules}
              selectedRules={selectedRules}
              onRuleSelect={handleRuleSelect}
              onRuleDelete={handleRuleDelete}
              onRuleToggle={handleRuleToggle}
              onRuleFilter={handleRuleFilter}
            />
          </div>
          <div className="lg:col-span-3">
            <PatientTable
              patients={filteredPatients}
              evaluationResults={evaluationResults}
            />
          </div>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRule(null);
        }}
        title={selectedRule ? 'Edit Rule' : 'Add New Rule'}
      >
        <RuleEditor
          onSave={handleRuleSave}
          selectedRule={selectedRule}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedRule(null);
          }}
        />
      </Modal>
    </div>
  );
}