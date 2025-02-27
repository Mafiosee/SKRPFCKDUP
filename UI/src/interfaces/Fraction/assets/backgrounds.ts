import {importAllImagesFromFolder} from "../../../utils/images";

export const Backgrounds = importAllImagesFromFolder(
  require.context('./images/backgrounds/', false, /.png$/)
)