CREATE TABLE like (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.user(id),
    FOREIGN KEY (post_id) REFERENCES public.post(id),
    UNIQUE (user_id, post_id)
);