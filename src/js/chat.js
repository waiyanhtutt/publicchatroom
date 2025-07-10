import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  Timestamp,
  query,
  where,
  orderBy,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

export function Chatroom(room, username) {
  let curroom = room;
  let curuser = username;
  const dbRef = collection(db, "chats");
  let unsubscribe = null;

  const addChat = async (message) => {
    const now = new Date();
    const chatdata = {
      username: curuser,
      room: curroom,
      message,
      created_at: Timestamp.fromDate(now),
    };

    try {
      const response = await addDoc(dbRef, chatdata);
      return response;
    } catch (err) {
      console.log("Error addchat = ", err);
      throw err;
    }
  };

  const getChats = (callback) => {
    // onSnapshot(
    //   query(dbRef, where("room", "==", curroom), orderBy("created_at")),
    //   (docSnap) => {
    //     docSnap.forEach((doc) => {
    //       // console.log(doc.data());
    //       callback(doc.data());
    //     });
    //   }
    // );

    // if (unsubscribe) {
    //   unsubscribe();
    // }

    // ဒီလိုရေးလည်းရ

    if (unsubscribe) unsubscribe();

    unsubscribe = onSnapshot(
      query(dbRef, where("room", "==", curroom), orderBy("created_at")),
      (docSnap) => {
        docSnap.docChanges().forEach((item) => {
          console.log(item.doc.data());
          // callback(doc.data());

          if (item.type === "added") {
            callback(item.doc.data());
          }
        });
      }
    );

    // console.log(unsubscribe);
  };

  const updateChatroom = (newroom) => {
    curroom = newroom;
    console.log(`Room Changed to ${curroom}`);
  };

  const updateUsername = (newusername) => {
    curuser = newusername;
    localStorage.setItem("username", curuser);

    // console.log(`User changed to ${curuser}`);
  };

  // Delete All Message in every 15s
  const deleteAllMessages = () => {
    let deleteinter = setInterval(async () => {
      try {
        const getdatas = await getDocs(dbRef);

        // stop Function call if no data in database
        if (getdatas.empty) {
          console.log("No message to delete");

          clearInterval(deleteinter);
          return true;
        }

        getdatas.forEach(async (getdata) => {
          await deleteDoc(doc(db, "chats", getdata.id));
        });

        console.log("All Message Delete Successfully");
      } catch (error) {
        console.error("Error Deleting Message : ", error);
      }
    }, 15000); // 15s
  };

  deleteAllMessages();

  return { addChat, getChats, updateChatroom, updateUsername };
}
