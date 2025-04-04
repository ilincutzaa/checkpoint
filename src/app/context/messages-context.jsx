'use client';

import {createContext, useContext, useEffect, useState} from "react";

const MessagesContext = createContext(null);

const initialMessages = [
    { id: crypto.randomUUID(), text: "First message", likes: 0, date: Date.now() },
    { id: crypto.randomUUID(), text: "Second message", likes: 3, date: Date.now() },
    { id: crypto.randomUUID(), text: "Third message", likes: 5, date: Date.now() }
];

export const MessagesProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const storedMessages = sessionStorage.getItem("messages");
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        } else {
            setMessages(initialMessages);
            sessionStorage.setItem("messages", JSON.stringify(initialMessages));
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem("messages", JSON.stringify(messages));
    }, [messages]);

    return (
        <MessagesContext.Provider value = {{messages, setMessages}}>
            {children}
        </MessagesContext.Provider>
    )
};

export var useMessages = () => {
    return useContext(MessagesContext);
};