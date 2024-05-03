import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB_e4O4l-t5w70VLeO4u12KdhcjpPPNHSE",
  authDomain: "aplicacion-web-65026.firebaseapp.com",
  projectId: "aplicacion-web-65026",
  storageBucket: "aplicacion-web-65026.appspot.com",
  messagingSenderId: "180700998436",
  appId: "1:180700998436:web:3a9fa2dd2c40d363ad21b1",
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

// Función para guardar un usuario en la base de datos
export const saveUser = async (name, phone, email, interests) => {
  try {
    await addDoc(collection(db, "users"), { name, phone, email, interests });
    console.log("Usuario guardado correctamente.");
  } catch (error) {
    console.error("Error al guardar el usuario:", error);
  }
};

// Función para obtener todos los usuarios de la base de datos
export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
  }
};

// Función para obtener los usuarios en tiempo real
export const onGetUsers = (callback) => {
  onSnapshot(collection(db, "users"), (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    callback(users);
  });
};

// Función para eliminar un usuario de la base de datos
export const deleteUser = async (userId) => {
  try {
    await deleteDoc(doc(db, "users", userId));
    console.log("Usuario eliminado correctamente.");
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
  }
};

// Función para obtener un usuario por su ID
export const getUser = async (userId) => {
  try {
    return await getDoc(doc(db, "users", userId));
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
  }
};

// Función para actualizar un usuario en la base de datos
export const updateUser = async (userId, newData) => {
  try {
    await updateDoc(doc(db, "users", userId), newData);
    console.log("Usuario actualizado correctamente.");
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
  }
};
