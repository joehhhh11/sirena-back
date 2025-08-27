--
-- PostgreSQL database dump
--

\restrict 0JKK2iDaT2stshxlRlu5MtP0xMvlyKWwEXvoK6GPclOQRjZ47IEZW8TgT6xiY21

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2025-08-27 17:15:29

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4838 (class 0 OID 16456)
-- Dependencies: 223
-- Data for Name: Cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cliente" (id, email, password, nombre, estado, "createdAt", "updatedAt", "deletedAt", "currentHashedRefreshToken") FROM stdin;
2	adminxd@example.com	$2b$10$O/65xWYBSdWwmITClaBhBuzLVc/3ZGFrRsQOxEf/g9N01NWq1fTQ6	\N	ACTIVO	2025-08-27 19:25:15.083	2025-08-27 22:06:17.988	\N	$2b$10$c6kjzDFpeFOy05xekjvll.CtDRbhG5hsIihnV8ZF6Akq.2rNFCC/m
\.


--
-- TOC entry 4834 (class 0 OID 16434)
-- Dependencies: 219
-- Data for Name: Pelicula; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Pelicula" (id, titulo, sinopsis, "duracionMin", clasificacion, genero, estado, "fechaEstreno", "createdAt", "updatedAt", "deletedAt") FROM stdin;
5	Spidermanxd	dasd	1	Vida	{asd}	INACTIVO	2025-08-28 00:00:00	2025-08-27 20:30:36.516	2025-08-27 20:36:38.966	\N
4	Matrix Reloaded	Neo y los rebeldes continúan su lucha contra las máquinas.	138	R	{Acción,"Ciencia Ficción"}	INACTIVO	2003-05-15 00:00:00	2025-08-27 20:21:40.618	2025-08-27 20:36:48.898	\N
1	The Matrix	Un hacker descubre la realidad virtual...	136	R	{Accion,"Ciencia Ficción"}	INACTIVO	1999-03-31 00:00:00	2025-08-27 19:07:22.059	2025-08-27 21:27:18.427	\N
2	Inception	Sueños dentro de sueños...	148	PG-13	{Accion,Thriller}	INACTIVO	2010-07-16 00:00:00	2025-08-27 19:07:22.059	2025-08-27 21:27:23.915	\N
6	La llorona	Miedo	130	Bueno	{Terror}	ACTIVO	2025-08-28 00:00:00	2025-08-27 21:56:16.501	2025-08-27 21:58:59.894	\N
\.


--
-- TOC entry 4836 (class 0 OID 16445)
-- Dependencies: 221
-- Data for Name: Turno; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Turno" (id, "peliculaId", sala, inicio, fin, precio, idioma, formato, aforo, estado, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	4	Sala 4	2025-08-28 19:00:00	2025-08-28 21:30:00	7	SUB	D2	110	ACTIVO	2025-08-27 20:21:40.618	2025-08-27 20:21:40.618	\N
3	1	2	2025-08-27 20:50:00	2025-08-28 20:50:00	1	DOB	D2	1	INACTIVO	2025-08-27 20:51:02.359	2025-08-27 21:27:18.427	\N
2	5	1	2025-08-28 20:30:00	2025-08-29 20:30:00	1	DOB	D2	20	ACTIVO	2025-08-27 20:31:07.419	2025-08-27 22:00:14.719	\N
4	4	4	2025-08-28 09:33:00	2025-08-28 23:09:00	10	DOB	D2	1	INACTIVO	2025-08-27 21:09:47.427	2025-08-27 22:00:47.067	\N
5	6	SALA1	2025-08-28 22:06:00	2025-08-29 22:06:00	50	DOB	D2	5	ACTIVO	2025-08-27 22:09:13.557	2025-08-27 22:09:13.557	\N
\.


--
-- TOC entry 4832 (class 0 OID 16406)
-- Dependencies: 217
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
5e909bb5-2d3b-43bd-b7ff-c61c6cdbae7d	bccbefb8b7823de4b62570a50d22904c416715920dacd550d38fa93271068df4	2025-08-27 12:24:56.75956-05	20250827172352_init	\N	\N	2025-08-27 12:24:56.73942-05	1
485b4c0a-3a78-4c91-8664-70de6b35b066	08048a03dc911f7d5f42f05833d1e78d151cebe8237e2821f9bcd89dd73fe597	2025-08-27 13:12:21.808887-05	20250827181221_add_refresh_token	\N	\N	2025-08-27 13:12:21.802876-05	1
\.


--
-- TOC entry 4849 (class 0 OID 0)
-- Dependencies: 222
-- Name: Cliente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cliente_id_seq"', 2, true);


--
-- TOC entry 4850 (class 0 OID 0)
-- Dependencies: 218
-- Name: Pelicula_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Pelicula_id_seq"', 6, true);


--
-- TOC entry 4851 (class 0 OID 0)
-- Dependencies: 220
-- Name: Turno_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Turno_id_seq"', 5, true);


-- Completed on 2025-08-27 17:15:29

--
-- PostgreSQL database dump complete
--

\unrestrict 0JKK2iDaT2stshxlRlu5MtP0xMvlyKWwEXvoK6GPclOQRjZ47IEZW8TgT6xiY21

