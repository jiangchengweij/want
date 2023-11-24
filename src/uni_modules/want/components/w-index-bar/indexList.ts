export default function indexList() {
	const indexList: string[] = [];
	const charCodeOfA = 'A'.charCodeAt(0);

	for (let i = 0; i < 26; i++) {
		indexList.push(String.fromCharCode(charCodeOfA + i));
	}
	return indexList;
}