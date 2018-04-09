import {REDIRECT} from "constants/services";
import history from 'utils/history';

export function redirect(to) {
  return function (dispatch) {
    history.push(`${process.env.PUBLIC_URL}${to}`);
    dispatch({type: REDIRECT, payload: {to}});
  }
}
