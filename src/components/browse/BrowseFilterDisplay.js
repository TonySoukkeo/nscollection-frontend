import React from "react";

// Components
import CheckboxInput from "../../components/inputs/CheckboxInput";

const BrowseFilterDisplay = ({
  visible,
  closeDisplay,
  filter,
  updateFilter,
  changeFilter,
  changePriceRange
}) => {
  return (
    <div
      className={
        visible
          ? "browse__filter-list browse__filter-list--active"
          : "browse__filter-list"
      }
    >
      <CheckboxInput
        checked={filter.all}
        name="all"
        title="All"
        value={filter.all}
        onChange={changeFilter}
      />

      <CheckboxInput
        checked={filter.demo}
        name="demo"
        title="Demo"
        value={filter.demo}
        onChange={changeFilter}
      />

      <CheckboxInput
        checked={filter.sale}
        name="sale"
        title="Sale"
        value={filter.sale}
        onChange={changeFilter}
      />

      <CheckboxInput
        checked={filter.newRelease}
        name="newRelease"
        title="New Release"
        value={filter.newRelease}
        onChange={changeFilter}
      />

      <CheckboxInput
        checked={filter.comingSoon}
        name="comingSoon"
        title="Coming Soon"
        value={filter.comingSoon}
        onChange={changeFilter}
      />

      <CheckboxInput
        checked={filter.cloudSave}
        name="cloudSave"
        title="Cloud Save"
        value={filter.cloudSave}
        onChange={changeFilter}
      />

      <CheckboxInput
        checked={filter.onlinePlay}
        name="onlinePlay"
        title="Online Play"
        value={filter.onlinePlay}
        onChange={changeFilter}
      />

      <CheckboxInput
        checked={filter.dlc}
        name="dlc"
        title="Dlc"
        value={filter.dlc}
        onChange={changeFilter}
      />

      <hr />
      <p>Price Range:</p>

      <div className="form__group">
        <input
          className="form--filter-radio-input"
          id="price-1"
          type="radio"
          name="priceRange"
          onChange={() => changePriceRange({ min: 0, max: 0 })}
        />

        <label className="form--filter-radio-label" htmlFor="price-1">
          Free
          <span></span>
        </label>
      </div>

      <div className="form__group">
        <input
          className="form--filter-radio-input"
          id="price-2"
          type="radio"
          name="priceRange"
          onChange={() => changePriceRange({ min: 0, max: 4.99 })}
        />

        <label className="form--filter-radio-label" htmlFor="price-2">
          $0 - $4.99
          <span></span>
        </label>
      </div>
      <div className="form__group">
        <input
          className="form--filter-radio-input"
          id="price-3"
          type="radio"
          name="priceRange"
          onChange={() => changePriceRange({ min: 5, max: 9.99 })}
        />

        <label className="form--filter-radio-label" htmlFor="price-3">
          $5 - $9.99
          <span></span>
        </label>
      </div>
      <div className="form__group">
        <input
          className="form--filter-radio-input"
          id="price-4"
          type="radio"
          name="priceRange"
          onChange={() => changePriceRange({ min: 10, max: 19.99 })}
        />

        <label className="form--filter-radio-label" htmlFor="price-4">
          $10 - $19.99
          <span></span>
        </label>
      </div>
      <div className="form__group">
        <input
          className="form--filter-radio-input"
          id="price-5"
          type="radio"
          name="priceRange"
          onChange={() => changePriceRange({ min: 20, max: 39.99 })}
        />

        <label className="form--filter-radio-label" htmlFor="price-5">
          $20 - $39.99
          <span></span>
        </label>
      </div>
      <div className="form__group">
        <input
          className="form--filter-radio-input"
          id="price-6"
          type="radio"
          name="priceRange"
          onChange={() => changePriceRange({ min: 40, max: 6000 })}
        />

        <label className="form--filter-radio-label" htmlFor="price-6">
          $40+
          <span></span>
        </label>
      </div>
      <div className="browse__filter-list--btn-container">
        <button onClick={updateFilter}>Update</button>

        <button onClick={closeDisplay}>Close</button>
      </div>
    </div>
  );
};

export default BrowseFilterDisplay;
