BEGIN;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET client_min_messages = warning;
SET search_path = public;

-- GENRES --
insert into genre (name, color)
VALUES
('Thriller', '#1e1e1e'),
('Cosy crime', '#1e1e1e'),
('Fantasy', '#8817ae'),
('Roman', '#69fec3'),
('Roman jeunesse', '#69fec3');

-- BOOKS --
insert into book (title, author, editor, library_code, comment, "ISBN", genre_id)
VALUES
('Tante Dimity', 'Nancy Atherton', NULL, NULL, 'recommandé par Mathilde', NULL, (SELECT id FROM public.genre WHERE name='Cosy crime')),
('Keleana', 'Sarah J. Maas', NULL, NULL, 'recommandé par Sophie', NULL, (SELECT id FROM public.genre WHERE name='Fantasy')),
('Le Soleil des Scorta', 'Laurent Gaudé', NULL, NULL, NULL, NULL, (SELECT id FROM public.genre WHERE name='Roman')),
('Les Royaumes de Feu', 'Thui-T Sutherton', NULL, NULL, NULL, NULL, (SELECT id FROM public.genre WHERE name='Fantasy')),
('Geronimo Stilton', 'Elisabetta Dami', NULL, NULL, NULL, NULL, (SELECT id FROM public.genre WHERE name='Roman jeunesse'));

-- ORGANIZATIONS --
insert into organization (name)
VALUES
('Ohana');

-- LISTS --
insert into list (name, organization_id)
VALUES
('Chloé', (SELECT id FROM public.organization WHERE name='Ohana')),
('Alba', (SELECT id FROM public.organization WHERE name='Ohana'));

-- BOOKLISTS --
insert into booklist (book_id, list_id)
VALUES
(
    (SELECT id FROM public.book WHERE title = 'Tante Dimity'),
    (SELECT id FROM public.list WHERE name = 'Chloé')
),
(
    (SELECT id FROM public.book WHERE title = 'Keleana'),
    (SELECT id FROM public.list WHERE name = 'Chloé')
),
(
    (SELECT id FROM public.book WHERE title = 'Le Soleil des Scorta'),
    (SELECT id FROM public.list WHERE name = 'Chloé')
),
(
    (SELECT id FROM public.book WHERE title = 'Les Royaumes de Feu'),
    (SELECT id FROM public.list WHERE name = 'Alba')
),
(
    (SELECT id FROM public.book WHERE title = 'Geronimo Stilton'),
    (SELECT id FROM public.list WHERE name = 'Alba')
);

COMMIT;