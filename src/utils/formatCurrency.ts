export const formatCurrency = (number: number): string => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	return formatter.format(number);
};

export const formatViews = (number: number): string => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "decimal",
	});
	return formatter.format(number);
};
