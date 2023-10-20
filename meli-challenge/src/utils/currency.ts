const currency = (value: string | number = 0, decimalPlaces = 2, includeCurrencySign = true): string => {
	const factor = 10 ** decimalPlaces;
	let decimals: string | number;
	let negative = value.toString().includes("(") || false;

	value = Number(value.toString().replace(/[$,(,)]/g, "")) || 0;

	if (value < 0) {
		value = -value;
		negative = true;
	}

	value = Math.floor(value * factor);
	decimals = value % factor;
	value = Math.floor(value / factor);
	decimals = `${"0".repeat(decimalPlaces)}${decimals}`.substr(-decimalPlaces);

	value = value
		.toString()
		.split(/(?=(?:\d{3})+(?:\.|$))/g)
		.join(",");

	if (decimalPlaces > 0) {
		value = `${value}.${decimals}`;
	}

	if (!includeCurrencySign) {
		return value;
	}

	if (negative) {
		return `-$${value}`;
	}

	return `$ ${value}`;
};

export default currency;
