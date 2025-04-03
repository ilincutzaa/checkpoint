'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {useMessages} from "@/app/context/messages-context";
import {MessageUpdateForm} from "@/app/components/message-update-form";

export default function Update () {
    const searchParams = useSearchParams();
    const {messages} = useMessages();
    const router = useRouter();

    const messageId = searchParams.get("id");
    const selectedMessage = messages.find(msg => msg.id === messageId);

    if (!selectedMessage) {
        router.push("/");
        return null;
    }

    return (
        <main>
            <MessageUpdateForm selectedMessage={selectedMessage} />
        </main>
    )
}