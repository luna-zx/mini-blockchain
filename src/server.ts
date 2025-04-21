import { config } from "dotenv"
import express from "express"
import BlockchainService from "./services/Blockchain"
import { connect } from "mongoose"
import swaggerUI from "swagger-ui-express"
import swaggerConfig from "./swaggerConfig"
import router from "./router"

config()
const app = express()
export const blockchain = new BlockchainService()

app.use(express.json())
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerConfig))
app.use("/", router)

void (async () => {
    try {
        await connect(process.env.MONGO_URL as string)
        const chain = await blockchain.getChain()
        if (chain.length === 0) await blockchain.createGenesisBlock()

        app.listen(Number(process.env.PORT), () => {
            console.log(`App started on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error(error)
    }
})()