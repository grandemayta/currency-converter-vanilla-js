import { html, render } from 'lit-html';
import { httpWrapper } from '../../services';

export default class Exchange {
  constructor() {
    this.url = 'https://exchangeratesapi.io/api/latest';
  }

  async convertAmount(amount, from, to) {
    let querystring = `base=${from}&symbols=${to}`;
    let data = await httpWrapper(`${this.url}?${querystring}`);
    let amountConverted = parseFloat(amount * data.rates[to]).toFixed(2);
    document.querySelector('#amount-converted').innerHTML = amountConverted;
  }

  calculate() {
    let btnCalculate = document.querySelector('#btn-calculate');
    btnCalculate.addEventListener('click', $event => {
      $event.preventDefault();
      let iptAmount = document.querySelector('#ipt-amount');
      let amount = iptAmount.value;
      let slcCurrencyFrom = document.querySelector('#slc-currency-from');
      let currencyFrom = slcCurrencyFrom.value;
      let slcCurrencyTo = document.querySelector('#slc-currency-to');
      let currencyTo = slcCurrencyTo.value;
      this.convertAmount(amount, currencyFrom, currencyTo);
    });
  }

  template() {
    return html`
      <div>
        <div class="row">
          <div class="col-sm">
            <div class="form-group">
              <label for="ipt-amount" class="bmd-label-floating">Type amount</label>
              <input id="ipt-amount" type="email" class="form-control">
            </div>
          </div>
          <div class="col-sm">
            <div class="form-group">
                <label for="slc-currency-from" class="bmd-label-floating">Select Currency</label>
                <select class="form-control" id="slc-currency-from">
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
            </div>
          </div>
          <div class="col-sm">
            <div class="form-group">
                <label for="slc-currency-from" class="bmd-label-floating">Select Currency</label>
                <select class="form-control" id="slc-currency-to">
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <button id="btn-calculate">Calulate</button>
            <h2 id="amount-converted" class="text-center"></h2>
          </div>
        </div>
      </div>
    `;
  }

  load() {
    render(this.template(), document.querySelector('app-exchange'));
    this.calculate();
  }
}
