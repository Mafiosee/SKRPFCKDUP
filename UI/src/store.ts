import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './interfaces/Auth/reducer'
import { notificationsReducer } from './interfaces/Notifications/reducer'
import { selectCharacterReducer } from './interfaces/SelectCharacter/reducer'
import { devConsoleReducer } from './interfaces/DevConsole/reducer'
import { createCharacterReducer } from './interfaces/CreateCharacter/reducer'
import { selectSpawnReducer } from './interfaces/SelectSpawn/reducer'
import { escMenuReducer } from './interfaces/EscMenu/reducer'
import { hudReducer } from './interfaces/Hud/reducer'
import { dateTimeReducer } from './reducers/datetime'
import { radialMenuReducer } from './interfaces/RadialMenu/reducer'
import { inventoryReducer } from './interfaces/Inventory/reducer'
import { blacksmithReducer } from './interfaces/Blacksmith/reducer'
import { animationsReducer } from './interfaces/Animations/reducer'
import { tradeReducer } from './interfaces/Trade/reducer'
import { enchantTableReducer } from './interfaces/EnchantTable/reducer'
import { smelterReducer } from './interfaces/Smelter/reducer'
import { tanningReducer } from './interfaces/Tanning/reducer'
import { workbenchReducer } from './interfaces/Workbench/reducer'
import { alchemyTableReducer } from './interfaces/AlchemyTable/reducer'
import { sellResourceReducer } from './interfaces/SellResource/reducer'
import { npcShopReducer } from './interfaces/NpcShop/reducer'
import { fishingGameReducer } from './interfaces/FishingGame/reducer'
import { chooseWorkTypeReducer } from './interfaces/ChooseWorkType/reducer'
import { sawmillGameReducer } from './interfaces/SawmillGame/reducer'
import { bankReducer } from './interfaces/Bank/reducer'
import { chequeReducer } from './interfaces/Cheque/reducer'
import { bizControlReducer } from './interfaces/BizControl/reducer'
import { contractsReducer } from './interfaces/Contracts/reducer'
import { contractReducer } from './interfaces/Contract/reducer'
import { honeyFactoryReducer } from './interfaces/HoneyFactory/reducer'
import { mineGameReducer } from './interfaces/MineGame/reducer'
import { moonReedGameReducer } from './interfaces/MoonReedGame/reducer'
import { cookingSkumaGameReducer } from './interfaces/CookingSkumaGame/reducer'
import { pourSkumaGameReducer } from './interfaces/PourSkumaGame/reducer'
import { donateStoreReducer } from './interfaces/DonateStore/reducer'
import { casesReducer } from './interfaces/Cases/reducer'
import { houseSystemReducer } from './interfaces/HouseSystem/reducer'
import { createGuildReducer } from './interfaces/CreateGuild/reducer'
import { fractionReducer } from './interfaces/Fraction/reducer'
import { modalReducer } from './interfaces/Modal/reducer'
import { adBoardReducer } from './interfaces/AdBoard/reducer'
import { npcDialogReducer } from './interfaces/NpcDialog/reducer'
import { manufacturingBusinessReducer } from './interfaces/ManufacturingBusiness/reducer'
import { productBusinessesReducer } from './interfaces/ProductBusiness/reducer'
import { buyMaterialsReducer } from './interfaces/BuyMaterials/reducer'
import { tradingStoreReducer } from './interfaces/TradingStore/reducer'
import { armorStoreReducer } from './interfaces/ArmorStore/reducer'
import { stableReducer } from './interfaces/Stable/reducer'
import { barbershopReducer } from './interfaces/Barbershop/reducer'
import { tattooShopReducer } from './interfaces/TattooShop/reducer'
import { deathScreenReducer } from './interfaces/DeathScreen/reducer'
import { characterMenuReducer } from './interfaces/CharacterMenu/reducer'
import { weddingRequestReducer } from './interfaces/WeddingRequest/reducer'
import { weddingResponseReducer } from './interfaces/WeddingResponse/reducer'
import { adminPanelReducer } from './interfaces/AdminPanel/reducer'
import { adminPanelHudReducer } from './interfaces/AdminPanelHud/reducer'
import { employmentReducer } from './interfaces/Employment/reducer'
import { auctionReducer } from './interfaces/Auction/reducer'
import { craftStatusReducer } from './interfaces/CraftStatus/reducer'
import { mMenuReducer } from './interfaces/MMenu/reducer'
import { tradingTavernReducer } from './interfaces/TradingTavern/reducer'
import { cookingReducer } from './interfaces/Cooking/reducer'
import { kickInfoReducer } from './interfaces/KickInfo/reducer'
import { banInfoReducer } from './interfaces/BanInfo/reducer'
import { queueReducer } from './interfaces/Queue/reducer'
import { disclaimerReducer } from './interfaces/Disclaimer/reducer'
import { volumeReducer } from './reducers/volume'
import { mapReducer } from './reducers/map'
import { worldMapReducer } from './interfaces/WorldMap/reducer'
import { pickupItemReducer } from './interfaces/PickupItem/reducer'
import { loadingReducer } from './interfaces/Loading/reducer'
import { reconnectReducer } from './interfaces/Reconnect/reducer'
import { skinsReducer } from './interfaces/Skins/reducer'
import { skinsTradeReducer } from './interfaces/SkinsTrade/reducer'
import { buyCasesReducer } from './interfaces/BuyCases/reducer'
import { factionInviteReducer } from './interfaces/FactionInvite/reducer'
import { arrestReducer } from './interfaces/Arrest/reducer'
import { factionWarehouseReducer } from './interfaces/FactionWarehouse/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
  selectCharacter: selectCharacterReducer,
  devConsole: devConsoleReducer,
  createCharacter: createCharacterReducer,
  selectSpawn: selectSpawnReducer,
  escMenu: escMenuReducer,
  hud: hudReducer,
  animations: animationsReducer,
  dateTime: dateTimeReducer,
  radialMenu: radialMenuReducer,
  inventory: inventoryReducer,
  blacksmith: blacksmithReducer,
  houseSystem: houseSystemReducer,
  trade: tradeReducer,
  enchantTable: enchantTableReducer,
  smelter: smelterReducer,
  tanning: tanningReducer,
  workbench: workbenchReducer,
  alchemyTable: alchemyTableReducer,
  craftStatus: craftStatusReducer,
  sellResource: sellResourceReducer,
  npcShop: npcShopReducer,
  npcDialog: npcDialogReducer,
  fishingGame: fishingGameReducer,
  chooseWorkType: chooseWorkTypeReducer,
  sawmillGame: sawmillGameReducer,
  bank: bankReducer,
  cheque: chequeReducer,
  bizControl: bizControlReducer,
  contracts: contractsReducer,
  contract: contractReducer,
  honeyFactory: honeyFactoryReducer,
  mineGame: mineGameReducer,
  donateStore: donateStoreReducer,
  cases: casesReducer,
  moonReedGame: moonReedGameReducer,
  cookingSkumaGame: cookingSkumaGameReducer,
  pourSkumaGame: pourSkumaGameReducer,
  createGuild: createGuildReducer,
  fraction: fractionReducer,
  modal: modalReducer,
  adBoard: adBoardReducer,
  manufacturingBusinesses: manufacturingBusinessReducer,
  productBusinesses: productBusinessesReducer,
  buyMaterials: buyMaterialsReducer,
  tradingStore: tradingStoreReducer,
  armorStore: armorStoreReducer,
  stable: stableReducer,
  barbershop: barbershopReducer,
  tattooShop: tattooShopReducer,
  deathScreen: deathScreenReducer,
  weddingRequest: weddingRequestReducer,
  weddingResponse: weddingResponseReducer,
  adminPanel: adminPanelReducer,
  adminPanelHud: adminPanelHudReducer,
  employment: employmentReducer,
  auction: auctionReducer,
  characterMenu: characterMenuReducer,
  mMenu: mMenuReducer,
  tradingTavern: tradingTavernReducer,
  cooking: cookingReducer,
  kickInfo: kickInfoReducer,
  banInfo: banInfoReducer,
  queue: queueReducer,
  disclaimer: disclaimerReducer,
  volume: volumeReducer,
  map: mapReducer,
  worldMap: worldMapReducer,
  pickupItem: pickupItemReducer,
  loading: loadingReducer,
  reconnect: reconnectReducer,
  skins: skinsReducer,
  skinsTrade: skinsTradeReducer,
  buyCases: buyCasesReducer,
  factionInvite: factionInviteReducer,
  arrest: arrestReducer,
  factionWarehouse: factionWarehouseReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
