CREATE TABLE IF NOT EXISTS public.post (
	id serial PRIMARY KEY,
	title TEXT NOT NULL,
	link TEXT,
	category_id INTEGER NOT NULL,
	is_scrap BOOLEAN DEFAULT TRUE
);

ALTER TABLE "post"
ADD CONSTRAINT "category_program_fk" FOREIGN KEY (category_id) REFERENCES public.category (id);
