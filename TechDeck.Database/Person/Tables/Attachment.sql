CREATE TABLE [Person].[Attachment]
(
    [Id]            INT                 IDENTITY (1, 1) NOT NULL,
    [Name]          UNIQUEIDENTIFIER    NOT NULL,
	[PostId]	    INT		            NOT NULL,

    CONSTRAINT [PK_Attachment] PRIMARY KEY CLUSTERED ([Id] ASC),
	CONSTRAINT FK_Attachment_Post FOREIGN KEY (PostId) REFERENCES Person.Post(Id)
);

