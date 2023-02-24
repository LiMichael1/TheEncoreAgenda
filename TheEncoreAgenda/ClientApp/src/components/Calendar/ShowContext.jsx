import React, { useState } from 'react';
import { createContext } from 'react';

export const defaultEventInfo = {
    title: "",
    desc: "",
    allDay: false,
    start: Date.now(),
    end: Date.now()
    }

const initialState = {
    isOpen: false,
    setIsOpen: () => null,
    
    eventType: "",
    setEventType: () => null,

    eventInfo: defaultEventInfo,
    setEventInfo: () => null
};

export const ShowContext = createContext({ initialState }); 



export const ShowProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [eventType, setEventType] = useState("New");
    const [eventInfo, setEventInfo] = useState(defaultEventInfo);

    //console.log(eventInfo);

    const value = {
        isOpen,
        setIsOpen,
        eventType,
        setEventType,
        eventInfo,
        setEventInfo
    };

    
    return <ShowContext.Provider value={value}>{children}</ShowContext.Provider>
}