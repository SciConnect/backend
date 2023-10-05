const swaggerJsDoc = {
   swagger: "2.0",
   info: {
      version: "1.0.0",
      title: "Swagger documentation for CRUD application ",
      description:
         "Swagger documentation for CRUD application involving authentication and authorization",
      "terms of service": "http://swagger.io/terms/",
      schemes: ["localhost"],
      contact: {
         name: "Iradukunda Bertin",
         email: "iradukundabertin082@gmail.com",
      },
   },
   paths: {
      "/api/user/register": {
         post: {
            tags: ["register"],
            summary: "Documentation for rest apis ",
            consumes: ["application/json"],
            produces: ["application/json"],
            responses: {
               200: {
                  description: "successfully created a user",
               },
            },
            parameters: [
               {
                  in: "body",
                  name: "create a user",
                  description: "Createa a new user and is kept in the database",
                  properties: {
                     name: {
                        type: "string",
                        required: true,
                     },
                     email: {
                        type: "string",
                        required: true,
                        unique: true,
                     },
                     password: {
                        type: "string",
                        required: true,
                     },
                  },
               },
            ],
         },
      },
      "/api/user/login": {
         post: {
            tags: ["login"],
            summary: "login to your existing account",
            consumes: ["application/json"],
            produces: ["application/json"],
            responses: {
               200: {
                  description:
                     "login to existing account using email and password",
               },
            },
            parameters: [
               {
                  in: "body",
                  name: "Login to an account",
                  description:
                     "You are only authorized to login if you give valid credentials",
                  properties: {
                     email: {
                        type: "string",
                        required: true,
                        unique: true,
                     },
                     password: {
                        type: "string",
                        required: true,
                     },
                  },
               },
            ],
         },
      },
      "/api/users": {
         get: {
            tags: ["users"],
            summary: "display all users in database",
            description: "this api is used to get all users",
            consumes: ["application/json"],
            produces: ["application/json"],
            security: [
               {
                  Bearer: [],
               },
            ],
            responses: {
               200: {
                  description: "Here are all users available in database",
               },
            },
         },
      },
      "/api/user/{id}": {
         put: {
            tags: ["Update"],
            summary: "Update the existing user",
            description: "this api is used to update the user",
            consumes: ["application/json"],
            produces: ["application/json"],
            security: [
               {
                  Bearer: [],
               },
            ],
            parameters: [
               {
                  in: "path",
                  name: "id",
                  description: "user id",
                  type: "string",
                  required: true,
               },
               {
                  in: "body",
                  name: "body",
                  description: "update a user",
                  properties: {
                     name: {
                        type: "string",
                        required: true,
                     },
                     email: {
                        type: "string",
                        required: true,
                        unique: true,
                     },
                     password: {
                        type: "string",
                        required: true,
                     },
                  },
               },
            ],
         },
      },
      "/api/remove/{id}": {
         delete: {
            tags: ["delete"],
            summary: "api for delete a user",
            consumes: ["application/json"],
            produces: ["application/json"],
            responses: {
               200: {
                  description: "deleting a user ",
               },
            },
            security: [
               {
                  Bearer: [],
               },
            ],
            parameters: [
               {
                  in: "path",
                  name: "id",
                  description: "user id",
                  type: "string",
                  required: true,
               },
            ],
         },
      },
   },
   securityDefinitions: {
      Bearer: {
         in: "header",
         name: "Authorization",
         type: "apiKey",
      },
   },
};

export default swaggerJsDoc;
