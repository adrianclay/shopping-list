import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/locale-data/en'

const timeFormat = (time: Date) => {
  const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
  let diff = ((new Date()).valueOf() - time.valueOf()) / 1000;
  let unit: Intl.RelativeTimeFormatUnit = 'second';
  if(diff > 60) {
    diff /= 60;
    unit = 'minute';
    if (diff > 60) {
      diff /= 60;
      unit = 'hour';
      if(diff > 24) {
        diff /= 24;
        unit = 'day';
        if(diff > 7) {
          diff /= 7;
          unit = 'week';
        }
      }
    }
  }
  return formatter.format(-Math.round(diff), unit);
};

const RelativeTime = ({ time } : { time: Date }) => <time dateTime={time.toISOString()}>
  {timeFormat(time)}
</time>;

export default RelativeTime;
