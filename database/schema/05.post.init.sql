CREATE TABLE IF NOT EXISTS public.post (
	id serial PRIMARY KEY,
	title TEXT NOT NULL,
	content TEXT,
	is_scrap BOOLEAN DEFAULT TRUE,
	category_id INTEGER,
	is_published BOOLEAN DEFAULT FALSE,
	author_id VARCHAR(36)
);

ALTER TABLE "post"
ADD CONSTRAINT "post_category_fk" FOREIGN KEY (category_id) REFERENCES public.category (id);

ALTER TABLE "post"
ADD CONSTRAINT "post_user_fk" FOREIGN KEY (author_id) REFERENCES public.user (id);

CREATE OR REPLACE FUNCTION increment_post_count() RETURNS TRIGGER AS $$
BEGIN
    UPDATE category SET total_post = total_post + 1 WHERE id=NEW.category_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrement_post_count() RETURNS TRIGGER AS $$
BEGIN
    UPDATE category SET total_post = total_post - 1 WHERE id=OLD.category_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER increment_post_count_trigger
AFTER INSERT ON post
FOR EACH ROW EXECUTE FUNCTION increment_post_count();

CREATE TRIGGER decrement_post_count_trigger
AFTER DELETE ON post
FOR EACH ROW EXECUTE FUNCTION decrement_post_count();
