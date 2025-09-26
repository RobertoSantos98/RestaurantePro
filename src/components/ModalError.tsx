import React from 'react';

export default function ModalError(error: { message: string }) {
    return (
        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-4xl rounded shadow-md">
            <p>{error.message}</p>
        </div>
    )
}