-- Insere organizador
INSERT INTO usuarios (nome, email, senha, tipo)
VALUES ('Organizador UFBA', 'org@ufba.br', '1234', 'ORGANIZADOR')
ON CONFLICT (email) DO NOTHING;

-- Insere estudante
INSERT INTO usuarios (nome, email, senha, tipo)
VALUES ('Fulano UFBA', 'teste@ufba.br', '1234', 'ESTUDANTE')
ON CONFLICT (email) DO NOTHING;

-- Recupera IDs
-- Você pode usar SELECTs com uuid diretamente no Node se quiser buscar depois.

-- Insere eventos
INSERT INTO eventos (titulo, descricao, data, organizador_id)
SELECT
  'Semana de Computação',
  'Palestras e oficinas',
  '2025-08-12',
  u.id
FROM usuarios u
WHERE u.email = 'org@ufba.br'
LIMIT 1;

INSERT INTO eventos (titulo, descricao, data, organizador_id)
SELECT
  'Workshop Kotlin',
  'Introdução ao Android',
  '2025-09-01',
  u.id
FROM usuarios u
WHERE u.email = 'org@ufba.br'
LIMIT 1;
