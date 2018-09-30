export var homePage = {
  definePage: function() {
    customElements.define("home-page", class extends HTMLElement {

      constructor() {
        super();
      }

      connectedCallback() {
        this.innerHTML = `
        <ion-header>
          <ion-toolbar color="dark">
            <ion-title>Bitcoinverter</ion-title>
            <ion-buttons slot="secondary">
              <ion-nav-push id="navPush" component="">
                <ion-button>
                    <ion-icon slot="icon-only" name="list-box"></ion-icon>
                </ion-button>
              </ion-nav-push>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-item>
            <ion-select
              interface="popover"
              value="bitcoin"
              ok-text="Ok"
              cancel-text="Cancel">
              <ion-select-option value="bitcoin">Bitcoin</ion-select-option>
            </ion-select>
            <ion-input type="number" placholder="input"></ion-input>
          </ion-item>
        </ion-content>
        `;

        this.setupNavigation();
      }

      async setupNavigation() {
        const navPush = this.querySelector("#navPush");
        await navPush.componentOnReady();
        navPush.component = 'list-page';
      }

    });
  }
};