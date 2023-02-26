import React, { useState, useEffect } from 'react';
import { createContext } from 'react';

export const defaultEventInfo = {
  title: '',
  description: '',
  allDay: false,
  start: Date.now(),
  end: Date.now(),
  repeat: 0,
};

const initialState = {
  isOpen: false,
  setIsOpen: () => null,

  eventType: '',
  setEventType: () => null,

  eventInfo: defaultEventInfo,
  setEventInfo: () => null,
  events: [],
  setEvents: () => null,
  matchEvents: {},
  setMatchEvents: () => null,
};

export const ShowContext = createContext({ initialState });

export const ShowProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventType, setEventType] = useState('New');
  const [eventInfo, setEventInfo] = useState(defaultEventInfo);
  const [events, setEvents] = useState([]);
  const [matchEvents, setMatchEvents] = useState({});

  useEffect(() => {
    const eventMatch = {};

    for (let i = 0; i < events.length; i++) {
      const date = new Date(events[i].start);
      const end = new Date(events[i].end);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      const endDay = end.getDate();

      for (let j = day; j < endDay + 1; j++) {
        const key = month + '-' + j + '-' + year;
        if (!eventMatch[key]) {
          eventMatch[key] = [events[i]];
        } else {
          eventMatch[key].push(events[i]);
        }
      }
    }

    setMatchEvents(eventMatch);
  }, [events.length]);

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

  return <ShowContext.Provider value={value}>{children}</ShowContext.Provider>;
};
