import { Model, SortOrder } from "mongoose"

export default class DatabaseService<T> {
    private model: Model<T>

    constructor(model: Model<T>) {
        this.model = model
    }

    async get<K extends Partial<T>, R = T>(filter: K, sort?: Partial<Record<keyof T, SortOrder>>): Promise<R | null> {
        return await this.model.findOne(filter).sort(sort ? sort as { [key: string]: SortOrder } : {}).lean<R>()
    }

    async getMany<K extends Partial<T>, R = T>(filter: K, sort?: Partial<Record<keyof T, SortOrder>>): Promise<R[]> {
        return await this.model.find(filter).sort(sort ? sort as { [key: string]: SortOrder } : {}).lean<R>() as Promise<R[]>
    }

    async create(data: Omit<T, "_id" | "__v" | "createdAt" | "updatedAt">) {
        return await this.model.create(data)
    }
}