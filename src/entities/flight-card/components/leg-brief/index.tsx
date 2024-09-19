import { SegmentKind } from '../../../../shared/types/flight-card.types';
import { FlightLegType } from '../../../../shared/types/flights.types';
import { SegmentBrief } from '../segment-brief';
import styles from './styles.module.css';

type LegBriefProps = {
  leg: FlightLegType;
};

export const LegBrief = ({ leg }: LegBriefProps) => {
  const duration = Number(leg.duration);
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const firstSegment = leg.segments[0];
  const lastSegment = leg.segments[leg.segments.length - 1];

  const getDirectionContent = () => {
    return (
      <div
        className={`${styles.direction} container p-12 text text_type_normal text_size_l`}
      >
        <div className={`${styles.airport_wrapper} container`}>
          {firstSegment.departureCity && (
            <span>{`${firstSegment.departureCity.caption}, `}</span>
          )}
          <span>{`${firstSegment.departureAirport.caption} `}</span>
          <span
            className={`text_type_accent`}
          >{`(${firstSegment.departureAirport.uid}) `}</span>
        </div>
        <span className={`${styles.arrow} text_type_accent`}>&rarr;</span>
        <div className={`${styles.airport_wrapper} container`}>
          {lastSegment.arrivalCity && (
            <span>{`${lastSegment.arrivalCity.caption}, `}</span>
          )}
          <span>{`${lastSegment.arrivalAirport.caption} `}</span>
          <span
            className={`text_type_accent`}
          >{`(${lastSegment.arrivalAirport.uid})`}</span>
        </div>
      </div>
    );
  };

  const getLayoversContent = () => {
    const layoversNum: number = leg.segments.length - 1;
    switch (layoversNum) {
      case 0:
        return 'Без пересадок';
      case 1:
        return `${layoversNum} пересадка`;
      case 2:
      case 3:
      case 4:
        return `${layoversNum} пересадки`;
      default:
        return `${layoversNum} пересадок`;
    }
  };

  return (
    <div
      className={`${styles.leg_brief_container} container pl-12 pr-12 text text_size_m`}
    >
      {getDirectionContent()}
      <div
        className={`${styles.segments_wrapper} container pt-12 pb-8 pr-12 pl-12`}
      >
        <SegmentBrief
          segment={firstSegment}
          segmentKind={SegmentKind.FIRST}
        ></SegmentBrief>
        <div
          className={`${styles.duration} text_size_l`}
        >{`${hours} ч ${minutes} мин`}</div>
        <SegmentBrief
          segment={lastSegment}
          segmentKind={SegmentKind.LAST}
        ></SegmentBrief>
      </div>
      <div className={styles.layovers}>
        <div className={styles.layovers_line}></div>
        <div
          className={`${styles.layovers_content} container text_type_high_accent`}
        >
          {getLayoversContent()}
        </div>
        <div className={styles.layovers_line}></div>
      </div>
      <div
        className={`${styles.airline} container p-12`}
      >{`Рейс выполняет: ${leg.segments[0].airline.caption}`}</div>
    </div>
  );
};
