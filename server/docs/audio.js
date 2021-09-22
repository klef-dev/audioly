module.exports = {
  "/audio": {
    get: {
      tags: ["Audio"],
      summary: "Retrieves audio tracks",
      description: "Retrieves all audio tracks",
      operationId: "index",
      produces: ["application/json"],
      responses: {
        200: {
          description: "Audio tracks were successfully retrieved",
          schema: {
            $ref: "#/definitions/AudiosResponse",
          },
        },
      },
    },
    post: {
      tags: ["Audio"],
      summary: "Add audio track",
      description: "Add audio track to the database",
      operationId: "store",
      consumes: ["multipart/form-data"],
      produces: ["application/json"],
      parameters: [
        {
          in: "formData",
          name: "file",
          type: "file",
          required: true,
          description: "Audio object to be added",
        },
        {
          in: "formData",
          name: "caption",
          type: "string",
          required: true,
        },
        {
          in: "formData",
          name: "dob",
          type: "string",
          required: true,
        },
        {
          in: "formData",
          name: "interests",
          type: "string",
          required: true,
        },
      ],
      responses: {
        200: {
          description: "Audio added successfully",
          schema: {
            $ref: "#/definitions/BaseResponse",
          },
        },
      },
    },
  },
  "/audio/{id}": {
    get: {
      tags: ["Audio"],
      summary: "Retrieves single audio track",
      description: "Retrieves single audio track and renders it",
      operationId: "show",
      produces: ["application/json"],
      parameters: [
        {
          in: "path",
          name: "filename",
          description: "filename of the audio to retrieve",
        },
      ],
      responses: {
        200: {
          description: "Audio retrieved successfully",
        },
      },
    },
  },
};
