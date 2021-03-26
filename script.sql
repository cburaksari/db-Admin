create sequence if not exists kolon_id_seq;
create sequence if not exists tablo_id_seq;
create sequence if not exists hibernate_sequence;


-- Table: public.tablo

-- DROP TABLE public.tablo;

CREATE TABLE public.tablo
(
    id integer NOT NULL DEFAULT nextval('tablo_id_seq'::regclass),
    tablo_ismi text COLLATE pg_catalog."default",
    aciklama text COLLATE pg_catalog."default",
    CONSTRAINT tablo_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tablo
    OWNER to dbadmin;

-- Table: public.kolon

-- DROP TABLE public.kolon;

CREATE TABLE public.kolon
(
    id integer NOT NULL DEFAULT nextval('kolon_id_seq'::regclass),
    kolon_ismi text COLLATE pg_catalog."default",
    etiket text COLLATE pg_catalog."default",
    veri_tipi text COLLATE pg_catalog."default",
    tablo_id bigint,
    CONSTRAINT kolon_pkey PRIMARY KEY (id),
    CONSTRAINT fk_tablo_id FOREIGN KEY (tablo_id)
        REFERENCES public.tablo (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.kolon
    OWNER to dbadmin;