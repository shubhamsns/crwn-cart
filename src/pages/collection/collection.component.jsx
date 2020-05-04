import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { selectCollection } from "../../redux/shop/shop.selectors";

import CollectionItem from "../../components/collection-item/collection-item.component";

import "./collection.styles.scss";

function CollectionPage() {
  const match = useRouteMatch();

  const {
    collection: { title, items },
  } = useSelector(
    createStructuredSelector({
      collection: selectCollection(match.params.collectionId),
    })
  );

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default CollectionPage;
