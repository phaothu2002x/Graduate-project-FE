import React, { createContext, useRef, useContext } from 'react';

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
    const featureRef = useRef();

    const scrollToFeature = () => {
        featureRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return <ScrollContext.Provider value={{ scrollToFeature, featureRef }}>{children}</ScrollContext.Provider>;
};

export const useScroll = () => {
    return useContext(ScrollContext);
};
