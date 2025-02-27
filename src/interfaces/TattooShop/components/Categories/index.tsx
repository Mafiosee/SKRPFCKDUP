import "./styles.sass";
import React, { useMemo } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import { CategoryIcons } from "../../assets/categories";
import { Category } from "../../../../shared/TattooShop/Category";

type Props = {
  activeCategory: Category | null;
  setActiveCategory: (category: Category | null) => void;
};

const Categories: React.FC<Props> = ({ activeCategory, setActiveCategory }) => {
  const { products } = useAppSelector((state) => state.tattooShop);

  const categories = useMemo(() => {
    const productCategories = products.map((product) => product.category);
    const allCategories = [
      Category.Head,
      Category.Body,
      Category.LeftHand,
      Category.RightHand,
      Category.LeftLeg,
      Category.RightLeg,
    ];
    return allCategories
      .map((category) =>
        productCategories.includes(category) ? category : null,
      )
      .filter((category) => category != null);
  }, [products]);

  const renderCategories = () =>
    categories.map((category) => {
      if (category == null) {
        return;
      }

      const isActive = activeCategory === category;
      const setActive = () => setActiveCategory(category);

      return (
        <div
          key={category}
          className={`category ${isActive && "-active"}`}
          onClick={setActive}
        >
          <div
            className="icon"
            style={{ backgroundImage: `url(${CategoryIcons[category]})` }}
          />
        </div>
      );
    });

  return <div className="_Categories">{renderCategories()}</div>;
};

export default Categories;
