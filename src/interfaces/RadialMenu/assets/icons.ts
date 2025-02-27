import { importAllImagesFromFolder } from "../../../utils/images";

export const Icons = importAllImagesFromFolder(
  require.context("./images/icons/", false, /.svg$/),
);
