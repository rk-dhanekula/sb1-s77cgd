import React, { useState, useEffect } from 'react';
import { Rule } from '../types';
import { Plus, Save } from 'lucide-react';

interface RuleEditorProps {
  onSave: (rule: Rule) => void;
  selectedRule: Rule | null;
  onCancel?: () => void;
}

export function RuleEditor({ onSave, selectedRule, onCancel }: RuleEditorProps) {
  const [name, setName] = useState('');
  const [condition, setCondition] = useState('');
  const [consequence, setConsequence] = useState('');
  const [priority, setPriority] = useState(1);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (selectedRule) {
      setName(selectedRule.name);
      setCondition(selectedRule.condition);
      setConsequence(selectedRule.consequence);
      setPriority(selectedRule.priority);
      setCategory(selectedRule.category);
    }
  }, [selectedRule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: selectedRule?.id || '',
      name,
      condition,
      consequence,
      priority,
      category,
      active: true,
    });
  };

  return (
    <div className="bg-white rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Rule Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-aetna-purple focus:ring-aetna-purple sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
            Condition
          </label>
          <input
            type="text"
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-aetna-purple focus:ring-aetna-purple sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="consequence" className="block text-sm font-medium text-gray-700">
            Consequence
          </label>
          <input
            type="text"
            id="consequence"
            value={consequence}
            onChange={(e) => setConsequence(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-aetna-purple focus:ring-aetna-purple sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <input
            type="number"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-aetna-purple focus:ring-aetna-purple sm:text-sm"
            required
            min="1"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-aetna-purple focus:ring-aetna-purple sm:text-sm"
            required
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aetna-purple"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-aetna-purple border border-transparent rounded-md hover:bg-aetna-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aetna-purple"
          >
            {selectedRule ? 'Update Rule' : 'Create Rule'}
          </button>
        </div>
      </form>
    </div>
  );
}