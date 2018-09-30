export var listPage = {
  definePage: function() {
    customElements.define("list-page", class extends HTMLElement {

      constructor() {
        super();
      }

      connectedCallback() {
        this.innerHTML = `
        <ion-header>
          <ion-toolbar color="dark">
            <ion-buttons slot="start">
              <ion-nav-pop>
                <ion-button>
                  <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
                <ion-button>
              </ion-nav-pop>
            </ion-buttons>
            <ion-title>Around the world</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
        </ion-content>
        `;
      }
    });
  }
}
