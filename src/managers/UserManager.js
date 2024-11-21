import { generateId } from "../utils/collectionHandler.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import paths from '../utils/paths.js';
import ErrorManager from "./ErrorManager.js";

export default class UserManager {
    #jsonFilename;
    #users;

    constructor () {
        this.#jsonFilename = "users.json"
    }

    async #findOneById(id) {
       this.#users = await this.getAll();
       const userFound = this.#users.find((item) => item.id === Number(id));
       if (!userFound){
        throw new ErrorManager ("Id no encontrado", 404);
       }
       return userFound;
    }
    async getAll() {
        try {
            this.#users = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#users
        } catch (error) {
            throw new ErrorManager (error.message, error.code);
        }
    }
    async getOneById(id) {
        try {
            const userFound = await this.$findOneById(id);
            return userFound;
        } catch (error) {
            throw new ErrorManager (error.message, error.code);
        }
    }
    async insertOne(data) {
        try {
            const products = data?.products?.map(((item) => {
                return { product: Number(item.product), quantity: 1}
            }));

            const user = {
                id: generateId( await this.getAll()),
                products: products || [],
            };
            this.#users.push(user);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#users )
            return user;
        } catch (error) {
            throw new ErrorManager (error.message, error.code);
        }
    }

    // Agrega un usuario
    addOneIngredient = async (id, productId) => {
        try {
            const userFound = await this.#findOneById(id);
            const productIndex = userFound.products.findIndex((item) => item.product === Number(productId));

            if (productIndex >= 0) {
                userFound.products[productIndex].quantity++;
            } else {
                userFound.products.push({ product: Number(productId), quantity: 1 });
            }

            const index = this.#users.findIndex((item) => item.id === Number(id));
            this.#users[index] = userFound;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#users);

            return userFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    };
}

