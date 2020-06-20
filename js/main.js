const speak_up_lib = {
  select: (e) => {
    e.preventDefault();
    console.log(e.path[0].value);
  },

  getData: () => {
    fetch('https://www.google.com')
       .then(res => speak_up_data.res = res)
       .catch(err => {
         console.error(err);
         speak_up_data.error = err;
       });
  }
};

const speak_up_data = {
  error: undefined,
  res: undefined
};

(() => {
  // speak_up_lib.getData()
})();
