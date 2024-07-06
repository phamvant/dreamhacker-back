interface Configuration {
  development: ConfigArgs;
  production: ConfigArgs;
}

interface ConfigArgs {
  ENV: string;
  FRONTEND_URL: string;
  DB: {
    HOST: string;
    PORT: number;
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
  AWS?: {
    ACCESS_KEY_ID: string;
    SECRET_ACCESS_KEY: string;
    REGION: string;
  };
}

const production: ConfigArgs = {
  ENV: "production",
  FRONTEND_URL: process.env.FRONTEND_URL,
  DB: {
    HOST: process.env.DB_HOST,
    PORT: Number(process.env.DB_PORT),
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
  AWS: {
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    REGION: process.env.AWS_REGION,
  },
};

const development: ConfigArgs = {
  ENV: "development",
  FRONTEND_URL: process.env.FRONTEND_URL_DEV,
  DB: {
    HOST: process.env.DEV_DB_HOST || "localhost",
    PORT: Number(process.env.DEV_DB_PORT) || 5432,
    NAME: process.env.DEV_DB_NAME || "dreamhacker",
    USER: process.env.DEV_DB_USER || "dreamhacker-admin",
    PASSWORD: process.env.DEV_DB_PASSWORD || "thuan286",
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
  AWS: {
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    REGION: process.env.AWS_REGION,
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
