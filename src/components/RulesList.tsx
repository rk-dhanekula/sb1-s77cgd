import React from 'react';
import { Rule } from '../types';
import { Brain, Pencil, Trash2, Filter } from 'lucide-react';

interface RulesListProps {
  rules: Rule[];
  selectedRules: string[];
  onRuleSelect: (rule: Rule) => void;
  onRuleDelete: (ruleId: string) => void;
  onRuleToggle: (ruleId: string) => void;
  onRuleFilter: (ruleId: string) => void;
}

export function RulesList({ 
  rules, 
  selectedRules,
  onRuleSelect, 
  onRuleDelete, 
  onRuleToggle,
  onRuleFilter 
}: RulesListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-6 h-6 text-aetna-purple" />
        <h2 className="text-xl font-semibold text-aetna-purple">Active Rules</h2>
      </div>
      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900">{rule.name}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onRuleFilter(rule.id)}
                  className={`p-1 rounded-full transition-colors ${
                    selectedRules.includes(rule.id)
                      ? 'text-aetna-purple bg-purple-50'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title="Filter by this rule"
                >
                  <Filter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onRuleToggle(rule.id)}
                  className={`px-2 py-1 rounded-full text-sm ${
                    rule.active
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {rule.active ? 'Active' : 'Inactive'}
                </button>
                <button
                  onClick={() => onRuleSelect(rule)}
                  className="p-1 text-aetna-purple hover:bg-purple-50 rounded-full transition-colors"
                  title="Edit rule"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onRuleDelete(rule.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Delete rule"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{rule.consequence}</p>
            <div className="flex gap-2 mt-2">
              <span className="text-xs px-2 py-1 bg-purple-100 text-aetna-purple rounded-full">
                Priority: {rule.priority}
              </span>
              <span className="text-xs px-2 py-1 bg-purple-100 text-aetna-purple rounded-full">
                {rule.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}