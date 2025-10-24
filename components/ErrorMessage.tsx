import React from 'react';

interface ErrorMessageProps {
    message: string;
    onBack: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onBack }) => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <div role="alert" className="bg-red-900/20 border-l-4 border-red-500 text-red-300 p-6 rounded-lg shadow-md max-w-md w-full">
                <p className="font-bold text-lg">An Error Occurred</p>
                <p className="my-3">{message}</p>
                <button
                    onClick={onBack}
                    className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition-colors"
                >
                    Start New Search
                </button>
            </div>
        </div>
    );
};
