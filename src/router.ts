import { Router } from "express"
import { blockchain } from "./server"

const router = Router()

/**
 * @openapi
 * /add-block:
 *   post:
 *     summary: Add a new block to the blockchain
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 example: "This is a new block"
 *     responses:
 *       200:
 *         description: Block added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 index:
 *                   type: number
 *                 timestamp:
 *                   type: string
 *                 data:
 *                   type: string
 *                 previousHash:
 *                   type: string
 *                 hash:
 *                   type: string
 */
router.post("/add-block", async (req, res) => {
    res.status(200).json(await blockchain.addBlock(req.body))
})

/**
 * @openapi
 * /chain:
 *   get:
 *     summary: Get the full blockchain
 *     responses:
 *       200:
 *         description: Returns the full blockchain
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   index:
 *                     type: number
 *                   timestamp:
 *                     type: string
 *                   data:
 *                     type: string
 *                   previousHash:
 *                     type: string
 *                   hash:
 *                     type: string
 */
router.get("/chain", async (req, res) => {
    res.status(200).json(await blockchain.getChain())
})

/**
 * @openapi
 * /validate:
 *   get:
 *     summary: Validate the blockchain
 *     responses:
 *       200:
 *         description: Returns whether the blockchain is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   example: true
 */
router.get("/validate", async (req, res) => {
    res.status(200).json({ valid: await blockchain.validateChain() })
})

export default router