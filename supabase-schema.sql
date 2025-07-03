-- Tabla para almacenar los boletos
CREATE TABLE IF NOT EXISTS tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    status VARCHAR(50) DEFAULT 'pending',
    receipt_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_tickets_code ON tickets(code);

CREATE INDEX IF NOT EXISTS idx_tickets_email ON tickets(email);

CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);

-- Función para generar código único
CREATE
OR REPLACE FUNCTION generate_ticket_code() RETURNS TEXT AS $ $ DECLARE code TEXT;

exists BOOLEAN;

BEGIN LOOP -- Generar código de 8 caracteres alfanuméricos
code := UPPER(
    SUBSTRING(
        REPLACE(
            ENCODE(gen_random_bytes(6), 'base64'),
            '/',
            '0'
        ),
        1,
        8
    )
);

-- Verificar si el código ya existe
SELECT
    EXISTS(
        SELECT
            1
        FROM
            tickets
        WHERE
            tickets.code = code
    ) INTO exists;

-- Si no existe, salir del loop
IF NOT exists THEN EXIT;

END IF;

END LOOP;

RETURN code;

END;

$ $ LANGUAGE plpgsql;

-- Trigger para generar código automáticamente
CREATE
OR REPLACE FUNCTION set_ticket_code() RETURNS TRIGGER AS $ $ BEGIN IF NEW.code IS NULL
OR NEW.code = '' THEN NEW.code := generate_ticket_code();

END IF;

NEW.updated_at := NOW();

RETURN NEW;

END;

$ $ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_ticket_code BEFORE
INSERT
    OR
UPDATE
    ON tickets FOR EACH ROW EXECUTE FUNCTION set_ticket_code();

-- Políticas de seguridad RLS
ALTER TABLE
    tickets ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserción de nuevos tickets
CREATE POLICY "Allow ticket creation" ON tickets FOR
INSERT
    WITH CHECK (true);

-- Política para permitir lectura de tickets por código
CREATE POLICY "Allow ticket reading by code" ON tickets FOR
SELECT
    USING (true);

-- Política para permitir actualización de tickets
CREATE POLICY "Allow ticket updates" ON tickets FOR
UPDATE
    USING (true);