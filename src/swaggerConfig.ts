import swaggerJSDoc from "swagger-jsdoc"
import { config } from "dotenv"

config()

export default swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Mini Blockchain EIEI",
            version: "1.0.0",
            description: "Express API Document (Swagger)"
        },
        servers: [{
            url: `http://localhost:${process.env.PORT}`
        }]
    },
    apis: ["dist/router.js"]
})