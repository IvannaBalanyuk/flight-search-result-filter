import {
  CarriersFilterContentType,
  LayoversFilterContentType,
  SortingFilterKind,
} from '../shared/types/filter.types';
import { FlightInfoType } from '../shared/types/flights.types';

export const getInitialCarriersFilterContent = (
  flights: Array<FlightInfoType>
): CarriersFilterContentType<string> => {
  const filterContent: CarriersFilterContentType<string> = {};

  flights.forEach((item) => {
    const uid = item.flight.carrier.uid;
    const carrierInfo = filterContent[uid];
    const itemPrice = Number(item.flight.price.total.amount);

    if (!carrierInfo || (carrierInfo && carrierInfo.minPrice > itemPrice)) {
      filterContent[uid] = {
        carrierCaption: item.flight.carrier.caption,
        minPrice: itemPrice,
        checked: false,
      };
    }
  });

  return filterContent;
};

type SortByPriceParamsType = {
  initialFlights: Array<FlightInfoType> | null;
  filterKind: SortingFilterKind | null;
};

export const sortByPrice = ({
  initialFlights,
  filterKind,
}: SortByPriceParamsType): Array<FlightInfoType> | null => {
  if (!initialFlights || !filterKind) {
    return null;
  }

  const flights = [...initialFlights];

  for (let i = 0; i < flights.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < flights.length; j++) {
      if (
        filterKind === SortingFilterKind.BY_PRICE_TYPE_ASCENDING
          ? Number(flights[minIndex].flight.price.total.amount) >
            Number(flights[j].flight.price.total.amount)
          : Number(flights[minIndex].flight.price.total.amount) <
            Number(flights[j].flight.price.total.amount)
      ) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [flights[i], flights[minIndex]] = [flights[minIndex], flights[i]];
    }
  }

  return flights;
};

type SortByDurationParamsType = {
  initialFlights: Array<FlightInfoType> | null;
};

export const sortByDuration = ({
  initialFlights,
}: SortByDurationParamsType): Array<FlightInfoType> | null => {
  if (!initialFlights) {
    return null;
  }

  const flights = [...initialFlights];

  for (let i = 0; i < flights.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < flights.length; j++) {
      const minIndexSumDuration = flights[minIndex].flight.legs.reduce(
        (acc, item) => {
          return acc + Number(item.duration);
        },
        0
      );

      const jIndexSumDuration = flights[j].flight.legs.reduce((acc, item) => {
        return acc + Number(item.duration);
      }, 0);

      if (minIndexSumDuration > jIndexSumDuration) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [flights[i], flights[minIndex]] = [flights[minIndex], flights[i]];
    }
  }

  return flights;
};

type FilterByLayoversParamsType = {
  initialFlights: Array<FlightInfoType>;
  layoversFilterContent: LayoversFilterContentType<string>;
};

export const filterByLayovers = ({
  initialFlights,
  layoversFilterContent,
}: FilterByLayoversParamsType): Array<FlightInfoType> => {
  if (
    !layoversFilterContent.withoutLayovers &&
    !layoversFilterContent.oneLayover
  ) {
    return initialFlights;
  }

  const flights = initialFlights.filter((item) => {
    const departLayovers = item.flight.legs[0].segments.length - 1;
    const returnLayovers = item.flight.legs[1].segments.length - 1;
    const legLayovers = departLayovers + returnLayovers;
    if (
      layoversFilterContent.withoutLayovers &&
      layoversFilterContent.oneLayover
    ) {
      return legLayovers === 0 || legLayovers === 1;
    }

    if (layoversFilterContent.withoutLayovers) {
      return legLayovers === 0;
    }

    return legLayovers === 1;
  });

  return flights;
};

type FilterByPriceParamsType = {
  initialFlights: Array<FlightInfoType> | null;
  minPrice?: number | null;
  maxPrice?: number | null;
};

export const filterByPrice = ({
  initialFlights,
  minPrice = null,
  maxPrice = null,
}: FilterByPriceParamsType): Array<FlightInfoType> | null => {
  if (!initialFlights) {
    return null;
  }

  if (!minPrice && !maxPrice) {
    return initialFlights;
  }

  // eslint-disable-next-line array-callback-return
  const flights = initialFlights.filter((item) => {
    const totalPrice = Number(item.flight.price.total.amount);
    if (!minPrice && maxPrice) {
      return totalPrice <= maxPrice;
    }

    if (minPrice && maxPrice) {
      return totalPrice >= minPrice && totalPrice <= maxPrice;
    }

    if (minPrice && !maxPrice) {
      return totalPrice >= minPrice;
    }
  });

  return flights;
};

type FilterByAirlinesParamsType = {
  initialFlights: Array<FlightInfoType> | null;
  carriersFilterContent: CarriersFilterContentType<string> | null;
};

export const filterByAirlines = ({
  initialFlights,
  carriersFilterContent,
}: FilterByAirlinesParamsType): Array<FlightInfoType> | null => {
  if (!carriersFilterContent || !initialFlights) {
    return null;
  }
  const checkedAirlinesUids: Array<string> = [];
  Object.entries(carriersFilterContent).forEach((entry) => {
    if (entry[1].checked) {
      checkedAirlinesUids.push(entry[0]);
    }
  });

  if (checkedAirlinesUids.length > 0) {
    const flights = initialFlights.filter((item) => {
      return checkedAirlinesUids.some((uid) => uid === item.flight.carrier.uid);
    });

    return flights;
  }

  return initialFlights;
};
