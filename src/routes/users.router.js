import { Router } from "express";
import UserManager from "../managers/UserManager.js";

const router = Router();
const userManager = new UserManager();

// Ruta para obtener 
router.get("/", async (req, res) => {
    try {
        const users = await userManager.getAll(req.query);
        res.status(200).json({ status: "success", payload: users });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

// Ruta para obtener 
router.get("/:id", async (req, res) => {
    try {
        const user = await userManager.getOneById(req.params.id);
        res.status(200).json({ status: "success", payload: user });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

// Ruta para crear 
router.post("/", async (req, res) => {
    try {
        const user = await userManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: user });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

// Ruta para incrementar en una unidad o agregar 
router.post("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const user = await userManager.addOneIngredient(cid, pid, quantity || 1);
        res.status(200).json({ status: "success", payload: user });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

export default router;