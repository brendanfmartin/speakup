const speak_up_lib = {
  show_modal: () => document.getElementById('modal').hidden = false,

  close_modal: () => document.getElementById('modal').hidden = true,

  craft_email: () => {
    // get the matter and official
    const matter = speak_up_lib.get_radio_value('matter');
    const official = speak_up_lib.get_radio_value('official');

    // show button
    document.getElementById('modal-action').innerText = 'Email';
    document.getElementById('modal-action').disabled = false;
    document.getElementById('modal-action').onclick = () => {
      const mailto = speak_up_maps.official[official].mailto;
      const subject = '[ADD YOUR SUBJECT]';
      const body = `${speak_up_maps.official[official].name}\n\n${speak_up_maps.matter[matter].email_body}`;
      window.location.href = `mailto:${mailto}?body=${encodeURIComponent(body)}&subject=${encodeURIComponent(subject)}`;
    };

    // set info
    document.getElementById('modal-points').innerHTML = '<p>Customize your email subject, body, and signature.</p>';

    // show modal
    speak_up_lib.show_modal();
  },

  craft_tel: () => {
    console.log('test')
    // get the matter and official
    const matter = speak_up_lib.get_radio_value('matter');
    const official = speak_up_lib.get_radio_value('official');

    // show button
    document.getElementById('modal-action').innerText = 'Call';
    document.getElementById('modal-action').disabled = false;
    document.getElementById('modal-action').onclick = () => {
      const tel = speak_up_maps.official[official].tel;
      window.location.href = `tel:${tel}}`;
    };

    // set info
    document.getElementById('modal-points').innerHTML = '<p>Put the phone on speaker.</p><p>Refer to these points.</p>';
    document.getElementById('modal-points').innerHTML += speak_up_maps.matter[matter].info;

    // show modal
    speak_up_lib.show_modal();
  },

  go_to_petition: () => {
    const matter = speak_up_lib.get_radio_value('matter');
    const petition = speak_up_maps.matter[matter].petition;
    window.open(petition);
  },

  select_matter: () => {
    const matter = speak_up_lib.get_radio_value('matter');
    document.getElementById('official-list').hidden = false;
    document.getElementById('craft-petition').disabled = false;
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
      info: 'On Monday, June 1 2020, a vigilante group consisting of 60-100 people armed with bats, clubs, pipes, and hatchets marched freely on Girard Ave.<br/><br/>PPD\'s 26th Precinct, including Capt. William Fisher knew about the vigilante mob, encouraged, enabled, and protected them.',
      petition: 'https://www.change.org/p/mayor-jim-kenney-remove-capt-william-fisher-from-philadelphia-police-department-26th-precinct',
      email_body: `On Monday, June 1 2020, a vigilante group consisting of 60-100 people armed with bats, clubs, pipes, and hatchets marched freely on Girard Ave. PPD's 26th Precinct, including Capt. William Fisher knew about the vigilante mob, encouraged, enabled, and protected them.\n\n[ADD YOUR TEXT HERE]\n\n[SIGN HERE]`,
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
