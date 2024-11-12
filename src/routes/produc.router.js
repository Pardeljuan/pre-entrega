import { Router } from "express";
import ProducManager from "../../src/managers/ProducManager.js";

const router = Router();
const producManager = new ProducManager();

router.get("/", async (req, res) => {
    try {
        const producs = await producManager.getAll();
        res.status(200).json({ status: "success", payload: producs });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const produc = await producManager.getOneById(req.params?.id);
        res.status(200).json({ status: "success", payload: produc });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message});
    }
});

router.post("/", async (req, res) => {
    try {
        const produc = await producManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: produc });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message});
    }
});

router.put("/:id", async (req, res) => {
    try {
        const produc = await producManager.updateOneById(req.params?.id, req.body);
        res.status(200).json({ status: "success", payload: produc });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await producManager.deleteOneById(req.params?.id);
        res.status(200).json({ status: "success"});
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message});
    }
});

export default router;

