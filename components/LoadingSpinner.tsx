import React from 'react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800/80 backdrop-blur-sm z-10">
            <div className="book-spinner mb-6">
                <div className="book-cover-left"></div>
                <div className="book-page-flipper"></div>
            </div>
            <p className="text-lg font-semibold text-gray-300">Searching for Your Material...</p>
        </div>
    );
};
