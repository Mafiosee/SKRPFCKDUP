import React, { useMemo } from 'react'
import './styles.sass'
import {
  SkinCategory,
  SkinCategoryConfig,
} from '../../../../shared/Skins/SkinCategory'
import { Sort } from '../../../../shared/Skins/Sort'
import { useAppSelector } from '../../../../hooks/redux'
import {
  QualityIconShadow,
  QualityNoShadowIcon,
  SkinQualityColor,
} from '../../../DonateStore/data/quality'
import { SkinImages } from '../../../Skins/assets/SkinImages'
import {
  SkinsTradeEvents,
  SkinsTradePayloads,
} from '../../../../shared/SkinsTrade/events'
import { callClient } from '../../../../utils/api'

type Props = {
  activeSkinCategory: SkinCategory
  searchValue: string
  sortType: Sort
}

const SkinsList: React.FC<Props> = ({
  activeSkinCategory,
  searchValue,
  sortType,
}) => {
  const { skins, giveSkins } = useAppSelector((state) => state.skinsTrade)
  const renderedSkins = useMemo(() => {
    const skinsList = skins.filter(
      (skin) =>
        !giveSkins.some((giveSkin) => giveSkin.id === skin.id) &&
        SkinCategoryConfig[activeSkinCategory].slots.includes(skin.slot) &&
        skin.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1,
    )

    switch (sortType) {
      case Sort.Name: {
        skinsList.sort((a, b) => a.name.localeCompare(b.name))
        break
      }
      case Sort.Quality: {
        skinsList.sort((a, b) => b.quality - a.quality)
        break
      }
    }

    const renderedList = skinsList.map((skin) => {
      const includedInTrade = false

      if (includedInTrade) {
        return null
      }

      return (
        <div
          key={skin.id}
          className="skin"
          onClick={() => {
            const payload: SkinsTradePayloads[SkinsTradeEvents.AddSkinToTrade] =
              { skinId: skin.id }
            callClient(SkinsTradeEvents.AddSkinToTrade, payload)
          }}
        >
          <div className="center">
            <div
              className="color"
              style={{ backgroundColor: SkinQualityColor[skin.quality] }}
            />
            <div className="content">
              <div
                className="image"
                style={{
                  backgroundImage: `url(${SkinImages[`${skin.image}.png`]})`,
                }}
              />
              <div className="name">{skin.name}</div>
              <div
                className="quality"
                style={{
                  backgroundImage: `url(${QualityIconShadow[skin.quality]})`,
                }}
              >
                <div
                  className="icon"
                  style={{
                    backgroundImage: `url(${QualityNoShadowIcon[skin.quality]})`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )
    })

    while (renderedList.length < 6) {
      renderedList.push(
        <div key={`empty-${renderedList.length}`} className="skin -empty" />,
      )
    }

    return renderedList
  }, [activeSkinCategory, searchValue, sortType, skins, giveSkins])

  return <div className="SkinsList">{renderedSkins}</div>
}

export default SkinsList
