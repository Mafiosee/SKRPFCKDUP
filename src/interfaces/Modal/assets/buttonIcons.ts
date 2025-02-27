import {importAllImagesFromFolder} from "../../../utils/images";

export const ButtonIcons = importAllImagesFromFolder(
  require.context('./images/buttonIcons/', false, /.svg$/)
)