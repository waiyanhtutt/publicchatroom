import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { signOut } from "firebase/auth";

export function Authorize() {
  const registerUser = async (fullname, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // console.log(user); display user data
      // const auth = getAuth();
      await updateProfile(auth.currentUser, {
        displayName: fullname,
        photoURL: "https://static.thenounproject.com/png/65476-200.png",
      }).then(() => {
        // Redirect to index.html
        window.location.href = "../index.html";
      });
    } catch (err) {
      console.log("Error Loggin User : ", err);
    }
  };

  // signin
  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log(userCredential.user);

        // set name to localStorage
        setLocalName(userCredential.user);

        window.location.href = "../index.html";
      })
      .catch((error) => {
        console.log("Error Registering User : ", error.message);
      });
  };

  // signout

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        //unset name from local Storage
        unsetLocalName();

        window.location.href = "../signin.html";
      })
      .catch((error) => {
        console.log("Error Logging Out = ", error.message);
      });
  };

  // reset Password
  const resetPassword = async (email, msg) => {
    try {
      await sendPasswordResetEmail(auth, email);

      msg.textContent = "Password Reset Email Send.Please Check your inbox.";
      msg.style.color = "green";
      msg.style.fontSize = "11px";
    } catch {
      console.error("Error Sending Password Reset Email : ", error.message);

      msg.textContent = `Error : ${error.message}`;
      msg.style.color = "red";
      msg.style.fontSize = "11px";
    }
  };

  // Google sign in
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result);

        // set name to localStorage
        setLocalName(result.user.displayName);
        // Redirect to index.html
        window.location.href = "../index.html";
      })
      .catch((error) => {
        console.log("Error with Google Sign In : ", error.message);
      });
  };

  // Auth check
  const isLoggedIn = () => {
    onAuthStateChanged(auth, (userdata) => {
      if (userdata) {
        return true;
      } else {
        // Redirect to signin.html
        window.location.href = "../signin.html";
      }
    });
  };

  // Get User Info
  const getUser = (callback) => {
    // callback("Hello Sir");
    onAuthStateChanged(auth, (userdata) => {
      if (userdata) {
        callback(userdata);
      }
    });
  };

  const setLocalName = (userdata) => {
    localStorage.setItem("username", userdata.displayName);
  };

  const unsetLocalName = () => {
    localStorage.removeItem("username");
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    resetPassword,
    googleLogin,
    isLoggedIn,
    getUser,
  };
}

// const logoutUser = ()=>{
//     signOut(auth)
//     .then(()=>{
//         window.location.href = "../signin.html";
//     }).catch((error)=>{
//         console.log("Error Logging Out = " , error.message);
//     })
// }

// const loginUser = {email,password}=>{
//     signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{

//     })
// }

// const googleLogin = ()=>{
//     const provider = new GoogleAuthProvider();

//     signInWithPopup(auth,provider).then((result)=>{
//         window.location.href =
//     })
// }
