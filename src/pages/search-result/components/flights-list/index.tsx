import { useState } from 'react';

import styles from './styles.module.css';

import { FlightInfoType } from '../../../../shared/types/flights.types';
import { FlightCard } from '../../../../entities/flight-card';
import { Button } from '../../../../shared/ui/button';

type FlightsListPropsType = {
  flights: Array<FlightInfoType> | null;
};

export const FlightsList = ({ flights }: FlightsListPropsType) => {
  const [limit, setLimit] = useState<number>(10);

  const showMoreButtonHandler = () => {
    if (flights && limit < flights.length) {
      setLimit(limit + 10);
    }
  };

  return (
    <div className={styles.flights_list_container}>
      <ul className={`${styles.flights_list} container list`}>
        {flights &&
          flights.length > 0 &&
          // eslint-disable-next-line array-callback-return
          flights.map((item: FlightInfoType, index: number) => {
            if (index < limit) {
              return <FlightCard key={index} flight={item.flight}></FlightCard>;
            }
          })}
      </ul>

      {flights && flights.length > limit && (
        <Button
          buttonType="secondary"
          actionType="button"
          label="Показать ещё"
          size="large"
          onClick={showMoreButtonHandler}
        />
      )}
    </div>
  );
};
