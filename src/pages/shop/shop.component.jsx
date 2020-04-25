import React, { useState } from "react";

import SHOP_DATA from "./shop.data";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";

function Shop() {
  const [collection, setCollection] = useState(SHOP_DATA);
  return (
    <div className="shop-page">
      {collection.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
}

export default Shop;
