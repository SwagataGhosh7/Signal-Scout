import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  type User,
} from "firebase/auth";

export { auth };

export const signUpWithEmail = async (
  email: string,
  password: string,
  fullName?: string,
): Promise<User> => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (fullName && fullName.trim()) {
    await updateProfile(cred.user, { displayName: fullName.trim() });
  }
  return cred.user;
};

export const signInWithEmail = async (
  email: string,
  password: string,
): Promise<User> => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
};

export const signInWithGoogle = async (): Promise<User> => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const cred = await signInWithPopup(auth, provider);
  return cred.user;
};

export const logOut = async (): Promise<void> => {
  await signOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const sendPasswordReset = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};
