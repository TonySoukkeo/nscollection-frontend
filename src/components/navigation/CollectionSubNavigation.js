import React from "react";
import { Link } from "react-router-dom";

const CollectionSubNavigation = ({ changeCollectionPath, path }) => {
  return (
    <nav className="sub-navigation sub-navigation--collection">
      <Link
        to="/collection?view=collection"
        onClick={() => changeCollectionPath("collection")}
        className={path === "collection" ? "sub-navigation--active" : ""}
      >
        <i className="fas fa-box-open"></i>
        <p>Collection</p>
      </Link>

      <Link
        to="/collection?view=wishlist"
        onClick={() => changeCollectionPath("wishlist")}
        className={path === "wishlist" ? "sub-navigation--active" : ""}
      >
        <i className="far fa-list-alt"></i>
        <p>Wishlist</p>
      </Link>

      <Link
        to="/collection?view=salewatch"
        className={path === "salewatch" ? "sub-navigation--active" : ""}
        onClick={() => changeCollectionPath("salewatch")}
      >
        <i className="fas fa-file-invoice-dollar"></i>
        <p>Salewatch</p>
      </Link>
    </nav>
  );
};

export default CollectionSubNavigation;
