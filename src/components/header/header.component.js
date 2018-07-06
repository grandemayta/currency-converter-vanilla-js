import { html, render } from 'lit-html';

export default class Header {
  constructor() {
    this.title = 'Exchange Converter';
  }

  template() {
    return html`
            <header>
                <h3 class="text-center">${this.title}</h3>
            </header>
        `;
  }

  load() {
    render(this.template(), document.querySelector('app-header'));
  }
}
