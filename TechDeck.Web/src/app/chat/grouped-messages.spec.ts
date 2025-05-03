import { Message } from '../models/message';
import { GroupedMessages } from './grouped-messages';

describe('GroupedMessages', () => {
    it('should group messages by sender', () => {
        const messages: Message[] = [
        {
            "id": 8028,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:54:24.88"),
            "text": "skibidi",
            "isRead": false
        },
        {
            "id": 8027,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:51:52.703"),
            "text": "no",
            "isRead": false
        },
        {
            "id": 8026,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:47:17.707"),
            "text": "aa\n\naa\n\naa",
            "isRead": false
        },
        {
            "id": 8025,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:47:13.643"),
            "text": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "isRead": false
        },
        {
            "id": 8024,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:45:20.753"),
            "text": "as",
            "isRead": false
        },
        {
            "id": 8023,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:43:20.04"),
            "text": "no                    \n\nno    \nno",
            "isRead": false
        },
        {
            "id": 8022,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:43:08.49"),
            "text": "no\n\n\n\nno\n\nno",
            "isRead": false
        },
        {
            "id": 8021,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:43:03.313"),
            "text": "no",
            "isRead": false
        },
        {
            "id": 8020,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:42:59.62"),
            "text": "never",
            "isRead": false
        },
        {
            "id": 8019,
            "senderId": 11011,
            "recipientId": 4011,
            "dateTimeSent": new Date("2025-04-19T14:42:29.02"),
            "text": "cockle",
            "isRead": true
        },
        {
            "id": 8018,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:41:42.843"),
            "text": "balling",
            "isRead": true
        },
        {
            "id": 8017,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:41:38.3"),
            "text": "ballers",
            "isRead": true
        },
        {
            "id": 8016,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:38:55.093"),
            "text": "balling",
            "isRead": true
        },
        {
            "id": 8015,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:36:03.33"),
            "text": "nuh uh",
            "isRead": true
        },
        {
            "id": 8014,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:35:48.583"),
            "text": "go away blud",
            "isRead": true
        },
        {
            "id": 8013,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:23:44.893"),
            "text": "skib",
            "isRead": true
        },
        {
            "id": 8012,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:23:14.193"),
            "text": "lie 2",
            "isRead": true
        },
        {
            "id": 8011,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:20:02.94"),
            "text": "lie",
            "isRead": true
        },
        {
            "id": 8010,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:18:21.62"),
            "text": "skibidi toilet",
            "isRead": true
        },
        {
            "id": 8009,
            "senderId": 4011,
            "recipientId": 11011,
            "dateTimeSent": new Date("2025-04-19T14:17:37.697"),
            "text": "this time it'll be fine",
            "isRead": true
        }];

        const grouped = GroupedMessages.groupMessages(messages);

        expect(grouped).toBeDefined();

        expect(grouped).toHaveLength(3);
        expect(grouped[0].messages.every(m => m.senderId === 4011)).toBe(true);
        expect(grouped[1].messages.every(m => m.senderId === 11011)).toBe(true);
        expect(grouped[2].messages.every(m => m.senderId === 4011)).toBe(true);
    });

    it('should return an empty array when no messages are provided', () => {
        const messages: Message[] = [];

        const grouped = GroupedMessages.groupMessages(messages);

        expect(grouped).toBeDefined();
        expect(grouped.length).toBe(0);
    });
});