import { html, render } from 'lit-html';
import { Header, Exchange } from '../../components';

export default class Home {
  constructor() {
    this.title = 'Exchange Converter';
  }

  template() {
    return html`
            <app-header></app-header>
            <app-exchange></app-exchange>
        `;
  }

  load() {
    render(this.template(), document.querySelector('#root'));
    new Header(this.title).load();
    new Exchange().load();
  }
}
