interface Configuration {
  development: ConfigArgs;
  production: ConfigArgs;
}

interface ConfigArgs {
  FRONTEND_URL: string;
  DB: {
    HOST: string;
    PORT: string;
    NAME: string;
    USER: string;
    PASSWORD: string;
  };
  APP: {
    PORT: number;
  };
  JWT: {
    SECRET: string;
  };
  AUTH0?: {
    GOOGLE: {
      CLIENT_ID: string;
      CLIENT_SECRET: string;
    };
  };
}

const production: ConfigArgs = {
  FRONTEND_URL: process.env.FRONTEND_URL_DEV,
  DB: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
  },
  APP: {
    PORT: Number(process.env.APP_PORT) || 8080,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
  },
  AUTH0: {
    GOOGLE: {
      CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
};

const development: ConfigArgs = {
  FRONTEND_URL: process.env.FRONTEND_URL_PRO,
  DB: {
    HOST: process.env.DEV_DB_HOST,
    PORT: process.env.DEV_DB_PORT,
    NAME: process.env.DEV_DB_NAME,
    USER: process.env.DEV_DB_USER,
    PASSWORD: process.env.DEV_DB_PASSWORD,
  },
  APP: {
    PORT: Number(process.env.DEV_APP_PORT) || 8080,
  },
  JWT: {
    SECRET: process.env.DEV_JWT_SECRET,
  },
  AUTH0: {
    GOOGLE: {
      CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
};

const configuration: Configuration = { production, development };
let env = process.env.NODE_ENV as keyof Configuration;

if (!configuration[env]) {
  console.warn(
    `Unknown NODE_ENV value "${env}". Defaulting to 'fallback' configuration.`,
  );
  env = "development";
}

export default configuration[env];
