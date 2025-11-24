CREATE DATABASE StockFlow;
GO
USE StockFlow;
GO

CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE Categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE Providers (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(150),
    address VARCHAR(255),
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE Products (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NULL,
    stock INT DEFAULT 0,
    minStock INT DEFAULT 0,
    price DECIMAL(10,2),
    categoryId INT NULL,
    providerId INT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Products_Categories FOREIGN KEY (categoryId) REFERENCES Categories(id),
    CONSTRAINT FK_Products_Providers FOREIGN KEY (providerId) REFERENCES Providers(id)
);
GO

CREATE TABLE InventoryMovements (
    id INT IDENTITY(1,1) PRIMARY KEY,
    type VARCHAR(10) NOT NULL CHECK (type IN ('IN','OUT')),
    quantity INT NOT NULL,
    productId INT NOT NULL,
    userId INT NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Movements_Products FOREIGN KEY (productId) REFERENCES Products(id),
    CONSTRAINT FK_Movements_Users FOREIGN KEY (userId) REFERENCES Users(id)
);
GO
