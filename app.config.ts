export default ({ config }) => {
  return {
    ...config,
    extra: {
      OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      eas: {
        projectId: "d81ca170-6a7f-421f-a4d9-47043ac31143"
      }
    },
    owner: "hoakin",
    android: {
      ...config.android,
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
  };
};
