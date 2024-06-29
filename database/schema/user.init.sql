CREATE TABLE IF NOT EXISTS public.user (
	id VARCHAR(36) NOT NULL PRIMARY KEY,
	email VARCHAR(30) NOT NULL,
	username VARCHAR(30) NOT NULL,
	password VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS federated_credentials (
	id VARCHAR(36) PRIMARY KEY,
	user_id VARCHAR(36) NOT NULL,
	provider TEXT NOT NULL,
	subject TEXT NOT NULL,
	UNIQUE (provider, subject)
);

ALTER TABLE public.federated_credentials
ADD CONSTRAINT "user_credential_fk" FOREIGN KEY (user_id) REFERENCES public.user(id);
