import { html, render } from 'lit-html';
import { httpWrapper } from '../../services';

export default class Exchange {
  constructor() {
    this.url = 'https://exchangeratesapi.io/api/latest';
    this.currencies = ['EUR', 'USD', 'CHF', 'ZAR', 'GBP'];
    this.slcCurrencyFrom = null;
    this.slcCurrencyTo = null;
    this.iptAmount = null;
    this.btnCalculate = null;
    this.txtResult = null;
  }

  onInit() {
    this.slcCurrencyFrom = document.querySelector('#slc-currency-from');
    this.slcCurrencyTo = document.querySelector('#slc-currency-to');
    this.iptAmount = document.querySelector('#ipt-amount');
    this.btnCalculate = document.querySelector('#btn-calculate');
    this.txtResult = document.querySelector('#txt-result');
  }

  onAmount() {
    this.iptAmount.addEventListener('keyup', $event => {
      let amount = $event.target.value;
      this.txtResult.classList.add('d-none');
      if (amount === '') {
        this.btnCalculate.setAttribute('disabled', true);
        return;
      }
      this.btnCalculate.removeAttribute('disabled', false);
    });
  }

  onCurrencyFrom() {
    this.slcCurrencyFrom.addEventListener('change', $event => {
      let currencyFrom = $event.target.value;
      this.updateCurrenciesTo(currencyFrom);
    });
  }

  onCalculate() {
    this.btnCalculate.addEventListener('click', $event => {
      $event.preventDefault();
      let amount = this.iptAmount.value;
      let currencyFrom = this.slcCurrencyFrom.value;
      let currencyTo = this.slcCurrencyTo.value;
      this.convertAmount(amount, currencyFrom, currencyTo);
    });
  }

  updateCurrenciesTo(currencyFrom) {
    this.slcCurrencyTo.innerHTML = '';
    this.currencies.forEach(currency => {
      if (currencyFrom !== currency) {
        let option = document.createElement('option');
        option.text = currency;
        option.value = currency;
        this.slcCurrencyTo.appendChild(option);
      }
    });
  }

  async convertAmount(amount, from, to) {
    let querystring = `base=${from}&symbols=${to}`;
    let data = await httpWrapper(`${this.url}?${querystring}`);
    let amountConverted = parseFloat(amount * data.rates[to]).toFixed(2);
    this.txtResult.innerHTML = amountConverted;
    this.txtResult.classList.remove('d-none');
  }

  template() {
    return html`
      <form class="pt-4">
        <div class="form-row">
          <div class="col-sm">
            <div class="form-group">
              <label for="ipt-amount" class="bmd-label-floating">Type amount</label>
              <input id="ipt-amount" type="text" class="form-control">
            </div>
          </div>
          <div class="col-sm">
            <div class="form-group">
                <label for="slc-currency-from" class="bmd-label-floating">Select Currency</label>
                <select class="form-control" id="slc-currency-from">
                  ${this.currencies.map(
                    currency => currency !== 'USD' && html`<option>${currency}</option>`
                  )}
                </select>
            </div>
          </div>
          <div class="col-sm">
            <div class="form-group">
                <label for="slc-currency-from" class="bmd-label-floating">Select Currency</label>
                <select class="form-control" id="slc-currency-to">
                  ${this.currencies.map(
                    currency => currency !== 'EUR' && html`<option>${currency}</option>`
                  )}
                </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm d-flex justify-content-center">
            <button id="btn-calculate" class="btn btn-raised btn-primary mt-4" disabled>Calulate</button>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <div id="txt-result" class="alert alert-success text-center d-none mt-4 pt-4 pb-4"></div>
          </div>
        </div>
      </form>
    `;
  }

  load() {
    render(this.template(), document.querySelector('app-exchange'));
    this.onInit();
    this.onAmount();
    this.onCurrencyFrom();
    this.onCalculate();
  }
}
