const speak_up_lib = {
  craft_email: () => {
    const matter = speak_up_lib.get_radio_value('matter');
    const official = speak_up_lib.get_radio_value('official');
    const mailto = speak_up_maps.official[official].mailto;
    const subject = `${speak_up_maps.matter[matter].subject}`;
    const body = `${speak_up_maps.matter[matter].body} ${speak_up_maps.official[official].body}`;
    window.location.href = `mailto:${mailto}?body=${encodeURIComponent(body)}&subject=${encodeURIComponent(subject)}`;
  },

  craft_tel: () => {
    const matter = speak_up_lib.get_radio_value('matter');
    const official = speak_up_lib.get_radio_value('official');
    const tel = speak_up_maps.official[official].tel;
    // build a page for info
    window.location.href = `tel:${tel}}`;
  },

  select_matter: () => {
    const matter = speak_up_lib.get_radio_value('matter');
    document.getElementById('official-list').hidden = false;
    speak_up_lib.clear_officials(matter);
    speak_up_lib.show_officials(matter);
  },

  show_officials: (matter) => {
    const officials = [];
    speak_up_maps.matter[matter].officials.forEach(o => officials.push(speak_up_maps.official[o]));
    let d = document.createElement('div');
    const radio = `
        <input onclick="speak_up_lib.select_official()" type="radio" id="${officials[0].id}" name="official" value="${officials[0].id}">
        <label for="${officials[0].id}">${officials[0].name}</label>`;
    d.innerHTML = radio;
    document.getElementById('official-list-dynamic').append(d);
  },

  clear_officials: () => document.getElementById('official-list-dynamic').innerHTML = '',

  select_official: () => {
    document.getElementById('craft-tel').disabled = false;
    document.getElementById('craft-email').disabled = false;
  },

  get_radio_value: (elName) => Array.prototype.slice.call(document.getElementsByName(elName)).filter(r => r.checked)[0].value,
};

const speak_up_maps = {
  matter: {
    breonna_taylor: {
      body: 'tbd',
      subject: 'tbd',
      officials: ['robert_schroeder']
    },
    police_oversight: {
      body: 'We need more police oversight.',
      subject: 'Police Oversight Reform'
    },
    incarceration: {
      body:  'Vacate all sentences for marijuana related charges.',
      subject: 'Police Oversight Reform'
    },
    rent_control: {
      body:  'Gentrification is causing rents to soar.',
      subject: 'Police Oversight Reform'
    }
  },

  official: {
    jim_kenney: {
      mailto: 'jim_kenney@pagov.com',
      body: ' And fuck you Jim Kenney',
    },
    pat_toomey: {
      mailto: 'pat_toomey@pagov.com',
      body: ' And fuck you Pat Toomey',
    },
    thomas_murt: {
      mailto: 'thomas_murt@pagov.com',
      body: ' And fuck you Thomas Murt',
    },
    robert_schroeder: {
      mailto: 'robert.schroeder@louisvilleky.gov',
      body: 'tbd',
      tel: '5025747111',
      phone_text: 'Remain calm',
      name: 'Interim Chief of Police Robert Schroeder',
      id: 'robert_schroeder'
    }
  }
};
