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
