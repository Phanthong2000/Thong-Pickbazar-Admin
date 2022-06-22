import { replace } from 'lodash';
import numeral from 'numeral';

export const currencyFormat = (num: number) => {
    return '$ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
export function fShortenNumber(num: number) {
    return replace(numeral(num).format('0.00a'), '.00', '');
}