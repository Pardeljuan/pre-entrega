import { generateId } from "../utils/collectionHandler.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import paths from '../utils/paths.js';
import { convertToBool } from "../utils/converter.js";
import ErrorManager from "./ErrorManager.js";

export default class ProducManager {
    #jsonFilename;
    #producs;

    constructor () {
        this.#jsonFilename = "producs.json"
    }

    async #findOneById(id) {
       this.#producs = await this.getAll();
       const producFound = this.#producs.find((item) => item.id === Number(id));
       if (!producFound){
        throw new ErrorManager ("Id no encontrado", 404);
       }
       return producFound;
    }
    async getAll() {
        try {
            this.#producs = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#producs
        } catch (error) {
            throw new ErrorManager (error.message, error.code);
        }
    }
    async getOneById(id) {
        try {
            const producFound = await this.$findOneById(id);
            return producFound;
        } catch (error) {
            throw new ErrorManager (error.message, error.code);
        }
    }
    async insertOne(data) {
        try {
            const {title, status, stock} = data;
            if (!title || !status || !stock){
                throw new ErrorManager ("Id no encontrado", 400);
            }
            const produc = {
                id: generateId( await this.getAll()),
                title,
                status,
                stock,
            };
            this.#producs.push(produc);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#producs )
            return produc;
        } catch (error) {
            throw new ErrorManager (error.message, error.code);
        }
    }
    async updateOneById(id, data) {
        try {
            const {title, status, stock} = data;
            const producFound = await this.$findOneById(id);

            const produc = {
                id: producFound.id,
                title: title || producFound.title,
                status: status ? convertToBool(status) : producFound.status,
                stock: stock ? Number(stock) : producFound.stock,
            };
            const index = this.#producs.findIndex((item) => item.id === Number(id));
            this.#producs[index] = produc;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#producs )

            return produc;
        } catch (error) {
            throw new ErrorManager (error.message, error.code);v
        }
    }async deleteOneById(id) {
        try {
            await this.$findOneById(id);

            const index = this.#producs.findIndex((item) => item.id === Number(id));
            this.#producs.splice(index, 1);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#producs )
        } catch (error) {
            throw new ErrorManager (error.message, error.code);
        }
    }
}

