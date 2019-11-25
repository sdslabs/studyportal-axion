let ShortName = function (name) {
	if (typeof name !== 'string') {
		return name;
	}
	let names = name.split(' ');
	if (names.length === 1) {
		return name;
	}
	let firstName = names[0];
	let lastName = names[names.length - 1];
	let lastInitial = `${lastName.substr(0, 1)  }.`;
	return `${firstName  } ${  lastInitial}`;
};

module.exports = ShortName
