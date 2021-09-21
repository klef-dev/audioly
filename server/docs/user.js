module.exports = {
  "/user/login": {
    post: {
      tags: ["User"],
      summary: "Authenticate user",
      description: "Login user",
      operationId: "login",
      consumes: ["application/json"],
      produces: ["application/json"],
      parameters: [
        {
          in: "body",
          name: "body",
          description: "Login object to be added",
          schema: {
            $ref: "#/definitions/LoginRequest",
          },
        },
      ],
      responses: {
        200: {
          description: "Logged in successfully",
          schema: {
            $ref: "#/definitions/LoginResponse",
          },
        },
      },
    },
  },
  "/user/register": {
    post: {
      tags: ["User"],
      summary: "Register user",
      description: "Register user",
      operationId: "register",
      consumes: ["application/json"],
      produces: ["application/json"],
      parameters: [
        {
          in: "body",
          name: "body",
          description: "Register object to be added",
          schema: {
            $ref: "#/definitions/RegisterRequest",
          },
        },
      ],
      responses: {
        200: {
          description: "Successfully registered",
          schema: {
            $ref: "#/definitions/RegisterResponse",
          },
        },
      },
    },
  },
};
