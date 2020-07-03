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
    const official = speak_up_lib.get_radio_value('official');
    const tel = speak_up_maps.official[official].tel;
    // build a page for info
    window.location.href = `tel:${tel}}`;
  },

  go_to_petition: () => {
    const matter = speak_up_lib.get_radio_value('matter');
    const petition = speak_up_maps.matter[matter].petition;
    window.open(petition)
  },

  select_matter: () => {
    const matter = speak_up_lib.get_radio_value('matter');
    document.getElementById('official-list').hidden = false;
    speak_up_lib.clear_officials(matter);
    speak_up_lib.show_officials(matter);
  },

  show_topics: () => {
    for (const topic in speak_up_maps.matter) {
      const radio = `
         <input onclick="speak_up_lib.select_matter()" type="radio" id="${topic}" name="matter" value="${topic}">
         <label for="${topic}"><span><span></span></span>${speak_up_maps.matter[topic].label}</label>
         <p class="topic-info">${speak_up_maps.matter[topic].info}</p>`;
      let d = document.createElement('div');
      d.innerHTML = radio;
      document.getElementById('topic-list-dynamic').append(d);
    }
  },

  show_officials: (matter) => {
    speak_up_maps.matter[matter].officials.forEach(o => {
      const of = speak_up_maps.official[o];
      const radio = `
        <input onclick="speak_up_lib.select_official()" type="radio" id="${of.id}" name="official" value="${of.id}">
        <label for="${of.id}"><span><span></span></span>${of.name}</label>`;
      let d = document.createElement('div');
      d.innerHTML = radio;
      document.getElementById('official-list-dynamic').append(d);
    });
  },

  clear_officials: () => document.getElementById('official-list-dynamic').innerHTML = '',

  select_official: () => {
    document.getElementById('craft-tel').disabled = false;
    document.getElementById('craft-email').disabled = false;
    document.getElementById('craft-petition').disabled = false;
  },

  get_radio_value: (elName) => Array.prototype.slice.call(document.getElementsByName(elName)).filter(r => r.checked)[0].value,
};

const speak_up_maps = {

  /**
   * matter
   *
   * general info
   * email body
   * officials to contact. array by key
   */
  matter: {
    capt_fisher: {
      label: 'Fire Captain Fisher',
      info: 'On Monday, June 1 2020, a vigilante group consisting of 60-100 people armed with bats, clubs, pipes, and hatchets marched freely on Girard Ave.<br/>PPD\'s 26th Precinct, including Capt. William Fisher knew about the vigilante mob, encouraged, enabled, and protected them',
      petition: 'https://www.change.org/p/mayor-jim-kenney-remove-capt-william-fisher-from-philadelphia-police-department-26th-precinct',
      officials: ['jim_kenney']
    }
  },

  /**
   * officials
   *
   * contact info only
   */
  official: {
    jim_kenney: {
      mailto: 'james.kenney@phila.gov',
      tel: '(215) 686-2181',
      name: 'Mayor Jim Kenney',
      id: 'jim_kenney'
    },
    robert_schroeder: {
      mailto: 'robert.schroeder@louisvilleky.gov',
      tel: '5025747111',
      name: 'Interim Chief of Police Robert Schroeder',
      id: 'robert_schroeder'
    }
  }
};

speak_up_lib.show_topics();
