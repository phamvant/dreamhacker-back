CREATE TABLE comment (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL,
    parent_id INTEGER,
    user_id VARCHAR(36) NOT NULL,
    content TEXT NOT NULL,
    upvote INTEGER DEFAULT 0,
    downvote INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE comment ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.user(id) ON DELETE CASCADE;
ALTER TABLE comment ADD CONSTRAINT fk_parent FOREIGN KEY (parent_id) REFERENCES public.comment(id) ON DELETE CASCADE;