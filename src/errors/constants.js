export default {
  commons: {
    internalServerError: {
      type: "Internal Server Error",
      detail: "Internal Server Error: Something went wrong!!!",
    },
    badRequest: {
      type: "Bad Request",
      detail: "Bad Request: Parameters missing",
    },
  },
  createProject: {
    badRequest: {
      type: "Bad Request",
      detail: "Bad Request: Parameter(s) Missing",
      expected: [
        {
          name: "projectId",
          type: "body",
          dataType: "string",
        },
        {
          name: "name",
          type: "body",
          dataType: "string",
        },
        {
          name: "description",
          type: "body",
          dataType: "string",
        },
        {
          name: "visibility",
          type: "body",
          dataType: "string",
        },
      ],
    },
  },
  deleteProject: {
    badRequest: {
      type: "Bad Request",
      detail: "Bad Request: Parameter(s) Missing",
      expected: [
        {
          name: "projectId",
          type: "uri param",
          dataType: "string",
        },
      ],
    },
  },
  getProject: {
    badRequest: {
      type: "Bad Request",
      detail: "Bad Request: Parameter(s) Missing",
      expected: [
        {
          name: "projectId",
          type: "uri param",
          dataType: "string",
        },
      ],
    },
  },
  updateProject: {
    badRequestMissingProjectId: {
      type: "Bad Request",
      detail: "Bad Request: ProjectId Missing",
      expected: [
        {
          name: "projectId",
          type: "uri param",
          dataType: "string",
        },
      ],
    },
    badRequest: {
      type: "Bad Request",
      detail: "Bad Request: Update Params Missing",
      expected: [
        {
          name: "name",
          type: "body",
          dataType: "string",
        },
        {
          name: "description",
          type: "body",
          dataType: "string",
        },
        {
          name: "visibility",
          type: "body",
          dataType: "string",
        },
      ],
    },
  },
};
