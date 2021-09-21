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
};
