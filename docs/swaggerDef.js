const bouquetCategories = ["roses", "mixed", "seasonal", "premium"];

export const apiDocsConfig = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Flora Boutique API",
            version: "1.0.0",
            description:
                "Official REST API documentation for the Flora flower boutique. Provides comprehensive endpoints for bouquets management, order processing, and customer feedbacks.",
        },
        servers: [
            { url: "http://localhost:3000", description: "Local development server" },
            { url: "https://flora-api-production.onrender.com", description: "Production server" },
        ],
        tags: [
            { name: "Bouquets", description: "Operations related to the bouquet catalogue" },
            { name: "Orders", description: "Endpoints for submitting customer orders" },
            { name: "Feedbacks", description: "Operations for client testimonials and feedback" },
        ],
        components: {
            schemas: {
                Bouquet: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 1 },
                        title: { type: "string", example: "Morning Dew" },
                        description: { type: "string", example: "A stunning mix of fresh spring flowers." },
                        price: { type: "number", example: 45 },
                        photoURL: { type: "string", example: "https://example.com/photos/morning-dew.jpg" },
                        favorite: { type: "boolean", example: false },
                        category: { type: "string", enum: bouquetCategories, example: "seasonal" },
                        image2x: { type: "string", example: "https://example.com/photos/morning-dew@2x.jpg" },
                        alt: { type: "string", example: "Morning Dew bouquet" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                BouquetCreate: {
                    type: "object",
                    required: ["title", "description", "price"],
                    properties: {
                        title: { type: "string", example: "Morning Dew" },
                        description: { type: "string", example: "A stunning mix of fresh spring flowers." },
                        price: { type: "number", example: 45 },
                        category: { type: "string", enum: bouquetCategories, example: "seasonal" },
                        favorite: { type: "boolean", example: false },
                        photoURL: { type: "string", example: "https://example.com/photos/morning-dew.jpg" },
                        image2x: { type: "string", example: "https://example.com/photos/morning-dew@2x.jpg" },
                        alt: { type: "string", example: "Morning Dew bouquet" },
                    },
                },
                BouquetUpdate: {
                    type: "object",
                    minProperties: 1,
                    properties: {
                        title: { type: "string" },
                        description: { type: "string" },
                        price: { type: "number" },
                        category: { type: "string", enum: bouquetCategories },
                        favorite: { type: "boolean" },
                        photoURL: { type: "string" },
                        image2x: { type: "string" },
                        alt: { type: "string" },
                    },
                },
                BouquetFavorite: {
                    type: "object",
                    required: ["favorite"],
                    properties: {
                        favorite: { type: "boolean", example: true },
                    },
                },
                Order: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 101 },
                        name: { type: "string", example: "Alice Smith" },
                        phone: { type: "string", example: "+15551234567" },
                        address: { type: "string", example: "Sydney, Floral Ave 456" },
                        message: { type: "string", example: "Please leave at the front door." },
                        product: { type: "string", example: "Morning Dew" },
                        quantity: { type: "integer", example: 2 },
                        agree: { type: "boolean", example: true },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                OrderCreate: {
                    type: "object",
                    required: ["name", "phone"],
                    properties: {
                        name: { type: "string", example: "Alice Smith" },
                        phone: { type: "string", example: "+15551234567" },
                        address: { type: "string", example: "Sydney, Floral Ave 456" },
                        message: { type: "string", example: "Please leave at the front door." },
                        product: { type: "string", example: "Morning Dew" },
                        quantity: { type: "integer", example: 2 },
                        agree: { type: "boolean", example: true },
                    },
                },
                Feedback: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 12 },
                        text: { type: "string", example: "The flowers were absolutely gorgeous and fresh!" },
                        author: { type: "string", example: "Sarah C." },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                FeedbackCreate: {
                    type: "object",
                    required: ["text", "author"],
                    properties: {
                        text: { type: "string", example: "The flowers were absolutely gorgeous and fresh!" },
                        author: { type: "string", example: "Sarah C." },
                    },
                },
                FeedbackUpdate: {
                    type: "object",
                    minProperties: 1,
                    properties: {
                        text: { type: "string" },
                        author: { type: "string" },
                    },
                },
                Error: {
                    type: "object",
                    properties: {
                        message: { type: "string", example: "Resource not found" },
                    },
                },
            },
        },
    },
    apis: ["./routes/api/*.js"],
};