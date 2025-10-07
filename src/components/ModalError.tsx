import React, { useEffect, useState } from 'react';

interface ModalErroProp {
    message: string,
    setMensagemErro: () => void
}

export default function ModalError(error: ModalErroProp) {

    const [width, setWidth] = useState(100);


    useEffect(() => {
        const totalDuration = 5000;
        const intervalTime = 50;
        const step = (intervalTime / totalDuration) * 100;

        const interval = setInterval(() => {
            setWidth(prev => {
                if(prev <= 0) {
                    clearInterval(interval);
                    error.setMensagemErro();
                    return 0;
                }
                return prev - step;
            }
        )
        }, intervalTime);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className=" bg-yellow-100 text-yellow-700 fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-4xl rounded shadow-md">
            <div className='bg-yellow-500 rounded h-1' style={{width: `${width}%`}}>
            </div>
            <p className='p-4'>{error.message}</p>
        </div>
    )
}