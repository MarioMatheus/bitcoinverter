export var homePage = {
  definePage: function(app) {
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
        <ion-content padding>
        <div style="
          position: absolute;
          margin: auto;
          top: 0; right: 0; bottom: 0; left: 0;
          width: 100%; height: 45%;">
          <ion-grid>
            <ion-row>
              <ion-col size="2"></ion-col>
              <ion-col size="8">
                <ion-item>
                  <ion-select
                    slot="start"
                    interface="popover"
                    value="bitcoin"
                    ok-text="Ok"
                    cancel-text="Cancel">
                  </ion-select>
                  <ion-input type="number" placholder="input"></ion-input>
                </ion-item>
              </ion-col>
              <ion-col size="2"></ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="2"></ion-col>
              <ion-label style="text-align: center; font-size: 12vw;"></ion-label>
              <ion-col size="2"></ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="2"></ion-col>
              <ion-button
                id="convertButton" 
                style="margin: auto;" color="dark"> Convert </ion-button>
              <ion-col size="2"></ion-col>
            </ion-row>
          </ion-grid>
        </div>
        </ion-content>
        `;

        this.putSelectOptions();
        this.querySelector('ion-input').value = app.currencies[app.optionSelected];
        this.convertToBitcoin();
        this.querySelector('#convertButton').onclick = this.convertToBitcoin;
        this.setupNavigation();
      }


      putSelectOptions() {
        let select = this.querySelector('ion-select');
        for(const currency in app.currencies) {
          let option = document.createElement('ion-select-option');
          option.value = currency;
          option.textContent = currency;
          select.appendChild(option);
        }

        select.value = app.optionSelected;
      }


      async setupNavigation() {
        const navPush = this.querySelector('#navPush');
        await navPush.componentOnReady();
        navPush.component = 'list-page';
      }


      convertToBitcoin() {
        let textField = document.querySelector('ion-input');
        let number = Number(textField.value);
        
        let currency = document.querySelector('ion-select').value;
        let bitcoinValue = app.currencies[currency];

        document.querySelector('ion-label').textContent = `₿ ${(number/bitcoinValue).toFixed(4)}`;

        localStorage.optionSelected = document.querySelector('ion-select').value;
      }
      

    });
  }
};