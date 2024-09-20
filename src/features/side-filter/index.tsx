/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useMemo } from 'react';

import styles from './styles.module.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Input } from '../../shared/ui/input';
import RadioButton from '../../shared/ui/radio-button';
import Checkbox from '../../shared/ui/checkbox';
import {
  LayoversFilterKind,
  PriceFilterKind,
  SortingFilterKind,
} from '../../shared/types/filter.types';
import { actions } from '../../services/search-result-slice';

export const SideFilters = () => {
  const dispatch = useAppDispatch();
  const {
    checkedSortingFilter,
    layoversFilterContent,
    carriersFilterContent,
    priceFilterMinValue,
    priceFilterMaxValue,
  } = useAppSelector((state) => state.searchResult);

  const entries = useMemo(() => {
    if (carriersFilterContent) {
      return Object.entries(carriersFilterContent);
    }
  }, [carriersFilterContent]);

  const checkCarriersFilterHandler = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(actions.setCarriersFilterContent(target.id));
  };

  const checkLayoversFilterHandler = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(actions.setLayoversFilterContent(target.id));
  };

  const checkSortingFilterHandler = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(actions.setCheckedSortingFilter(target.id));
  };

  const checkPriceFilterHandler = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = target;
    if (id === PriceFilterKind.MIN_PRICE) {
      dispatch(actions.setPriceFilterMinValue(value));
    } else {
      dispatch(actions.setPriceFilterMaxValue(value));
    }
  };

  return (
    <div className={`${styles.filters_container} container p-20 pr-12`}>
      <div className={`${styles.filter_wparrer} container`}>
        <h3
          className={`${styles.filter_title} container text text_type_bold text_size_s`}
        >
          Сортировать
        </h3>
        <div
          className={`${styles.filter} ${styles.filter_type_default} container`}
        >
          <RadioButton
            label="- по возрастанию цены"
            name="sort"
            id={SortingFilterKind.BY_PRICE_TYPE_ASCENDING}
            onChange={checkSortingFilterHandler}
            checked={
              checkedSortingFilter === SortingFilterKind.BY_PRICE_TYPE_ASCENDING
            }
          ></RadioButton>
          <RadioButton
            label="- по убыванию цены"
            name="sort"
            id={SortingFilterKind.BY_PRICE_TYPE_DESCENDING}
            onChange={checkSortingFilterHandler}
            checked={
              checkedSortingFilter ===
              SortingFilterKind.BY_PRICE_TYPE_DESCENDING
            }
          ></RadioButton>
          <RadioButton
            label="- по времени в пути"
            name="sort"
            id={SortingFilterKind.BY_DURATION}
            onChange={checkSortingFilterHandler}
            checked={checkedSortingFilter === SortingFilterKind.BY_DURATION}
          ></RadioButton>
        </div>
      </div>
      <div className={`${styles.filter_wparrer} container`}>
        <h3
          className={`${styles.filter_title} container text text_type_bold text_size_s`}
        >
          Фильтровать
        </h3>
        <div
          className={`${styles.filter} ${styles.filter_type_default} container`}
        >
          <Checkbox
            label="- 1 пересадка"
            name={LayoversFilterKind.oneLayover}
            id={LayoversFilterKind.oneLayover}
            onChange={checkLayoversFilterHandler}
            checked={layoversFilterContent?.oneLayover}
          ></Checkbox>
          <Checkbox
            label="- без пересадок"
            name={LayoversFilterKind.withoutLayovers}
            id={LayoversFilterKind.withoutLayovers}
            onChange={checkLayoversFilterHandler}
            checked={layoversFilterContent?.withoutLayovers}
          ></Checkbox>
        </div>
      </div>
      <div className={`${styles.filter_wparrer} container`}>
        <h3
          className={`${styles.filter_title} container text text_type_bold text_size_s`}
        >
          Цена
        </h3>
        <div className={`${styles.filter} ${styles.filter_type_prices}`}>
          <Input
            type="text"
            label="От"
            name="price-filter"
            id={PriceFilterKind.MIN_PRICE}
            value={priceFilterMinValue ? String(priceFilterMinValue) : '0'}
            onChange={checkPriceFilterHandler}
          ></Input>
          <Input
            type="text"
            label="До"
            name="price-filter"
            id={PriceFilterKind.MAX_PRICE}
            value={priceFilterMaxValue ? String(priceFilterMaxValue) : ''}
            onChange={checkPriceFilterHandler}
          ></Input>
        </div>
      </div>
      <div className={`${styles.filter_wparrer} container`}>
        <h3
          className={`${styles.filter_title} container text text_type_bold text_size_s`}
        >
          Авиакомпании
        </h3>
        <div
          className={`${styles.filter} ${styles.filter_type_default} container`}
        >
          {entries &&
            entries.map((entry, index) => {
              return (
                <Checkbox
                  key={index}
                  label={`- ${entry[1].carrierCaption}`}
                  extraLabel={`от ${entry[1].minPrice} р.`}
                  name={entry[0]}
                  id={entry[0]}
                  onChange={checkCarriersFilterHandler}
                  checked={entry[1].checked}
                ></Checkbox>
              );
            })}
        </div>
      </div>
    </div>
  );
};
