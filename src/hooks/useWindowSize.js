import { useState, useEffect, useCallback } from 'react';

import { breakpoints } from '../styles/styles';

export const useWindowSize = () => {
    const isClient = typeof window === 'object';

    const getSize = useCallback(() => {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined,
        };
    }, [isClient]);

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return;
        }

        const handleResize = () => {
            setWindowSize(getSize());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isClient, getSize]);

    return {
        ...windowSize,
        isMobile: windowSize.width <= breakpoints[1],
    };
};
