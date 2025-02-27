import { Category } from "../../../shared/TattooShop/Category";

export const CategoryIcons: Record<Category, string> = {
  [Category.Head]: require("./images/categories/head.svg"),
  [Category.Body]: require("./images/categories/body.svg"),
  [Category.LeftHand]: require("./images/categories/leftHand.svg"),
  [Category.RightHand]: require("./images/categories/rightHand.svg"),
  [Category.LeftLeg]: require("./images/categories/leftLeg.svg"),
  [Category.RightLeg]: require("./images/categories/rightLeg.svg"),
};
