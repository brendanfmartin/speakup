const speak_up_lib = {
  getReps: () => {
    speak_up_lib.clearOfficials();
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

  clearOfficials: () => {
    speak_up_dom.officials().innerHTML = '';
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
      localOffices.push(Object.assign({}, office));
      // if (localOfficeKeys.indexOf(office.levels[0]) > -1) {
      //   localOffices.push(Object.assign({}, office));
      // }
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

    localOffices.forEach(office => {
      let html = `<h2>${office.name}<h2>`;
      office.officials.forEach(official => {
        html += `<h3>${official.name}</h3>`;
        console.log(official)
        if (official.emails) {
          official.emails.forEach(email => {
            html += `<a href="mailto:${email}?subject=Important&body=hello">Email</a>`
          });
        }
      });
      speak_up_dom.officials().innerHTML += html;
    });

    // {
    //   "name": "Governor of Pennsylvania",
    //    "divisionId": "ocd-division/country:us/state:pa",
    //    "levels": [
    //   "administrativeArea1"
    // ],
    //    "roles": [
    //   "headOfGovernment"
    // ],
    //    "officialIndices": [
    //   5
    // ],
    //    "officials": [
    //   {
    //     "name": "Tom Wolf",
    //     "address": [
    //       {
    //         "line1": "508 Main Capitol Building",
    //         "city": "Harrisburg",
    //         "state": "PA",
    //         "zip": "17120"
    //       }
    //     ],
    //     "party": "Democratic Party",
    //     "phones": [
    //       "(717) 787-2500"
    //     ],
    //     "urls": [
    //       "https://www.governor.pa.gov/"
    //     ],
    //     "photoUrl": "https://www.governor.pa.gov/wp-content/uploads/2015/05/Governor_Tom_Wolf-e1437147843966.jpg",
    //     "emails": [
    //       "Governor@pa.gov"
    //     ],
    //     "channels": [
    //       {
    //         "type": "Facebook",
    //         "id": "governorwolf"
    //       },
    //       {
    //         "type": "Twitter",
    //         "id": "governortomwolf"
    //       },
    //       {
    //         "type": "YouTube",
    //         "id": "UC8cXXCdLzcYoYGa_BqaPsgA"
    //       }
    //     ]
    //   }
    // ]
    // }



  }
};

const speak_up_dom = {
  notification: () => document.getElementById('notification-container'),
  zip: () => document.getElementById('zip'),
  officials: () => document.getElementById('officials')
};
