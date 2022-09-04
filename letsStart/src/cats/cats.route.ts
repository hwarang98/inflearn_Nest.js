// 고양이 라우터
import { Cat, CatType } from "./cats.model";
import { Router } from "express";
import {
  createCat,
  deleteCat,
  patchCat,
  putCat,
  readAllCat,
  readCat,
} from "./cat.service";
const router = Router();

router.get("/cats", readAllCat);
router.get("/cats/:id", readCat);
router.post("/cats", createCat);
router.put("/cats/:id", putCat);
router.patch("/cats/:id", patchCat);
router.delete("/cats/:id", deleteCat);

export default router;
