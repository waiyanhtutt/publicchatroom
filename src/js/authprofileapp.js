import { Authorize } from "./authorize.js";
import { UiElement } from "./uielement.js";

// UI
const userinfodiv = document.getElementById("userinfo");
const logoutbtn = document.getElementById("logoutbtn");

// Authorize instance
const authorie = Authorize();

// UI Element Instance
const uiele = UiElement(userinfodiv);

// Get info and Render
authorie.getUser((data) => {
  console.log(data);

  uiele.UserinfoEle(data);
});

// Logout
logoutbtn.addEventListener("click", () => {
  const { logoutUser } = Authorize();
  logoutUser();
});
