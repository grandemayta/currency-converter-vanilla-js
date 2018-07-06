import { html, render } from 'lit-html';

export default class Exchange {
  constructor() {
    this.baseUrl = 'https://exchangeratesapi.io/api/latest?base=USD&symbols=EUR';
  }

  template() {
    return html`
      <div>
        <div class="row">
            <div class="col-sm">
              <input id="amount" type="email" class="form-control">
            </div>
            <div class="col-sm">
              <div class="form-group">
                  <label for="currency-from" class="bmd-label-floating">Select Currency</label>
                  <select class="form-control" id="currency-from">
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
              </div>
            </div>
            <div class="col-sm">
              <div class="form-group">
                  <label for="currency-from" class="bmd-label-floating">Select Currency</label>
                  <select class="form-control" id="currency-to">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
              </div>
            </div>
          </div>
      </div>
    `;
  }

  load() {
    render(this.template(), document.querySelector('app-exchange'));
  }
}
