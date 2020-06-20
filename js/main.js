const speak_up_lib = {
  getReps: () => {
    const zip = speak_up_dom.zip().value;
    const key = 'AIzaSyB7qmZN41K4jxK8vqWNuPdurpFfIFvu8_0';
    const url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${zip}`;
    fetch(url)
       .then(res => {
         if (res.status > 299) {
           speak_up_lib.showError();
         } else {
           res.json().then(speak_up_lib.parseData)
         }
       })
       .catch(err => {
         console.error(err);
         speak_up_lib.showError();
       });
  },

  showError: () => {
    speak_up_dom.notification().classList.remove('hidden');
  },

  closeError: () => {
    speak_up_dom.notification().classList.add('hidden');
  },

  parseData: (data) => {
    const localOfficeKeys = ['administrativeArea1', 'administrativeArea2', 'locality', 'regional', 'special', 'subLocality1', 'subLocality2'];
    const localOffices = [];

    /**
     * get only the local offices
     */
    data.offices.forEach((office) => {
      if (localOfficeKeys.indexOf(office.levels[0]) > -1) {
        localOffices.push(Object.assign({}, office));
      }
    });

    /**
     * enrich offices with current officials
     */
    localOffices.forEach((office) => {
      office.officials = [];
      office.officialIndices.forEach(i => {
        office.officials.push(data.officials[i]);
      });
    });

    console.log(localOffices);

  }
};

const speak_up_dom = {
  notification: () => document.getElementById('notification-container'),
  zip: () => document.getElementById('zip')
};
