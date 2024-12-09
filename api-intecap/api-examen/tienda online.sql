DROP SCHEMA IF EXISTS tienda_online;
CREATE SCHEMA tienda_online;
USE tienda_online;

CREATE TABLE cliente(
    nit VARCHAR(8) NOT NULL PRIMARY KEY,
    nombre1     VARCHAR(45)     NOT NULL,
    nombre2     VARCHAR(45)     NOT NULL,
    apellido1   VARCHAR(45)     NOT NULL,
    apellido2   VARCHAR(45)     NOT NULL,
    correo      VARCHAR(100)    NOT NULL,
    telefono    VARCHAR(8)      NOT NULL,
    password    TEXT            NOT NULL,
    estado      BOOLEAN         NOT NULL
);

CREATE TABLE producto(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    descripcion VARCHAR(45) NOT NULL,
    costo DOUBLE NOT NULL,
    existencias INT NOT NULL,
    estado BOOLEAN NOT NULL
);

CREATE TABLE carrito(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    fecha DATE NOT NULL,
    total DOUBLE NOT NULL,
    nit_cliente VARCHAR(13) NOT NULL,
    estado BOOLEAN NOT NULL,
    FOREIGN KEY(nit_cliente) REFERENCES cliente(nit)
);

CREATE TABLE carrito_productos(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_carrito INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio DOUBLE NOT NULL,
    estado BOOLEAN NOT NULL,
    FOREIGN KEY(id_carrito) REFERENCES carrito(id),
    FOREIGN KEY(id_producto) REFERENCES producto(id)
);


-- Inserción de clientes
INSERT INTO cliente (nit, nombre1, nombre2, apellido1, apellido2, correo, telefono, password, estado) VALUES
('12345678', 'Juan', 'Carlos', 'Pérez', 'Gómez', 'juan.perez@gmail.com', '5551234', 'hashed_password1', 1),
('87654321', 'María', 'Elena', 'López', 'Martínez', 'maria.lopez@gmail.com', '5555678', 'hashed_password2', 1),
('11223344', 'Pedro', 'Luis', 'Sánchez', 'Hernández', 'pedro.sanchez@gmail.com', '5559012', 'hashed_password3', 1),
('44332211', 'Ana', 'Sofía', 'Ramírez', 'Rodríguez', 'ana.ramirez@gmail.com', '5553456', 'hashed_password4', 1),
('55667788', 'Luis', 'Alberto', 'Morales', 'Castro', 'luis.morales@gmail.com', '5557890', 'hashed_password5', 1);

-- Inserción de productos
INSERT INTO producto (nombre, descripcion, costo, existencias, estado) VALUES
('Arroz', 'Grano básico para comidas', 1.20, 100, 1),
('Frijoles', 'Alimento rico en proteínas', 1.50, 80, 1),
('Azúcar', 'Endulzante de uso diario', 0.90, 120, 1),
('Corn Flakes', 'Cereal de desayuno', 2.50, 60, 1),
('Incaparina', 'Bebida nutricional fortificada', 3.00, 50, 1);

-- Inserción de carritos
INSERT INTO carrito (fecha, total, nit_cliente, estado) VALUES
('2024-12-07', 10.50, '12345678', 1),
('2024-12-07', 8.80, '12345678', 1),
('2024-12-07', 12.60, '87654321', 1),
('2024-12-07', 14.00, '87654321', 1),
('2024-12-07', 9.30, '11223344', 1),
('2024-12-07', 15.00, '11223344', 1),
('2024-12-07', 13.20, '44332211', 1),
('2024-12-07', 10.00, '44332211', 1),
('2024-12-07', 11.50, '55667788', 1),
('2024-12-07', 8.00, '55667788', 1);

-- Inserción de productos en carritos
INSERT INTO carrito_productos (id_carrito, id_producto, cantidad, precio, estado) VALUES
(1, 1, 2, 3.00, 1),
(1, 2, 2, 4.00, 1),
(1, 3, 1, 1.50, 1),
(2, 4, 2, 4.40, 1),
(2, 5, 1, 2.50, 1),
(3, 2, 2, 4.00, 1),
(3, 3, 2, 3.60, 1),
(3, 5, 2, 5.00, 1),
(4, 1, 3, 4.50, 1),
(4, 4, 3, 6.60, 1),
(5, 2, 3, 6.00, 1),
(5, 5, 1, 2.50, 1),
(6, 1, 4, 6.00, 1),
(6, 3, 3, 5.40, 1),
(7, 4, 3, 6.60, 1),
(7, 5, 2, 5.00, 1),
(8, 2, 2, 4.00, 1),
(8, 3, 2, 3.60, 1),
(9, 1, 3, 4.50, 1),
(9, 4, 2, 4.40, 1),
(10, 2, 3, 6.00, 1),
(10, 5, 1, 2.50, 1);

