module.exports = {
  BaseResponse: {
    type: "object",
    properties: {
      caption: {
        type: "string",
      },
      filename: {
        type: "string",
      },
      fileId: {
        type: "string",
      },
      user: {
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
          createdAt: {
            type: "string",
            format: "date",
          },
          updatedAt: {
            type: "string",
            format: "date",
          },
        },
      },
      createdAt: {
        type: "string",
        format: "date",
      },
      updatedAt: {
        type: "string",
        format: "date",
      },
    },
  },
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
  AudiosResponse: {
    type: "object",
    properties: {
      caption: {
        type: "string",
      },
      filename: {
        type: "string",
      },
      fileId: {
        type: "string",
      },
      user: {
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
          createdAt: {
            type: "string",
            format: "date",
          },
          updatedAt: {
            type: "string",
            format: "date",
          },
        },
      },
      createdAt: {
        type: "string",
        format: "date",
      },
      updatedAt: {
        type: "string",
        format: "date",
      },
    },
  },
  AddAudioRequest: {
    type: "object",
    properties: {
      caption: {
        type: "string",
      },
      file: {
        "audio/mpeg": {
          schema: {
            type: "string",
            format: "binary",
          },
        },
      },
    },
  },
};
