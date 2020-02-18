import React from "react";

const CollectionSubNavigation = ({ changeCollectionPath, path }) => {
  return (
    <nav className="sub-navigation sub-navigation--collection">
      <div
        onClick={() => changeCollectionPath("collection")}
        className={path === "collection" ? "sub-navigation--active" : ""}
      >
        <i className="fas fa-box-open"></i>
        <p>Collection</p>
      </div>

      <div
        onClick={() => changeCollectionPath("wishlist")}
        className={path === "wishlist" ? "sub-navigation--active" : ""}
      >
        <i className="far fa-list-alt"></i>
        <p>Wishlist</p>
      </div>

      <div
        className={path === "salewatch" ? "sub-navigation--active" : ""}
        onClick={() => changeCollectionPath("salewatch")}
      >
        <i className="fas fa-file-invoice-dollar"></i>
        <p>Salewatch</p>
      </div>
    </nav>
  );
};

export default CollectionSubNavigation;
