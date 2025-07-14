-- Ativa extensão para UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tipo ENUM para contas
CREATE TYPE tipo_conta AS ENUM ('ESTUDANTE', 'ORGANIZADOR');

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    tipo tipo_conta NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW(),
    deletado_em TIMESTAMP
);

-- Tabela de eventos
CREATE TABLE IF NOT EXISTS eventos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    descricao TEXT,
    data DATE NOT NULL,
    organizador_id UUID NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW(),
    deletado_em TIMESTAMP,
    CONSTRAINT fk_evento_organizador FOREIGN KEY (organizador_id) REFERENCES usuarios(id)
);

-- Tabela de presenças
CREATE TABLE IF NOT EXISTS presencas (
    id SERIAL PRIMARY KEY,
    evento_id UUID NOT NULL,
    estudante_id UUID NOT NULL,
    confirmada BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW(),
    deletado_em TIMESTAMP,
    UNIQUE(evento_id, estudante_id),
    CONSTRAINT fk_presenca_evento FOREIGN KEY (evento_id) REFERENCES eventos(id),
    CONSTRAINT fk_presenca_estudante FOREIGN KEY (estudante_id) REFERENCES usuarios(id)
);

-- Tabela de certificados
CREATE TABLE IF NOT EXISTS certificados (
    id SERIAL PRIMARY KEY,
    evento_id UUID NOT NULL,
    estudante_id UUID NOT NULL,
    emitido BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW(),
    deletado_em TIMESTAMP,
    UNIQUE(evento_id, estudante_id),
    CONSTRAINT fk_certificado_evento FOREIGN KEY (evento_id) REFERENCES eventos(id),
    CONSTRAINT fk_certificado_estudante FOREIGN KEY (estudante_id) REFERENCES usuarios(id)
);
