'use client';

import {useMessages} from "@/app/context/messages-context";
import {useState} from "react";
import Link from "next/link";
import styles from "@/app/components/message-list.module.css";

export const MessageList = () => {
    const { messages, setMessages } = useMessages();
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleDelete = async () => {
        if (selectedMessage) {
            setMessages(messages.filter(message => message.id !== selectedMessage));
            setSelectedMessage(null);
        }
    };

    return(
        <div className="mainContainer">
            <div className="buttonsContainer">
                <Link href="/add">
                    <button className={styles.button}
                        style={{
                            backgroundColor: "green",
                            cursor: "pointer",
                        }}

                    >Add Message</button>
                </Link>
                <button className={styles.button}
                    onClick={handleDelete}
                    disabled={!selectedMessage}
                    style={{
                        backgroundColor: selectedMessage ? "red" : "gray",
                        cursor: selectedMessage ? "pointer" : "not-allowed",
                    }}
                >
                    Delete Message
                </button>
                <Link href={`/update?id=${selectedMessage}`}>
                    <button className={styles.button}
                        disabled={!selectedMessage}
                        style={{
                            backgroundColor: selectedMessage ? "blue" : "gray",
                            cursor: selectedMessage ? "pointer" : "not-allowed"
                        }}
                    >Update Message</button>
                </Link>
            </div>
            <div className="tableContainer">
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>Message</th>
                            <th>Likes</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((message) => (
                            <tr
                                key={message.id}
                                onClick={() => {
                                    if(selectedMessage !== message.id)
                                        setSelectedMessage(message.id);
                                    else
                                        setSelectedMessage(null);
                                }}
                                style={{
                                    cursor: "pointer",
                                    padding: "8px",
                                    backgroundColor: selectedMessage === message.id ? "gray" : "black",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    marginBottom: "5px"
                                }}
                            >
                                <td>{message.text}</td>
                                <td>{message.likes}</td>
                                <td>{message.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
