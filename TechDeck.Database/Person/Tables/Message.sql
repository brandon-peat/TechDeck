CREATE TABLE [Person].[Message] (
	[Id]			INT				IDENTITY(1, 1) NOT NULL,
	[SenderId]		INT				NOT NULL,
	[RecipientId]   INT				NOT NULL ,
	[DateTimeSent]	DATETIME		NOT NULL DEFAULT (GETDATE()),
	[Text]			NVARCHAR(1000)	NOT NULL, 
    [IsRead]		BIT				NOT NULL DEFAULT 0, 

    CONSTRAINT [PK_Message] PRIMARY KEY CLUSTERED ([Id] ASC),
	CONSTRAINT FK_Message_Sender FOREIGN KEY (SenderId) REFERENCES Person.Person(Id),
	CONSTRAINT FK_Message_Recipient FOREIGN KEY (RecipientId) REFERENCES Person.Person(Id)
)
