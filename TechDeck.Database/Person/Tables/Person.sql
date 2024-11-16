CREATE TABLE [Person].[Person] (
    [Id]           INT             IDENTITY (1, 1) NOT NULL,
    [Forename]     NVARCHAR (30)   NOT NULL,
    [Surname]      NVARCHAR (30)   NOT NULL,
    [Email]        NVARCHAR (320)  NOT NULL,
    [PasswordHash] VARBINARY (MAX) NOT NULL,
    CONSTRAINT [PK_User.User] PRIMARY KEY CLUSTERED ([Id] ASC)
);

