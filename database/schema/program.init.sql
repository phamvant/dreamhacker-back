CREATE TABLE IF NOT EXISTS program (
	id serial PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO public.program (name) VALUES ('MBA');
