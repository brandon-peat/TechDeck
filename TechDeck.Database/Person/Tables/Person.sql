CREATE TABLE [Person].[Person] (
    [Id]           INT             IDENTITY (1, 1) NOT NULL,
    [Forename]     NVARCHAR (25)   NOT NULL,
    [Surname]      NVARCHAR (25)   NOT NULL,
    [Email]        NVARCHAR (320)  NOT NULL,
    [PasswordHash] NVARCHAR (MAX)  NOT NULL,
    CONSTRAINT [PK_Person] PRIMARY KEY CLUSTERED ([Id] ASC)
);

