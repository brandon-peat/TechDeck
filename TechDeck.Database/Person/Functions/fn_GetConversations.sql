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
            IsLastMessageFromMe = CAST(IIF(SenderId = @CurrentPersonId, 1, 0) as BIT),
            DateTimeSent,
            Text,
            IsRead,
            ROW_NUMBER() OVER (
                PARTITION BY IIF(SenderId = @CurrentPersonId, RecipientId, SenderId)
                ORDER BY DateTimeSent DESC
            ) AS rn
        FROM Person.[Message]
        WHERE SenderId = @CurrentPersonId OR RecipientId = @CurrentPersonId
    )
    SELECT 
        m.Id,
        m.PersonId,
        m.DateTimeSent,
        m.Text,
        m.IsRead,
        m.IsLastMessageFromMe,
        p.Forename,
        p.Surname
    FROM RankedMessages m
    JOIN Person.Person p ON p.Id = m.PersonId
    WHERE rn = 1
)