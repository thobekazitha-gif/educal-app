import React, { useState } from 'react';
import type { UnitPlan, StudyGuide, MaterialType } from '../types';
import { MaterialType as MaterialTypeEnum } from '../types';

interface GeneratedContentProps {
    content: UnitPlan | StudyGuide;
    type: MaterialType;
    onBack: () => void;
}

const BackButton: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition-colors"
    >
        &larr; Start New Search
    </button>
);

const UnitPlanDisplay: React.FC<{ plan: UnitPlan }> = ({ plan }) => {
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

    const handlePrevLesson = () => {
        setCurrentLessonIndex(prev => Math.max(0, prev - 1));
    };

    const handleNextLesson = () => {
        setCurrentLessonIndex(prev => Math.min(plan.lessons.length - 1, prev + 1));
    };

    return (
        <div className="prose prose-invert prose-lg max-w-none">
            <h1 className="text-red-400">{plan.unitTitle}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-base">
                <p><strong>Subject:</strong> {plan.subject}</p>
                <p><strong>Grade Level:</strong> {plan.gradeLevel}</p>
            </div>
            
            <h2 className="border-b border-gray-600 pb-2">Unit Objectives</h2>
            <ul className="list-disc pl-5">
                {plan.unitObjectives.map((obj, i) => <li key={i}>{obj}</li>)}
            </ul>

            <h2 className="border-b border-gray-600 pb-2 mt-10">Lessons</h2>
            <div className="flex items-center justify-between mb-4">
                <button 
                    onClick={handlePrevLesson} 
                    disabled={currentLessonIndex === 0}
                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                    &larr; Previous
                </button>
                <div className="font-semibold text-gray-300">
                    Lesson {currentLessonIndex + 1} of {plan.lessons.length}
                </div>
                <button 
                    onClick={handleNextLesson} 
                    disabled={currentLessonIndex === plan.lessons.length - 1}
                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                    Next &rarr;
                </button>
            </div>

            <div className="relative h-[60vh] overflow-hidden rounded-lg border border-gray-700">
                {plan.lessons.map((lesson, index) => (
                    <div 
                        key={lesson.lessonNumber}
                        className="absolute inset-0 transition-transform duration-500 ease-in-out bg-gray-900/50 p-6 overflow-y-auto"
                        style={{ transform: `translateX(${(index - currentLessonIndex) * 100}%)` }}
                    >
                        <h3 className="text-red-400">Lesson {lesson.lessonNumber}: {lesson.lessonTitle}</h3>
                        <h4 className="mt-4">Objectives</h4>
                        <ul className="list-disc pl-5">
                            {lesson.lessonObjectives.map((obj, i) => <li key={i}>{obj}</li>)}
                        </ul>
                        <h4 className="mt-4">Materials</h4>
                        <ul className="list-disc pl-5">
                            {lesson.materials.map((mat, i) => <li key={i}>{mat}</li>)}
                        </ul>
                        <h4 className="mt-4">Procedure</h4>
                        <div className="pl-5 space-y-2">
                           <p><strong>Introduction:</strong> {lesson.procedure.introduction}</p>
                           <p><strong>Main Activity:</strong> {lesson.procedure.mainActivity}</p>
                           <p><strong>Conclusion:</strong> {lesson.procedure.conclusion}</p>
                        </div>
                        {lesson.homework && <p className="mt-4"><strong>Homework:</strong> {lesson.homework}</p>}
                    </div>
                ))}
            </div>
            
            <h2 className="border-b border-gray-600 pb-2 mt-10">Assessments</h2>
            <p><strong>Formative:</strong> {plan.unitAssessments.formative}</p>
            <p><strong>Summative:</strong> {plan.unitAssessments.summative}</p>
        </div>
    );
};

const PracticeActivityCard: React.FC<{ activity: StudyGuide['practiceActivities'][0] }> = ({ activity }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="relative [transform-style:preserve-3d] transition-transform duration-700 w-full min-h-[300px]" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
            {/* Front: Questions */}
            <div className="absolute w-full h-full bg-gray-900/50 p-6 rounded-lg border border-gray-700 [backface-visibility:hidden] flex flex-col">
                <div className="flex-grow space-y-4 overflow-y-auto pr-2">
                    {activity.questions.map((q, j) => (
                        <div key={j}>
                            <p className="font-semibold">{j + 1}. {q.question}</p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => setIsFlipped(true)}
                    className="mt-4 self-end px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                    View Answer Key
                </button>
            </div>
            {/* Back: Answers */}
            <div className="absolute w-full h-full bg-gray-900/50 p-6 rounded-lg border border-gray-700 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col">
                <div className="flex-grow space-y-4 overflow-y-auto pr-2">
                    {activity.questions.map((q, j) => (
                        <div key={j} className="text-green-300">
                             <p className="font-semibold text-gray-200">{j + 1}. {q.question}</p>
                             <p className="pl-4"><strong>Answer:</strong> {q.answer}</p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => setIsFlipped(false)}
                    className="mt-4 self-end px-4 py-2 bg-gray-700 text-white text-sm font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                >
                    Back to Questions
                </button>
            </div>
        </div>
    );
};

const StudyGuideDisplay: React.FC<{ guide: StudyGuide }> = ({ guide }) => (
    <div className="prose prose-invert prose-lg max-w-none">
        <h1 className="text-red-400">Study Guide: {guide.topic}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-base">
            <p><strong>Grade Level:</strong> {guide.gradeLevel}</p>
            <p><strong>Curriculum Reference:</strong> {guide.capsReference}</p>
        </div>

        <h2 className="border-b border-gray-600 pb-2">Topic Overview</h2>
        <p>{guide.topicOverview}</p>

        <h2 className="border-b border-gray-600 pb-2 mt-10">Content Breakdown</h2>
        <div className="space-y-6">
            {guide.contentBreakdown.map((item, i) => (
                <div key={i} className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                    <h3>{item.subTopic}</h3>
                    <p>{item.details}</p>
                    {item.keyTerms.length > 0 && (
                        <>
                            <h4 className="mt-4">Key Terms</h4>
                            <ul className="list-none pl-0">
                                {item.keyTerms.map((term, j) => (
                                    <li key={j} className="mt-2"><strong>{term.term}:</strong> {term.definition}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            ))}
        </div>

        <h2 className="border-b border-gray-600 pb-2 mt-10">Practice Activities</h2>
        <div className="space-y-12" style={{ perspective: '1500px' }}>
            {guide.practiceActivities.map((activity, i) => (
                <div key={i}>
                    <h3 className="text-red-400 mb-4">{activity.title} <span className="text-base text-gray-400 font-normal">({activity.type})</span></h3>
                    <PracticeActivityCard activity={activity} />
                </div>
            ))}
        </div>
    </div>
);


export const GeneratedContent: React.FC<GeneratedContentProps> = ({ content, type, onBack }) => {
    return (
        <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
            <BackButton onBack={onBack} />
            {type === MaterialTypeEnum.UnitPlan && <UnitPlanDisplay plan={content as UnitPlan} />}
            {type === MaterialTypeEnum.StudyGuide && <StudyGuideDisplay guide={content as StudyGuide} />}
        </div>
    );
};
