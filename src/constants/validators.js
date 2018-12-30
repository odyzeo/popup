const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const telRegex = /^(\+421 ?|0)(\d{3} ?){2}\d{3}$/;
const zipRegex = /^\d{3} ?\d{2}$/;

export default {
  email: {
    test(value) {
      return emailRegex.test(value);
    },
    message: 'Zadajte správny e-mail.',
  },
  tel: {
    test(value) {
      return telRegex.test(value);
    },
    message: 'Nesprávny tvar. Hodnotu zadajte v\xa0tvare "+421\xa0904\xa0123\xa0456".',
  },
  zip: {
    test(value) {
      return zipRegex.test(value);
    },
    message: 'Nesprávny tvar. Hodnotu zadajte v\xa0tvare "841\xa001".',
  },
  min: {
    test(value, attrs) {
      return value.length >= attrs[0];
    },
    message: 'Minimálny počet znakov je $0.',
  },
  confirmed: {
    test(value, attrs, input) {
      return value === input.closest('form').querySelector(`[name="${attrs[0]}"]`).value;
    },
    message: 'Hesla sa nezhodujú.',
  },
  regex: {
    test(value, attrs) {
      const regex = new RegExp(attrs[0]);
      return regex.test(value);
    },
    message: 'Nesprávny tvar. Hodnotu zadajte v\xa0tvare "$1".',
  },
};
