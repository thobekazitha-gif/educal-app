import React from 'react';

const BookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

export const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 shadow-md border-b border-gray-700">
            <div className="container mx-auto px-4 py-4 flex items-center justify-center">
                <BookIcon className="w-8 h-8 text-red-500 mr-3" />
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                    Logic League Educational Material
                </h1>
            </div>
        </header>
    );
};
