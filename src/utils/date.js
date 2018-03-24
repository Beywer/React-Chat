import moment from 'moment';

export function fromNow(date) {
  try {
    return moment(date).fromNow();
  } catch (err) {
    console.error(err);
    return '';
  }
}
