import express from "express";
import { Tree, Node } from "../data/tree.mjs";

const treeRouter = express.Router();
const tree = new Tree(""); // Riktig måte å opprette et nytt tre på

treeRouter.use(express.json());

treeRouter.get("/", (req, res, next) => {
    req.session["tre"] = "Eik";
    res.json(tree);
});

export default treeRouter;
