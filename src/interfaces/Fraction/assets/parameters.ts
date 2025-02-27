import {importAllImagesFromFolder} from "../../../utils/images";

export const Parameters = importAllImagesFromFolder(
  require.context('./images/parameters/', false, /.svg$/)
)