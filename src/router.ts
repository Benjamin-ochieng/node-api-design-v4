import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  getManyProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./handlers/product";
import {
  createUpdate,
  getManyUpdates,
  getOneUpdate,
  updateUpdate,
  deleteUpdate,
  deleteUpdate2,
} from "./handlers/update";
const router = Router();

/**products */
router.get("/products", getManyProducts);
router.get("/products/:id", getOneProduct);
router.put(
  "/products/:id",
  [body("name").isString(), handleInputErrors],
  updateProduct
);
router.post(
  "/products",
  [body("name").isString(), handleInputErrors],
  createProduct
);
router.delete("/products/:id", deleteProduct);

/**updates */
router.get("/updates", getManyUpdates);
router.get("/updates/:id", getOneUpdate);
router.put(
  "/updates/:id",
  [
    body("title").optional().isString(),
    body("body").optional().isString(),
    body("status")
      .isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"])
      .optional()
      .isString(),
    body("version").optional().isString(),
    handleInputErrors,
  ],
  updateUpdate
);
router.post(
  "/updates",
  [
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("productId").exists().isString(),
    handleInputErrors,
  ],
  createUpdate
);
router.delete("/updates/:id", deleteUpdate2);

/**Update points */
router.get("/update-points", () => {});
router.get("/update-points/:id", () => {});
router.put(
  "/update-points/:id",
  [
    body("name").optional().isString(),
    body("description").optional().isString(),
    handleInputErrors,
  ],
  () => {}
);
router.post(
  "/update-points",
  [
    body("name").isString(),
    body("description").isString(),
    body("updateId").exists().isString(),
    handleInputErrors,
  ],
  () => {}
);
router.delete("/update-points/:id", () => {});

export default router;
