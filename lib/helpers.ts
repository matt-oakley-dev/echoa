export const formatFBDate = (firebaseTimestamp) => {
	if (!firebaseTimestamp?.seconds) return "-";

	const date = new Date(firebaseTimestamp.seconds * 1000);

	return date.toLocaleDateString("en-US", {
		weekday: "long", // "Monday"
		year: "numeric", // "2022"
		month: "long", // "January"
		day: "numeric", // "1"
	});
};
