'use client';

import {useMessages} from "@/app/context/messages-context";
import {useRouter} from "next/navigation";
import {createMessageSchema} from "@/app/schemas";
import {useEffect, useState} from "react";

const MessageUpdateForm = ({selectedMessage}) => {
    const { messages, setMessages } = useMessages();
    const router = useRouter();
    const [text, setText] = useState("");

    useEffect(() => {
        if(selectedMessage) {
            setText(selectedMessage.text);
        }
    }, [selectedMessage]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const {text: validatedText} = createMessageSchema.parse({
            text: text.trim()
        })

        const updatedMessages = messages.map(
            message => message.id === selectedMessage.id?
                {...message, text: validatedText} : message
        );

        setMessages(updatedMessages);

        router.push("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="text">Text</label>
            <textarea
                id="text"
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button type="submit">Update</button>
        </form>
    );
};

export {MessageUpdateForm}