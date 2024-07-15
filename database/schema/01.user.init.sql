CREATE TABLE IF NOT EXISTS public.user (
	id VARCHAR(36) PRIMARY KEY,
	email VARCHAR(30) NOT NULL,
	username VARCHAR(30) NOT NULL,
    avatar TEXT,
	password VARCHAR(50),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS federated_credentials (
	id serial PRIMARY KEY,
	user_id VARCHAR(36) NOT NULL,
	provider TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role (
    id INTEGER PRIMARY KEY,
    role_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE user_roles (
    user_id VARCHAR(36),
    role_id INTEGER,
    PRIMARY KEY (user_id, role_id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE user_roles
ADD CONSTRAINT "user_roles_user_fk" FOREIGN KEY (user_id) REFERENCES public.user(id)
ON DELETE CASCADE;

ALTER TABLE user_roles
ADD CONSTRAINT "user_roles_role_fk" FOREIGN KEY (role_id) REFERENCES public.role(id)
ON DELETE CASCADE;

CREATE TABLE permission (
    id SERIAL PRIMARY KEY,
    permission_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE role_permissions (
    role_id INTEGER,
    permission_id INTEGER,
    PRIMARY KEY (role_id, permission_id)
);

ALTER TABLE role_permissions
ADD CONSTRAINT "role_permissions_role" FOREIGN KEY (role_id) REFERENCES public.role(id)
ON DELETE CASCADE;

ALTER TABLE role_permissions
ADD CONSTRAINT "role_permissions_permission" FOREIGN KEY (permission_id) REFERENCES public.permission(id)
ON DELETE CASCADE;

ALTER TABLE public.federated_credentials
ADD CONSTRAINT "user_credential_fk" FOREIGN KEY (user_id) REFERENCES public.user(id);

INSERT INTO role (id, role_name) VALUES (1, 'ADMIN'), (2, 'MODDER'), (3, 'USER');

INSERT INTO "public"."user" ("id", "email", "username", "password", "avatar") VALUES
('108543290814069582461', 'pham.t.286.01@gmail.com', 'Thuận Phạm', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocJv_b-X7zzY0JwIAXBg0Y2VUI7AEbqIIp_LGtAeF8KyqMS5YPm4oA=s96-c');

INSERT INTO "public"."federated_credentials" ("user_id", "provider") VALUES
('108543290814069582461', 'google');

INSERT INTO user_roles (user_id, role_id)
VALUES ((SELECT id FROM public.user WHERE id='108543290814069582461'),
        (SELECT id FROM public.role WHERE role_name='ADMIN'));
