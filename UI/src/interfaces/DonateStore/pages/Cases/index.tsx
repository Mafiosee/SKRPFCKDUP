import './styles.sass'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { Tab } from '../../enums/Tabs'
import Categories from '../../components/Categories'
import Product from '../../components/Product'

type Props = {
  setOpenedCaseId: (productId: any) => void
}

const PageCases: React.FC<Props> = ({ setOpenedCaseId }) => {
  const {
    tab,
    casesPage: { categories, cases },
  } = useAppSelector((state) => state.donateStore)
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [search, setSearch] = useState('')

  const isOpen = useMemo(() => tab === Tab.Cases, [tab])

  const activeCategoryIdx = useMemo(
    () => categories.findIndex((el) => el.id === activeCategoryId),
    [categories, activeCategoryId],
  )

  useEffect(() => {
    setActiveCategoryId(categories[0]?.id ?? null)
  }, [categories])

  const getCases = (categoryId: any) =>
    cases
      .filter((el) => {
        if (search.length)
          return el.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        return el.categoryIds.includes(categoryId)
      })
      .map((product, idx) => (
        <Product
          key={product.id}
          isLarge={idx === 0 || idx === 5}
          info={product}
          setOpenedId={setOpenedCaseId}
        />
      ))

  const getCategoryBlocks = () =>
    categories.map((category, idx) => {
      const isActive = category.id === activeCategoryId

      return (
        <div
          className={`block ${isActive && '-active'}`}
          key={category.id}
          style={{
            transform: `translateY(${(activeCategoryIdx - idx) * 100}%)`,
          }}
        >
          <div className="title">{category.name}</div>
          <div className="list">{getCases(category.id)}</div>
        </div>
      )
    })

  return (
    <div
      className="_PageCases"
      style={{
        transform: `translateX(-${tab * 100}%)`,
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      <div className="main">
        <Categories
          search={{ value: search, serValue: setSearch }}
          categories={{
            list: categories,
            activeId: activeCategoryId,
            setActiveId: setActiveCategoryId,
          }}
        />
        <div className="content">{getCategoryBlocks()}</div>
      </div>
    </div>
  )
}

export default PageCases
