export default value => {
	if (!(value)) return null;
	const date = new Date(value);
	return date.toLocaleString(['en-CN'], {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
	});
};
