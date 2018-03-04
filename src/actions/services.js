import {REDIRECT} from "constants/index";
import history from 'utils/history';

export function redirect(to) {
  return function (dispath) {
    history.push(`${process.env.PUBLIC_URL}${to}`);
    dispath({type: REDIRECT, payload: {to}});
  }
}
