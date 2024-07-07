CREATE TABLE IF NOT EXISTS public.category (
	id serial PRIMARY KEY,
	name TEXT NOT NULL,
	program_id INTEGER NOT NULL,
	total_post INTEGER DEFAULT 0
);

ALTER TABLE "category"
ADD CONSTRAINT "category_program_fk" FOREIGN KEY (program_id) REFERENCES public.program (id);

INSERT INTO public.category (name, program_id) VALUES
('MBA', 1), ('Essay Writing', 1), ('MBA Rankings', 1), ('MBA Interviews', 1),
('School Information', 1),  ('Resume', 1), ('Recommendation Letter', 1), ('Application FAQ', 1),
('Application Summary', 1), ('Application Strategy', 1);
