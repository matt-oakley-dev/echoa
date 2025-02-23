import { db } from "@/lib/firebase";
import { collection, query, limit, getDocs, getCountFromServer, addDoc, Timestamp } from "firebase/firestore";

export const createTranscript = async (content, title) => {
	try {
		const newTranscript = {
			content: content,
			title: title,
			createdAt: Timestamp.now(),
		};

		const docRef = await addDoc(collection(db, "transcripts"), newTranscript);
		console.log("Transcript created with ID:", docRef.id);

		return { id: docRef.id, ...newTranscript };
	} catch (error) {
		console.error("Error creating transcript:", error);
		return null;
	}
};

export const fetchRecentTranscripts = async () => {
	try {
		const q = query(
			collection(db, "transcripts"),
			limit(20) 
		);

		const querySnapshot = await getDocs(q);
		const transcripts = querySnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		}));

		console.log("Recent Transcripts:", transcripts);
		return transcripts;
	} catch (error) {
		console.error("Error fetching transcripts:", error);
		return [];
	}
};

export const fetchTotalTranscripts = async () => {
	try {
		const coll = collection(db, "transcripts");
		const snapshot = await getCountFromServer(coll);
		const total = snapshot.data().count;

		return total;
	} catch (error) {
		return 0;
	}
};
  