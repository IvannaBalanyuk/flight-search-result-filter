import { createSlice } from '@reduxjs/toolkit';

import { FlightInfoType } from '../shared/types/flights.types';
import {
  CarriersFilterContentType,
  LayoversFilterContentType,
  LayoversFilterKind,
  SortingFilterKind,
} from '../shared/types/filter.types';

type SearchResultSliceStateType = {
  initialFlights: Array<FlightInfoType> | null;
  filteredFlights: Array<FlightInfoType> | null;
  checkedSortingFilter: SortingFilterKind | null;
  layoversFilterContent: LayoversFilterContentType;
  carriersFilterContent: CarriersFilterContentType<string> | null;
  priceFilterMinValue: number | null;
  priceFilterMaxValue: number | null;
};

const SearchResultSliceInitialState: SearchResultSliceStateType = {
  initialFlights: null,
  filteredFlights: null,
  checkedSortingFilter: SortingFilterKind.BY_PRICE_TYPE_ASCENDING,
  layoversFilterContent: {
    oneLayover: false,
    withoutLayovers: false,
  },
  carriersFilterContent: null,
  priceFilterMinValue: 0,
  priceFilterMaxValue: null,
};

const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState: SearchResultSliceInitialState,
  reducers: {
    resetFilters: () => SearchResultSliceInitialState,
    setInitialFlights: (state, action) => {
      state.initialFlights = action.payload;
    },
    setFilteredFlights: (state, action) => {
      state.filteredFlights = action.payload;
    },
    setCheckedSortingFilter: (state, action) => {
      state.checkedSortingFilter = action.payload;
    },
    setLayoversFilterContent: (state, action) => {
      const kind: LayoversFilterKind = action.payload;
      const layoversFilter = state.layoversFilterContent[kind];
      state.layoversFilterContent[kind] = !layoversFilter;
    },
    setInitialCarriersFilterContent: (state, action) => {
      state.carriersFilterContent = action.payload;
    },
    setCarriersFilterContent: (state, action) => {
      const uid: string = action.payload;

      if (state.carriersFilterContent) {
        const carrier = state.carriersFilterContent[uid];
        if (carrier) {
          state.carriersFilterContent[uid].checked = !carrier.checked;
        }
      }
    },
    setPriceFilterMinValue: (state, action) => {
      state.priceFilterMinValue = action.payload;
    },
    setPriceFilterMaxValue: (state, action) => {
      state.priceFilterMaxValue = action.payload;
    },
  },
});

export const {
  resetFilters,
  setInitialFlights,
  setFilteredFlights,
  setCheckedSortingFilter,
  setLayoversFilterContent,
  setInitialCarriersFilterContent,
  setCarriersFilterContent,
  setPriceFilterMinValue,
  setPriceFilterMaxValue,
} = searchResultSlice.actions;
export default searchResultSlice.reducer;

export const actions = {
  ...searchResultSlice.actions,
};
