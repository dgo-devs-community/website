-- Esquema simplificado para sistema de boletos
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

-- Función para actualizar updated_at automáticamente
CREATE
OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $ $ BEGIN NEW.updated_at = NOW();

RETURN NEW;

END;

$ $ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER update_tickets_updated_at BEFORE
UPDATE
    ON tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Políticas de seguridad RLS
ALTER TABLE
    tickets ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserción de nuevos tickets
CREATE POLICY "Allow ticket creation" ON tickets FOR
INSERT
    WITH CHECK (true);

-- Política para permitir lectura de tickets
CREATE POLICY "Allow ticket reading" ON tickets FOR
SELECT
    USING (true);

-- Política para permitir actualización de tickets
CREATE POLICY "Allow ticket updates" ON tickets FOR
UPDATE
    USING (true);

-- Insertar un ticket de ejemplo para probar
INSERT INTO
    tickets (code, name, email, quantity, status)
VALUES
    (
        'TEST1234',
        'Usuario Test',
        'test@example.com',
        1,
        'paid'
    ) ON CONFLICT (code) DO NOTHING;