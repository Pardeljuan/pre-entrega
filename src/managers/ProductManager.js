import { generateId } from "../utils/collectionHandler.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import paths from '../utils/paths.js';
import { convertToBool } from "../utils/converter.js";
import ErrorManager from "./ErrorManager.js";

export default class ProductManager {
    #jsonFilename;
    #products;

    constructor () {
        this.#jsonFilename = "products.json"
    }

    async #findOneById(id) {
       this.#products = await this.getAll();
       const productFound = this.#products.find((item) => item.id === Number(id));
       if (!productFound){
        throw new ErrorManager ("Id no encontrado", 404);
       }
       return productFound;
    }
    async getAll() {
        try {
            this.#products = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#products
        } catch (error) {
            throw new ErrorManager (error.message, error.code);
        }
    }
    async getOneById(id) {
        try {
            const productFound = await this.#findOneById(id);
            return productFound;
        } catch (error) {
            throw new ErrorManager (error.message, error.code);
        }
    }
    async insertOne(data, file) {
        try {
            const {title, status, stock} = data;

            if (!title || !status || !stock){
                throw new ErrorManager ("Id no encontrado", 400);
            }
            const product = {
                id: generateId( await this.getAll()),
                title,
                status: convertToBool(status),
                stock: Number(stock),
                thumbnail: file?.filename ?? null,
            };

            this.#products.push(product);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products )
            return product;
        } catch (error) {
            throw new ErrorManager (error.message, error.code);
        }
    }
    async updateOneById(id, data) {
        try {
            const {title, status, stock} = data;
            const productFound = await this.#findOneById(id);

            const product = {
                id: productFound.id,
                title: title || productFound.title,
                status: status ? convertToBool(status) : productFound.status,
                stock: stock ? Number(stock) : productFound.stock,
            };
            const index = this.#products.findIndex((item) => item.id === Number(id));
            this.#products[index] = product;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products )

            return product;
        } catch (error) {
            throw new ErrorManager (error.message, error.code);v
        }
    }async deleteOneById(id) {
        try {
            await this.#findOneById(id);

            const index = this.#products.findIndex((item) => item.id === Number(id));
            this.#products.splice(index, 1);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products )
        } catch (error) {
            throw new ErrorManager (error.message, error.code);
        }
    }
}

