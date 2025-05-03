import { Message } from "../models/message";

export class GroupedMessages {
    public static groupMessages(messages: Message[]): MessageGroup[] {
        const grouped: MessageGroup[] = [];

        if (messages.length === 0) {
            return grouped;
        }
        
        let currentGroup = new MessageGroup();
        currentGroup.messages.push(messages[0]);
    
        for (let i = 1; i < messages.length; i++) {
            const currentMessage = messages[i];
            const previousMessage = messages[i - 1];
    
            if (currentMessage.senderId === previousMessage.senderId) {
                currentGroup.messages.push(currentMessage);
            } else {
                grouped.push(currentGroup);
                currentGroup = new MessageGroup();
                currentGroup.messages.push(currentMessage);
            }
        }
        grouped.push(currentGroup);
    
        return grouped;
    }
}

export class MessageGroup {
    messages: Message[] = [];
}