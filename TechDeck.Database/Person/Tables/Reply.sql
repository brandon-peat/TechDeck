﻿CREATE TABLE [Person].[Reply]
(
	[Id]			INT				IDENTITY(1, 1) NOT NULL,
	[PostId]		INT				NOT NULL,
	[PersonId]		INT				NOT NULL,
	[DateCreated]	DATETIME		NOT NULL DEFAULT(GETDATE()),
    [Text]			NVARCHAR(280)	NOT NULL, 

    CONSTRAINT [PK_Reply] PRIMARY KEY CLUSTERED ([Id] ASC),
	CONSTRAINT FK_Reply_Post FOREIGN KEY (PostId) REFERENCES Person.Post(Id),
	CONSTRAINT FK_Reply_Person FOREIGN KEY (PersonId) REFERENCES Person.Person(Id)
)