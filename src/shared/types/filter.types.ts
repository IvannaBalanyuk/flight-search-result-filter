export enum SortingFilterKind {
  BY_PRICE_TYPE_ASCENDING = 'byPriceAscending',
  BY_PRICE_TYPE_DESCENDING = 'byPriceDescending',
  BY_DURATION = 'byDuration',
}

export enum LayoversFilterKind {
  ONE_LAYOVER = 'oneLayover',
  WITHOUT_LAYOVERS = 'withoutLayovers',
}

export type LayoversFilterContentType<T extends string> = {
  [key in T]: boolean;
};

export enum PriceFilterKind {
  MIN_PRICE = 'minPrice',
  MAX_PRICE = 'maxPrice',
}

export type CarrierInfoType = {
  carrierCaption: string;
  minPrice: number;
  checked: boolean;
};

export type CarriersFilterContentType<T extends string> = {
  [uid in T]: CarrierInfoType;
};
