CREATE TABLE IF NOT EXISTS public.category (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	program_id INTEGER NOT NULL,
	total_post INTEGER DEFAULT 0
);

ALTER TABLE "category"
ADD CONSTRAINT "category_program_fk" FOREIGN KEY (program_id) REFERENCES public.program (id);

INSERT INTO public.category (id, name, program_id) VALUES
(11, 'School Information', 1),  
(12, 'MBA Rankings', 1), 
(13, 'Application FAQ', 1),
(14, 'Application Strategy', 1),
(15, 'Resume', 1), 
(16, 'Recommendation Letter', 1), 
(17, 'Essay Writing', 1), 
(18, 'MBA Interviews', 1),
(19, 'Application Summary', 1);

INSERT INTO public.category (id, name, program_id) VALUES
(20, 'School Introduction', 2), 
(21, 'Major and Ranking', 2), 
(22, 'Application FAQ', 2),
(23, 'Recommendation Letter', 2),  
(24, 'PS/Resume', 2), 
(25, 'Business Interview', 2), 
(26, 'Application Summary', 2);

INSERT INTO public.category (id, name, program_id) VALUES
(30, 'Business School Intro', 3), 
(31, 'Ranking', 3), 
(32, 'Application FAQ', 3), 
(33, 'Recommendation Letter', 3),
(34, 'Application Summary', 3),
(35, 'PhD Study Experience', 3), 
(36, 'PhD Interview', 3);
