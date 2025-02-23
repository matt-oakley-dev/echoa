import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs, getCountFromServer, addDoc, Timestamp } from "firebase/firestore";

export const createTranscript = async (content, title) => {
	try {
		const currentUser = auth.currentUser;

		if ( ! currentUser ) {
			throw new Error("User not authenticated");
		}

		const newTranscript = {
			content: content,
			userId: currentUser.uid,
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
		const currentUser = auth.currentUser;
		if (!currentUser) {
			throw new Error("User not authenticated");
		}

		// Query only transcripts where userId matches the current user
		const q = query(
			collection(db, "transcripts"),
			where("userId", "==", currentUser.uid),

		);

		const querySnapshot = await getDocs(q);
		const transcripts = querySnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		}));

		console.log("User's Recent Transcripts:", transcripts);
		return transcripts;
	} catch (error) {
		console.error("Error fetching transcripts:", error);
		return [];
	}
};
