import { Router } from "express";

import { indexController, mensajes } from "../controllers/index.controller";

const router = Router();

router.route("/").get(indexController);
router.route("/dist").get(mensajes);

export default router;
