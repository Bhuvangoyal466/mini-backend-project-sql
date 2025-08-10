CREATE TABLE schools (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

CREATE INDEX idx_coordinates ON schools(latitude, longitude);

INSERT INTO schools (name, address, latitude, longitude) VALUES
('Springfield Elementary School', '123 Main St, Springfield, IL', 39.7817, -89.6501),
('Riverside High School', '456 Oak Ave, Springfield, IL', 39.7850, -89.6480),
('Greenwood Middle School', '789 Pine Rd, Springfield, IL', 39.7900, -89.6550);
