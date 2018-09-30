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
          <ion-list></ion-list>
        </ion-content>
        `;

        this.setTableContent();
      }

      addItemAtTable(title, subtitle) {
        let item = document.createElement('ion-item');
        let label = document.createElement('ion-label');
        let titleHead = document.createElement('h2');
        let subtitleParagraph = document.createElement('p');

        titleHead.textContent = title;
        subtitleParagraph.textContent = subtitle;

        label.appendChild(titleHead);
        label.appendChild(subtitleParagraph);
        item.appendChild(label)

        this.querySelector('ion-list').appendChild(item);
      }


      setTableContent() {
        this.getCurrencies((data) => {
          for(const currency in data) {
            if(data.hasOwnProperty(currency)) {
              const element = data[currency];
              this.addItemAtTable(currency, element['15m']) ;
            }
          }
        });
      }


      getCurrencies(completion) {
        let request = new XMLHttpRequest();
        request.onload = function() {
          let data = JSON.parse(this.response); 
          if(request.status >= 200 && request.status < 400) {
            completion(data);
          }
        };

        request.open('GET', 'https://blockchain.info/ticker', true);
        request.send();
      }

    });
  }
}
