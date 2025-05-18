import NpcDialog from './interfaces/NpcDialog'
import './index.sass'
import CraftStatus from './interfaces/CraftStatus'
import React, { useEffect } from 'react'
import { useAppDispatch } from './hooks/redux'
import { dateTimeActions } from './reducers/datetime'
import Inventory from './interfaces/Inventory'
import Auth from './interfaces/Auth'
import Notifications from './interfaces/Notifications'
import SelectCharacter from './interfaces/SelectCharacter'
import CreateCharacter from './interfaces/CreateCharacter'
import SelectSpawn from './interfaces/SelectSpawn'
import DevConsole from './interfaces/DevConsole'
import Hud from './interfaces/Hud'
import RadialMenu from './interfaces/RadialMenu'
import Blacksmith from './interfaces/Blacksmith'
import Animations from './interfaces/Animations'
import HouseSystem from './interfaces/HouseSystem'
import Trade from './interfaces/Trade'
import EnchantTable from './interfaces/EnchantTable'
import Smelter from './interfaces/Smelter'
import Tanning from './interfaces/Tanning'
import Workbench from './interfaces/Workbench'
import AlchemyTable from './interfaces/AlchemyTable'
import SellResource from './interfaces/SellResource'
import NpcShop from './interfaces/NpcShop'
import FishingGame from './interfaces/FishingGame'
import ChooseWorkType from './interfaces/ChooseWorkType'
import SawmillGame from './interfaces/SawmillGame'
import Bank from './interfaces/Bank'
import Cheque from './interfaces/Cheque'
import BizControl from './interfaces/BizControl'
import Contracts from './interfaces/Contracts'
import Contract from './interfaces/Contract'
import HoneyFactory from './interfaces/HoneyFactory'
import MineGame from './interfaces/MineGame'
import MoonReedGame from './interfaces/MoonReedGame'
import CookingSkumaGame from './interfaces/CookingSkumaGame'
import PourSkumaGame from './interfaces/PourSkumaGame'
import CreateGuild from './interfaces/CreateGuild'
import Fraction from './interfaces/Fraction'
import AdBoard from './interfaces/AdBoard'
import Cases from './interfaces/Cases'
import Modal from './interfaces/Modal'
import EscMenu from './interfaces/EscMenu'
import ManufacturingBusiness from './interfaces/ManufacturingBusiness'
import ProductBusiness from './interfaces/ProductBusiness'
import BuyMaterials from './interfaces/BuyMaterials'
import TradingStore from './interfaces/TradingStore'
import ArmorStore from './interfaces/ArmorStore'
import Stable from './interfaces/Stable'
import Barbershop from './interfaces/Barbershop'
import TattooShop from './interfaces/TattooShop'
import DeathScreen from './interfaces/DeathScreen'
import CharacterMenu from './interfaces/CharacterMenu'
import WeddingRequest from './interfaces/WeddingRequest'
import WeddingResponse from './interfaces/WeddingResponse'
import AdminPanel from './interfaces/AdminPanel'
import AdminPanelHud from './interfaces/AdminPanelHud'
import Employment from './interfaces/Employment'
import Auction from './interfaces/Auction'
import MMenu from './interfaces/MMenu'
import TradingTavern from './interfaces/TradingTavern'
import Cooking from './interfaces/Cooking'
import KickInfo from './interfaces/KickInfo'
import BanInfo from './interfaces/BanInfo'
import Queue from './interfaces/Queue'
import Disclaimer from './interfaces/Disclaimer'
import Binder from './interfaces/Binder'
import WorldMap from './interfaces/WorldMap'
import PickupItem from './interfaces/PickupItem'
import Loading from './interfaces/Loading'
import Reconnect from './interfaces/Reconnect'
import Skins from './interfaces/Skins'
import SkinsTrade from './interfaces/SkinsTrade'
import BuyCases from './interfaces/BuyCases'
import FactionInvite from './interfaces/FactionInvite'
import Arrest from './interfaces/Arrest'
import FactionWarehouse from './interfaces/FactionWarehouse'
import { RPC } from './utils/RPC'

require('./utils/api')

require('./utils/api')

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    setInterval(() => {
      dispatch(dateTimeActions.incrementTime())
      RPC.checkPendingRequests()
    }, 1000)
  }, [dispatch])

  return (
    <>
      <Notifications />
      <Auth />
      <SelectCharacter />
      <CreateCharacter />
      <SelectSpawn />
      <EscMenu />
      <Hud />
      <RadialMenu />
      <Inventory />
      <Blacksmith />
      <Animations />
      <HouseSystem />
      <Trade />
      <EnchantTable />
      <Smelter />
      <Tanning />
      <Workbench />
      <AlchemyTable />
      <SellResource />
      <NpcShop />
      <NpcDialog />
      <FishingGame />
      <ChooseWorkType />
      <SawmillGame />
      <BizControl />
      <Contracts />
      <Contract />
      <HoneyFactory />
      <MineGame />
      <Bank />
      <Cheque />
      <MoonReedGame />
      <CookingSkumaGame />
      <PourSkumaGame />
      <CreateGuild />
      <Fraction />
      <Modal />
      <AdBoard />
      <Cases />
      <ManufacturingBusiness />
      <ProductBusiness />
      <BuyMaterials />
      <TradingStore />
      <ArmorStore />
      <Stable />
      <Barbershop />
      <TattooShop />
      <DeathScreen />
      <CharacterMenu />
      <WeddingRequest />
      <WeddingResponse />
      <AdminPanel />
      <AdminPanelHud />
      <Employment />
      <Auction />
      <MMenu />
      <TradingTavern />
      <Cooking />
      <CraftStatus />
      <KickInfo />
      <BanInfo />
      <Queue />
      <Disclaimer />
      <WorldMap />
      <PickupItem />
      <Loading />
      <Reconnect />
      <Skins />
      <SkinsTrade />
      <BuyCases />
      <FactionInvite />
      <Arrest />
      <FactionWarehouse />

      <DevConsole />
      <Binder />
    </>
  )
}

export default App
