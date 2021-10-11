let ShortName = function (name) {
  if (typeof name !== 'string') {
    return name;
  }
  let names = name.split(' ');
  if (names.length === 1) {
    return name.length < 10 ? name : name.substr(0, 8) + '...';
  }
  let firstName = names[0].length < 10 ? names[0] : names[0].substr(0, 8) + '.';
  let lastName = names[names.length - 1];
  let lastInitial = `${lastName.substr(0, 1)}.`;
  return `${firstName} ${lastInitial}`;
};

module.exports = ShortName;
