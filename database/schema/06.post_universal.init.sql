CREATE TABLE IF NOT EXISTS public.post_universal (
    id serial PRIMARY KEY,
    post_id INTEGER NOT NULL,
	title TEXT,
	content TEXT,
    lang VARCHAR(2)
);

ALTER TABLE "post_universal"
ADD CONSTRAINT "post_post_universal_fk" FOREIGN KEY (post_id) REFERENCES public.post (id);