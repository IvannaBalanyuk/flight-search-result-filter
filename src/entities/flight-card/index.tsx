import styles from './styles.module.css';

import { CurrencySimbols } from '../../shared/types/flight-card.types';
import { FlightType } from '../../shared/types/flights.types';
import { Button } from '../../shared/ui/button';
import { LegBrief } from './components/leg-brief';

type FlightCardProps = {
  flight: FlightType;
};

export const FlightCard = ({ flight }: FlightCardProps) => {
  const currency = flight.price.total.currencyCode;
  const currencySimbol =
    currency === CurrencySimbols.RUB
      ? '₽'
      : currency === CurrencySimbols.EUR
      ? '€'
      : '$';

  return (
    <article
      className={`${styles.flight_card_container} text text_type_normal`}
    >
      <div
        className={`${styles.header_wrapper} container pt-12 pb-12 pl-16 pr-16`}
      >
        <div className={styles.logo} />
        <div
          className={`${styles.price_wrapper} text_type_align_end text_type_light_main`}
        >
          <span className={`text_size_l`}>
            {`${flight.price.total.amount} ${currencySimbol}`}
          </span>
          <span className={`text_size_s`}>
            Стоимость для одного взрослого пассажира
          </span>
        </div>
      </div>
      <div className={styles.legs_wrapper}>
        <LegBrief leg={flight.legs[0]}></LegBrief>
        <LegBrief leg={flight.legs[1]}></LegBrief>
      </div>
      <div className={styles.footer}>
        <Button
          buttonType="primary"
          actionType="button"
          label="ВЫБРАТЬ"
          size="fullWidth"
        />
      </div>
    </article>
  );
};
