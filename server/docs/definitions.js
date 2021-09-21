module.exports = {
  LoginRequest: {
    type: "object",
    properties: {
      username: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
  },
  LoginResponse: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      firstName: {
        type: "string",
      },
      lastName: {
        type: "string",
      },
      username: {
        type: "string",
      },
      token: {
        type: "string",
      },
      interests: {
        type: "array",
        items: {},
      },
      dob: {
        type: "string",
        format: "date",
      },
    },
  },
  RegisterRequest: {
    type: "object",
    properties: {
      firstName: {
        type: "string",
      },
      lastName: {
        type: "string",
      },
      username: {
        type: "string",
      },
      token: {
        type: "string",
      },
      interests: {
        type: "array",
        items: {},
      },
      dob: {
        type: "string",
        format: "date",
      },
      password: {
        type: "string",
      },
    },
  },
  RegisterResponse: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      firstName: {
        type: "string",
      },
      lastName: {
        type: "string",
      },
      username: {
        type: "string",
      },
      token: {
        type: "string",
      },
      interests: {
        type: "array",
        items: {},
      },
      dob: {
        type: "string",
        format: "date",
      },
    },
  },
};
