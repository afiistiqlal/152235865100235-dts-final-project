import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  getDoc,
  collection,
  where,
  addDoc,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    errorMessage(err);
    console.error(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    errorMessage(err.message);
    console.error(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset link sent!");
    errorMessage("Password reset link sent!");
  } catch (err) {
    errorMessage(err);
    console.error(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const fetchUserName = async (uid) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const doc = await getDocs(q);
    const data = doc.docs[0].data();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const errorMessage = (err) => {
  // console.log(err);
  return err;
};

const saveArticle = async (uid, title, post, author, tags = []) => {
  try {
    await addDoc(collection(db, "article"), {
      uid: uid,
      title: title,
      post: post,
      timestamp: Timestamp.fromDate(new Date()),
      author: author,
      tags: tags,
    });
    return true;
  } catch (error) {
    errorMessage(error);
    console.error(error.message);
    return false;
  }
};

const updateArticle = async (title, post, postId, thanks) => {
  try {
    await setDoc(doc(db, "article", postId), {
      // uid: uid,
      title: title,
      post: post,
    });
  } catch (error) {
    errorMessage(error);
    console.error(error.message);
  }
};

const getAllArticles = async () => {
  try {
    const articles = [];
    const docSnap = await getDocs(collection(db, "article"));
    docSnap.forEach((doc) => {
      const data = {
        id: doc.id,
        data: doc.data(),
      };
      articles.push(data);
    });
    return articles;
  } catch (error) {
    console.log(error.message);
  }
};

const getUserArticles = async (uid) => {
  try {
    const q = query(collection(db, "article"), where("uid", "==", uid));
    const doc = await getDocs(q);
    return doc.docs;
  } catch (error) {
    errorMessage(error);
    console.error(error.message);
  }
};

const getArticleById = async (id) => {
  try {
    const docRef = doc(db, "article", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    errorMessage(error);
    console.error(error.message);
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  fetchUserName,
  errorMessage,
  saveArticle,
  updateArticle,
  getUserArticles,
  getAllArticles,
  getArticleById,
};
