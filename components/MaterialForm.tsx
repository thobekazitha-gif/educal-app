import React, { useState } from 'react';
import { MATERIAL_TYPES, GRADE_LEVELS } from '../constants';
import type { FormState } from '../types';
import { MaterialType } from '../types';

interface MaterialFormProps {
    onSubmit: (formState: FormState) => void;
    isLoading: boolean;
}

export const MaterialForm: React.FC<MaterialFormProps> = ({ onSubmit, isLoading }) => {
    // FIX: Default to UnitPlan instead of LessonPlan.
    const [materialType, setMaterialType] = useState<MaterialType>(MaterialType.UnitPlan);
    const [topic, setTopic] = useState<string>('');
    const [gradeLevel, setGradeLevel] = useState<string>(GRADE_LEVELS[5]); // Default to Grade 5
    const [objectives, setObjectives] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) {
            alert('Please enter a topic.');
            return;
        }
        onSubmit({ materialType, topic, gradeLevel, objectives });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">Search Your Material</h2>
            
            <div>
                <label htmlFor="materialType" className="block text-sm font-medium text-gray-300 mb-2">1. Select Material Type</label>
                <div className="grid grid-cols-2 gap-3">
                    {MATERIAL_TYPES.map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setMaterialType(type)}
                            className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 ${
                                materialType === type 
                                ? 'bg-red-600 text-white shadow-md' 
                                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">2. Enter Topic or Subject</label>
                <input
                    type="text"
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., The Water Cycle, Apartheid in South Africa"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-red-500 focus:border-red-500 transition text-white placeholder-gray-400"
                    required
                />
            </div>
            
            <div>
                <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-300 mb-2">3. Select Grade Level</label>
                <select
                    id="gradeLevel"
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-red-500 focus:border-red-500 transition text-white"
                >
                    {GRADE_LEVELS.map((level) => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select>
            </div>
            
            <div>
                <label htmlFor="objectives" className="block text-sm font-medium text-gray-300 mb-2">4. Learning Objectives (Optional)</label>
                <textarea
                    id="objectives"
                    value={objectives}
                    onChange={(e) => setObjectives(e.target.value)}
                    rows={3}
                    placeholder="e.g., Explain the importance of Nelson Mandela, identify the provinces of South Africa"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-red-500 focus:border-red-500 transition text-white placeholder-gray-400"
                />
            </div>
            
            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors duration-300"
            >
                {isLoading ? 'Searching...' : 'Search Material'}
            </button>
        </form>
    );
};
