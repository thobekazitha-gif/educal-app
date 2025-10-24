import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { MaterialForm } from './components/MaterialForm';
import { GeneratedContent } from './components/GeneratedContent';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { WelcomeScreen } from './components/WelcomeScreen';
import { generateMaterial } from './services/geminiService';
// FIX: Import the new UnitPlan type instead of LessonPlan.
import type { MaterialType, UnitPlan, StudyGuide, FormState } from './types';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // FIX: Update the state to hold either a UnitPlan or a StudyGuide.
    const [generatedContent, setGeneratedContent] = useState<UnitPlan | StudyGuide | null>(null);
    const [materialType, setMaterialType] = useState<MaterialType | null>(null);
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    const handleFormSubmit = useCallback(async (formState: FormState) => {
        setIsLoading(true);
        setError(null);
        setGeneratedContent(null);
        setMaterialType(formState.materialType);
        setIsFlipped(true);

        try {
            const content = await generateMaterial(formState);
            setGeneratedContent(content);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleCreateNew = useCallback(() => {
        setIsFlipped(false);
    }, []);

    return (
        <div className="min-h-screen font-sans text-gray-200 antialiased flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-8 md:py-12 flex-grow flex items-center" style={{ perspective: '2000px' }}>
                <div 
                    className={`relative w-full max-w-5xl mx-auto transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
                    style={{ minHeight: '75vh' }}
                >
                    {/* Front Side: Form */}
                    <div className="absolute w-full h-full bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-700 [backface-visibility:hidden] overflow-y-auto">
                        <MaterialForm onSubmit={handleFormSubmit} isLoading={isLoading} />
                    </div>

                    {/* Back Side: Content */}
                    <div className="absolute w-full h-full bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-700 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        {isLoading && <LoadingSpinner />}
                        {error && <ErrorMessage message={error} onBack={handleCreateNew} />}
                        {!isLoading && !error && !generatedContent && <WelcomeScreen />}
                        {!isLoading && !error && generatedContent && materialType && (
                            <GeneratedContent content={generatedContent} type={materialType} onBack={handleCreateNew} />
                        )}
                    </div>
                </div>
            </main>
            <footer className="text-center py-6 text-sm text-gray-400">
                <p>Powered by Gemini API</p>
            </footer>
        </div>
    );
};

export default App;
