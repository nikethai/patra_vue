const api = {
  profile: {
    get: `${process.env.VUE_APP_API_URL}/api/v0/users/:username`
  }
};

export default api;
