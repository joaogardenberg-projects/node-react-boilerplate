const config = {
  BASE_BACKEND_URL: process.env.REACT_APP_BASE_BACKEND_URL,
  NODE_ENV: process.env.NODE_ENV
}

Object.keys(config).forEach((key) => {
  !config[key] &&
    console.warn(
      `[WARNING] There is no REACT_APP_${key} environment variable set!`
    )
})

export default config
