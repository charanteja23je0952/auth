import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Authentication API",
            version: "1.0.0",
            description: "API documentation for the Authentication project"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ],
        components: {
            schemas: {
                SignupBody: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "user@gmail.com"
                        },
                        password: {
                            type: "string",
                            minLength: 6,
                            example: "password123"
                        }
                    }
                },
                LoginBody: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "user@gmail.com"
                        },
                        password: {
                            type: "string",
                            example: "password123"
                        }
                    }
                },
                EditProfileBody: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "user@gmail.com"
                        },
                        data: {
                            type: "string",
                            example: "Some user data"
                        }
                    }
                },
                AdminEditBody: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "user@gmail.com"
                        },
                        role: {
                            type: "string",
                            enum: ["user", "admin"],
                            example: "user"
                        },
                        data: {
                            type: "string",
                            example: "Some user data"
                        }
                    }
                },
                UserResponse: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "user@gmail.com"
                        },
                        role: {
                            type: "string",
                            enum: ["user", "admin"],
                            example: "user"
                        },
                        data: {
                            type: "string",
                            example: "Some user data"
                        }
                    }
                },
                SuccessResponse: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Operation successful"
                        },
                        data: {
                            type: "object"
                        }
                    }
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Error message"
                        },
                        status: {
                            type: "number",
                            example: 400
                        }
                    }
                }
            }
        }
    },
    apis: [
        "./src/features/**/*.ts"
    ]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;