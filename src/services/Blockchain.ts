import DatabaseService from "./Database"
import Block from "../model/Block"
import crypto from "crypto"
import { Block as TBlock } from "../types/Block"

export default class BlockchainService {
    private block

    constructor() {
        this.block = new DatabaseService<TBlock>(Block)
    }

    async createGenesisBlock(): Promise<TBlock> {
        const genesisBlock = { index: 0, timestamp: new Date(), data: "genesis_block",  previousHash: "0" }
        return await this.block.create({
            ...genesisBlock,
            hash: this.computeHash(genesisBlock)
        })
    }

    private computeHash({ index, timestamp, data, previousHash }: Omit<TBlock, "hash">): string {
        const rawData: string = index + timestamp.toISOString() + JSON.stringify(data) + previousHash
        return crypto.createHash("sha256").update(rawData).digest("hex")
    }

    async getLatestBlock(): Promise<TBlock | null> {
        return await this.block.get({}, { index: -1 })
    }

    async addBlock(data: any): Promise<TBlock> {
        let prevBlock = await this.getLatestBlock()
        if (!prevBlock) prevBlock = await this.createGenesisBlock()
        const newBlock = { index: prevBlock.index + 1, timestamp: new Date(), data, previousHash: prevBlock.hash }
        return await this.block.create({
            ...newBlock,
            hash: this.computeHash(newBlock)
        })
    }

    async getChain(): Promise<TBlock[]> {
        return await this.block.getMany({}, { index: 1 })
    }

    async validateChain(): Promise<boolean> {
        const chain = await this.getChain()
        for (let i = 1; i < chain.length; i++) {
            const current = chain[i]
            const previous = chain[i - 1]
            if (current.hash !== this.computeHash(current)) return false
            if (current.previousHash !== previous.hash) return false
        }
        return true
    }
}