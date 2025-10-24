import React from 'react';

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.25l-.648-1.688a4.5 4.5 0 00-2.956-2.956L10.5 16.5l1.688-.648a4.5 4.5 0 002.956-2.956L16.25 10.5l.648 1.688a4.5 4.5 0 002.956 2.956L22.5 16.5l-1.688.648a4.5 4.5 0 00-2.956 2.956z" />
    </svg>
);


export const WelcomeScreen: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
            <SparklesIcon className="w-16 h-16 text-red-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-200 mb-2">Your Search Results Will Appear Here</h2>
            <p className="max-w-sm">
                Complete the form on the other side to begin your search.
            </p>
        </div>
    );
};
