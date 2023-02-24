import React, { useState } from 'react';
import { createContext } from 'react';

export const defaultEventInfo = {
    title: "",
    description: "",
    allDay: false,
    start: Date.now(),
    end: Date.now(),
    repeat: 0
    }

const initialState = {
    isOpen: false,
    setIsOpen: () => null,
    
    eventType: "",
    setEventType: () => null,

    eventInfo: defaultEventInfo,
    setEventInfo: () => null,
    events: [],
    setEvents: () => null
};

export const ShowContext = createContext({ initialState }); 



export const ShowProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [eventType, setEventType] = useState("New");
    const [eventInfo, setEventInfo] = useState(defaultEventInfo);
    const [events, setEvents] = useState([]);
    const [matchEvents, setMatchEvents] = useState({});

    //console.log(eventInfo);

    const value = {
        isOpen,
        setIsOpen,
        eventType,
        setEventType,
        eventInfo,
        setEventInfo,
        events,
        setEvents,
        matchEvents,
        setMatchEvents,
    };

    
    return <ShowContext.Provider value={value}>{children}</ShowContext.Provider>
}