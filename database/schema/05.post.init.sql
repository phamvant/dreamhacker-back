CREATE TABLE IF NOT EXISTS public.post (
	id serial PRIMARY KEY,
	category_id INTEGER,
	is_published BOOLEAN DEFAULT FALSE,
	author_id VARCHAR(36),
	likes INTEGER DEFAULT 0,
	total_comments INTEGER DEFAULT 0,
	saved INTEGER DEFAULT 0,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	clicked INTEGER DEFAULT 0
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

-- INSERT INTO "public"."post" ("id", "title", "content", "is_scrap", "category_id", "is_published", "author_id", "likes", "total_comments", "saved", "created_at") VALUES
-- (1, 'Grade Calculator : Calculate your grade in any class without the legwork', '# Grade Calculator : Calculate your grade in any class without the legwork

-- 💡 **Notion Tip:** Calculate your grade in any class without the legwork.

-- *   Your `Raw Score` is the grade you got without a late penalty.
-- *   The `Final Grade` calculates your late penalty. You can hide the late penalty column after you make sure the amount is correct.
-- *   If your late assignment was excused, check off the `Excused` property and your late penalty will be ignored.
-- *   The sum of grades beneath the `Weighted Grade` column is your grade in the class.
-- *   How the template works 🔎 **Days Late** This formula calculates the number of days between the due date and submission. In case of excused tardiness, correct the submission date or delete the formula and turn this column into a simple number.

-- `dateBetween(prop("Due"), prop("Submitted"), "days") * -1`

-- ## **Final Grade**

-- This formula takes late policies into consideration. It also accounts for any tardiness that''s been excused.

-- `prop("Grade") - prop("Days Late") * prop("Late Penalty") * 100 * toNumber(not prop("Excused"))`

-- ## **Class Grade**

-- This formula calculates points per assignment. The sum is your grade in the class.

-- `prop("Final Grade") * prop("Weighting")`

-- **Note**: If you modify any of the table''s properties, you''ll need to adjust the above formulas accordingly.

-- ↓ Click the button to add a new table for another course

-- [English 001](https://www.notion.so/7276349daaf34797953fee4a0f7c1965?pvs=21)
-- ', 'f', 1, 't', '108543290814069582461', 0, 0, 0, '2024-07-13 17:02:36.514984');
