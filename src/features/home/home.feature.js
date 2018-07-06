import { html, render } from 'lit-html';
import { Header, Exchange } from '../../components';

export default class Home {
  constructor() {
    this.title = 'VanillaJS';
  }

  template() {
    return html`
            <div>
              <app-header></app-header>
              <app-exchange></app-exchange>
            </div>
        `;
  }

  load() {
    render(this.template(), document.querySelector('#root'));
    new Header().load();
    new Exchange().load();
  }
}
