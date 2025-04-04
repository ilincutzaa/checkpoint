'use client';

import {useMessages} from "@/app/context/messages-context";
import {useRouter} from "next/navigation";
import {createMessageSchema} from "@/app/schemas";
import {useState} from "react";

const MessageCreateForm = () => {
    const { messages, setMessages } = useMessages();
    const router = useRouter();

    const [text, setText] = useState("");
    const [likes, setLikes] = useState(0);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 16));

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        try{
            createMessageSchema.parse({text, likes, date});
            const newMessage =
                {
                    id: crypto.randomUUID(),
                    text,
                    likes,
                    date
                };
            setMessages([...messages, newMessage]);

            setText("");
            setLikes(0);
            setDate(new Date().toISOString().slice(0, 16));
            setErrorMessage("");

            router.push("/");
        }catch(err){
            setErrorMessage("Please complete all the required fields");
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="text">Text*</label>
            <textarea
                id="text"
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>

            <label htmlFor="likes">Likes</label>
            <input
                type="number"
                id="likes"
                name="likes"
                value={likes}
                onChange={(e) => setLikes(Number(e.target.value))}
                min="0"
            />

            <label htmlFor="date">Date</label>
            <input
                type="datetime-local"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <button type="submit">Create</button>
            {/*<label htmlFor="text">Text</label>*/}
            {/*<textarea id="text" name="text"></textarea>*/}
            {/*<button type="submit">Create</button>*/}
        </form>
    );
};

export {MessageCreateForm}