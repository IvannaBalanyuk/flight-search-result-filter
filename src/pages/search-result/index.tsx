/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../services/search-result-slice';
import { SideFilters } from '../../features/side-filter';
import {
  filterByAirlines,
  filterByLayovers,
  filterByPrice,
  getInitialCarriersFilterContent,
  sortByDuration,
  sortByPrice,
} from '../../services/filter-methods';
import { SortingFilterKind } from '../../shared/types/filter.types';
import { FlightInfoType } from '../../shared/types/flights.types';
import { FlightsList } from './components/flights-list';

export const SearchResultPage = () => {
  const dispatch = useAppDispatch();
  const {
    initialFlights,
    checkedSortingFilter,
    layoversFilterContent,
    carriersFilterContent,
    priceFilterMinValue,
    priceFilterMaxValue,
  } = useAppSelector((state) => state.searchResult);

  const [flights, setFlights] = useState<Array<FlightInfoType> | null>(null);

  useEffect(() => {
    if (initialFlights) {
      const initialSortingResult = sortByPrice({
        initialFlights,
        filterKind: SortingFilterKind.BY_PRICE_TYPE_ASCENDING,
      });

      if (initialSortingResult) {
        setFlights(initialSortingResult);
      }

      const initialCarriersFilterContent =
        getInitialCarriersFilterContent(initialFlights);

      if (initialCarriersFilterContent) {
        dispatch(
          actions.setInitialCarriersFilterContent(initialCarriersFilterContent)
        );
      }
    }
  }, [initialFlights]);

  useEffect(() => {
    if (initialFlights) {
      const filteredByLayoversFlights =
        layoversFilterContent?.oneLayover ||
        layoversFilterContent?.withoutLayovers
          ? filterByLayovers({
              initialFlights,
              layoversFilterContent,
            })
          : null;

      const filteredByPriceFlights =
        priceFilterMinValue || priceFilterMaxValue
          ? filterByPrice({
              initialFlights: filteredByLayoversFlights || initialFlights,
              minPrice: priceFilterMinValue,
              maxPrice: priceFilterMaxValue,
            })
          : null;

      const filteredByAirlinesFlights = carriersFilterContent
        ? filterByAirlines({
            initialFlights:
              filteredByPriceFlights ||
              filteredByLayoversFlights ||
              initialFlights,
            carriersFilterContent,
          })
        : null;

      const sortedFlights =
        checkedSortingFilter === SortingFilterKind.BY_DURATION
          ? sortByDuration({
              initialFlights:
                filteredByAirlinesFlights ||
                filteredByPriceFlights ||
                filteredByLayoversFlights ||
                initialFlights,
            })
          : sortByPrice({
              initialFlights:
                filteredByAirlinesFlights ||
                filteredByPriceFlights ||
                filteredByLayoversFlights ||
                initialFlights,
              filterKind: checkedSortingFilter,
            });

      if (sortedFlights) {
        setFlights(sortedFlights);
        dispatch(actions.setFilteredFlights(sortedFlights));
      }
    }
  }, [
    carriersFilterContent,
    layoversFilterContent,
    priceFilterMinValue,
    priceFilterMaxValue,
    checkedSortingFilter,
  ]);

  return (
    <section className={`${styles.section_container} container`}>
      <SideFilters></SideFilters>
      <FlightsList flights={flights}></FlightsList>
    </section>
  );
};
