-- Active: 1794608822575@@127.0.0.1@3306@motostock_final
-- Active: 1794608822575@@127.0.0.1@3306@mysql
-- MySQL 8.0.16 o posterior. No elimina datos existentes.
CREATE DATABASE IF NOT EXISTS motostock_final CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE motostock_final;
CREATE TABLE IF NOT EXISTS usuarios (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(100) NOT NULL,
 email VARCHAR(150) NOT NULL UNIQUE,
 password_hash VARCHAR(255) NOT NULL,
 rol ENUM('cliente','admin') NOT NULL DEFAULT 'cliente',
 creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS repuestos (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 codigo VARCHAR(30) NOT NULL UNIQUE,
 nombre VARCHAR(150) NOT NULL,
 categoria VARCHAR(80) NOT NULL,
 marca VARCHAR(80) NOT NULL,
 modelo VARCHAR(100) NOT NULL,
 anos VARCHAR(40) NOT NULL,
 descripcion TEXT NOT NULL,
 precio DECIMAL(10,2) NOT NULL CHECK (precio>=0),
 stock INT NOT NULL DEFAULT 0 CHECK (stock>=0),
 stock_minimo INT NOT NULL DEFAULT 5 CHECK (stock_minimo>=0),
 imagen VARCHAR(500) NOT NULL DEFAULT '',
 creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 actualizado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS solicitudes_km (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 usuario_id INT UNSIGNED NOT NULL,
 producto_id INT UNSIGNED NOT NULL,
 repuesto_usado VARCHAR(150) NOT NULL,
 descripcion TEXT NOT NULL,
 entrega ENUM('taller','envio') NOT NULL,
 estado ENUM('pendiente','aprobada','rechazada') NOT NULL DEFAULT 'pendiente',
 condicion VARCHAR(50),
 descuento DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (descuento>=0),
 observaciones TEXT,
 evaluador_id INT UNSIGNED,
 creada_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 evaluada_en TIMESTAMP NULL,
 FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
 FOREIGN KEY (producto_id) REFERENCES repuestos(id),
 FOREIGN KEY (evaluador_id) REFERENCES usuarios(id)
);

-- Datos de ejemplo. IGNORE conserva los productos existentes al repetir el script.
INSERT IGNORE INTO repuestos(codigo,nombre,categoria,marca,modelo,anos,descripcion,precio,stock,stock_minimo,imagen) VALUES
('RP-001','Pastillas de freno delanteras','Frenos','Brembo','Yamaha FZ 2.0','2016-2024','Pastillas para freno de disco delantero.',85000,12,5,'assets/img/RP-001.jpeg'),
('RP-002','Kit de arrastre 428H','Transmisión','DID','Yamaha FZ 2.0','2018-2024','Kit de cadena y piñones.',190000,3,5,'assets/img/RP-002.jpeg'),
('RP-003','Filtro de aceite','Motor','K&N','Honda CB 190R','2017-2024','Filtro de alta eficiencia.',42000,0,4,'assets/img/RP-003.jpeg'),
('RP-004','Bombillo LED H4','Eléctrico','Osram','Universal','2015-2024','Luz blanca de bajo consumo.',55000,8,5,'assets/img/RP-004.jpeg'),
('RP-005','Espejo retrovisor universal','Accesorios','Genérico','Universal','2010-2024','Espejo ajustable de 10 mm.',38000,5,3,'assets/img/RP-005.jpeg'),
('RP-006','Disco de freno trasero','Frenos','Brembo','Yamaha FZ 2.0','2016-2024','Disco de acero inoxidable.',120000,7,4,'assets/img/RP-006.jpeg'),
('RP-007','Cadena de transmisión 520','Transmisión','DID','Honda CB 190R','2017-2024','Cadena reforzada de 120 eslabones.',98000,2,4,'assets/img/RP-007.jpeg'),
('RP-008','Bujía iridium','Motor','NGK','Universal','2012-2024','Bujía que mejora el encendido.',35000,15,5,'assets/img/RP-008.jpeg'),
('RP-009','Batería 12V 9Ah','Eléctrico','Yuasa','Yamaha FZ 2.0','2016-2024','Batería sellada libre de mantenimiento.',210000,0,3,'assets/img/RP-009.jpeg'),
('RP-010','Manubrio deportivo','Accesorios','Genérico','Universal','2010-2024','Manubrio de aluminio negro mate de 22 mm.',76000,4,3,'assets/img/RP-010.jpeg'),
('RP-011','Pastillas de freno traseras','Frenos','Brembo','Yamaha FZ 2.0','2016-2024','Pastillas traseras semimetálicas.',72000,9,4,'assets/img/RP-011.jpeg'),
('RP-012','Piñón de salida 14T','Transmisión','DID','Honda CB 190R','2017-2024','Piñón de acero templado de 14 dientes.',45000,3,4,'assets/img/RP-012.jpeg');
