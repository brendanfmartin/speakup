const speak_up_lib = {
  craft_email: () => {
    const matter = speak_up_lib.get_radio_value('matter');
    const official = speak_up_lib.get_radio_value('official');
    const mailto = speak_up_maps.official[official].mailto;
    const subject = `${speak_up_maps.official[official].subject} - ${speak_up_maps.matter[matter].subject}`;
    const body = `${speak_up_maps.matter[matter].body} ${speak_up_maps.official[official].body}`;
    window.location.href = `mailto:${mailto}?body=${encodeURIComponent(body)}&subject=${encodeURIComponent(subject)}`;
  },

  get_radio_value: (elName) => Array.prototype.slice.call(document.getElementsByName(elName)).filter(r => r.checked)[0].value,
};

const speak_up_maps = {
  matter: {
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
      subject: 'Jim Kenney'
    },
    pat_toomey: {
      mailto: 'pat_toomey@pagov.com',
      body: ' And fuck you Pat Toomey',
      subject: 'Pat Toomey'
    },
    thomas_murt: {
      mailto: 'thomas_murt@pagov.com',
      body: ' And fuck you Thomas Murt',
      subject: 'Thomas Murt'
    },
  }
};
