import React, { useEffect } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from "../../redux/shop/shop.selectors";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const Shop = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  useEffect(() => {
    dispatch(fetchCollectionsStartAsync());
  }, []);

  const { isFetchingCollections, isCollectionLoaded } = useSelector(
    createStructuredSelector({
      isFetchingCollections: selectIsCollectionFetching,
      isCollectionLoaded: selectIsCollectionsLoaded,
    })
  );

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        render={(props) => (
          <CollectionsOverviewWithSpinner
            isLoading={isFetchingCollections}
            {...props}
          />
        )}
      />

      <Route
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionPageWithSpinner
            isLoading={!isCollectionLoaded}
            {...props}
          />
        )}
      />
    </div>
  );
};

export default Shop;
