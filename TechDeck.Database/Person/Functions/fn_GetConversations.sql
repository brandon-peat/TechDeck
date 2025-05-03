CREATE FUNCTION [Person].[fn_GetConversations]
(
    @CurrentPersonId INT
)
RETURNS TABLE
AS
RETURN
(
    WITH RankedMessages AS (
        SELECT 
            Id,
            PersonId = IIF(SenderId = @CurrentPersonId, RecipientId, SenderId),
            IsLastMessageFromMe = CAST(IIF(SenderId = @CurrentPersonId, 1, 0) AS BIT),
            DateTimeSent,
            Text,
            IsRead,
            ROW_NUMBER() OVER (
                PARTITION BY IIF(SenderId = @CurrentPersonId, RecipientId, SenderId)
                ORDER BY DateTimeSent DESC
            ) AS rn
        FROM Person.[Message]
        WHERE SenderId = @CurrentPersonId OR RecipientId = @CurrentPersonId
    ),
    UnreadMessages AS (
        SELECT 
            PersonId = IIF(SenderId = @CurrentPersonId, RecipientId, SenderId),
            COUNT(*) AS UnreadMessagesCount
        FROM Person.[Message]
        WHERE RecipientId = @CurrentPersonId AND IsRead = 0
        GROUP BY IIF(SenderId = @CurrentPersonId, RecipientId, SenderId)
    )
    SELECT 
        m.Id,
        m.PersonId,
        m.DateTimeSent,
        m.Text,
        m.IsLastMessageFromMe,
        ISNULL(um.UnreadMessagesCount, 0) AS UnreadMessagesCount,
        p.Forename,
        p.Surname
    FROM RankedMessages m
    JOIN Person.Person p ON p.Id = m.PersonId
    LEFT JOIN UnreadMessages um ON um.PersonId = m.PersonId
    WHERE rn = 1
)