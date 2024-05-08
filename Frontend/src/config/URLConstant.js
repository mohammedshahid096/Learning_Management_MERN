const config_urls = {
  local: "http://localhost:3000/api/v1",
  development: "http://localhost:8000/api/v1",
  production: import.meta.env.VITE_SERVER_URL_API,
};

export const URLConstant = config_urls[import.meta.env.VITE_DEVELOPMENT_MODE];
