export default function getFormattedTimestamp(timestamp: Date = new Date()) {
  const date = new Date(timestamp);
  const locale = navigator.language;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone,
    localeMatcher: 'lookup',
  };

  return new Intl.DateTimeFormat(locale, options).format(date);
}
