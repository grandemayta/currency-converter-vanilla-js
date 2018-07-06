import { html, render } from 'lit-html';

export default class Header {
  constructor(title) {
    this.title = title;
  }

  template() {
    return html`
      <header>
          <h3 class="pt-4 pb-4 text-center">${this.title}</h3>
      </header>
    `;
  }

  load() {
    render(this.template(), document.querySelector('app-header'));
  }
}
