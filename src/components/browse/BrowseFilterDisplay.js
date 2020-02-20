import React from "react";

// Components
import CheckboxInput from "../../components/inputs/CheckboxInput";

const BrowseFilterDisplay = ({ visible, closeDisplay }) => {
  return (
    <div
      className={
        visible
          ? "browse__filter-list browse__filter-list--active"
          : "browse__filter-list"
      }
    >
      <CheckboxInput name="all" title="All" />
      <CheckboxInput name="demo" title="Demo" />
      <CheckboxInput name="sales" title="Sales" />
      <CheckboxInput name="coming-soon" title="Coming Soon" />
      <CheckboxInput name="cloud-save" title="Cloud Save" />
      <CheckboxInput name="online-play" title="Online Play" />
      <CheckboxInput name="dlc" title="Dlc" />
      <hr />
      <p>Price Range:</p>

      <div className="form__group">
        <input
          className="form--filter-radio-input"
          id="price-1"
          type="radio"
          name="priceRange"
          value={{ min: 0, max: 4.99 }}
        />

        <label className="form--filter-radio-label" htmlFor="price-1">
          $0 - $4.99
          <span></span>
        </label>
      </div>
      <div className="form__group">
        <input
          className="form--filter-radio-input"
          id="price-2"
          type="radio"
          name="priceRange"
          value={{ min: 5, max: 9.99 }}
        />

        <label className="form--filter-radio-label" htmlFor="price-2">
          $5 - $9.99
          <span></span>
        </label>
      </div>
      <div className="form__group">
        <input
          className="form--filter-radio-input"
          id="price-3"
          type="radio"
          name="priceRange"
          value={{ min: 10, max: 19.99 }}
        />

        <label className="form--filter-radio-label" htmlFor="price-3">
          $10 - $19.99
          <span></span>
        </label>
      </div>
      <div className="form__group">
        <input
          className="form--filter-radio-input"
          id="price-4"
          type="radio"
          name="priceRange"
          value={{ min: 20, max: 39.99 }}
        />

        <label className="form--filter-radio-label" htmlFor="price-4">
          $20 - $39.99
          <span></span>
        </label>
      </div>
      <div className="form__group">
        <input
          className="form--filter-radio-input"
          id="price-5"
          type="radio"
          name="priceRange"
          value={{ min: 40, max: 5000 }}
        />

        <label className="form--filter-radio-label" htmlFor="price-5">
          $40+
          <span></span>
        </label>
      </div>
      <div className="browse__filter-list--btn-container">
        <button>Update</button>

        <button onClick={closeDisplay}>Close</button>
      </div>
    </div>
  );
};

export default BrowseFilterDisplay;
