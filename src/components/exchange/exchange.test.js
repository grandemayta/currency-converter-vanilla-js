import { Selector as selector } from 'testcafe';
import Exchange from './exchange.component';

/* eslint-disable */
fixture`Exchange Component`.page`http://localhost:3002/`;
/* eslint-enable */

let btnCalculate = selector('#btn-calculate');
let iptAmount = selector('#ipt-amount');
let slcCurrencyFrom = selector('#slc-currency-from');
let slcCurrencyTo = selector('#slc-currency-to');
let exchange = new Exchange();

test('calculate button should be disabled', async t => {
  await t.expect(btnCalculate.withAttribute('disabled').exists).ok();
});

test('calculate button should be enabled', async t => {
  await t
    .typeText(iptAmount, '1000')
    .expect(btnCalculate.withAttribute('disabled').exists)
    .notOk();
});

test('values from selects should be differents', async t => {
  await t.expect(slcCurrencyFrom.value).notEql(slcCurrencyTo.value);
});

test('a', async t => {
  await t.expect(exchange.sum()).eql(2);
});
