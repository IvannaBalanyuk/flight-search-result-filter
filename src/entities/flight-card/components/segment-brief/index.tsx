import styles from './styles.module.css';

import { SegmentType } from '../../../../shared/types/flights.types';
import { SegmentKind } from '../../../../shared/types/flight-card.types';
import { DAYS, MONTHS } from '../../../../shared/constants';

type SegmentBriefProps = {
  segment: SegmentType;
  segmentKind: SegmentKind;
};

export const SegmentBrief = ({ segment, segmentKind }: SegmentBriefProps) => {
  const segmentDate =
    segmentKind === SegmentKind.FIRST
      ? new Date(Date.parse(segment.departureDate))
      : new Date(Date.parse(segment.arrivalDate));

  const getDate = (date: Date) => {
    return `${date.getDate()} ${MONTHS[date.getMonth()]} ${
      DAYS[date.getDay()]
    }`;
  };

  const getTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const containerExtraStyle =
    segmentKind === SegmentKind.LAST
      ? styles.segment_brief_container_extra
      : '';

  return (
    <div
      className={`${styles.segment_brief_container} ${containerExtraStyle} container text text_size_m`}
    >
      {segmentKind === SegmentKind.FIRST ? (
        <>
          <div className={`text_size_l`}>{getTime(segmentDate)}</div>
          <div className={`text_type_accent`}>{getDate(segmentDate)}</div>
        </>
      ) : (
        <>
          <div className={`text_type_accent`}>{getDate(segmentDate)}</div>
          <div className={`text_size_l`}>{getTime(segmentDate)}</div>
        </>
      )}
    </div>
  );
};
