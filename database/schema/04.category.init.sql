CREATE TABLE IF NOT EXISTS public.category (
	id serial PRIMARY KEY,
	name TEXT NOT NULL,
	program_id INTEGER NOT NULL,
	total_post INTEGER DEFAULT 0
);

ALTER TABLE "category"
ADD CONSTRAINT "category_program_fk" FOREIGN KEY (program_id) REFERENCES public.program (id);

INSERT INTO public.category (name, program_id) VALUES
('MBA', 1), ('Essay写作', 1), ('MBA排名', 1), ('MBA面试', 1), ('学校信息', 1),  ('Resume', 1), ('推荐信', 1), ('申请FAQ', 1), ('申请总结', 1), ('申请策略', 1);
