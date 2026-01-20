function addNewUser(username, email, password, confirmPassword) {

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
  const usernameRegex = /^[A-Za-z][A-Za-z0-9 ]*$/;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!usernameRegex.test(username)) {
    showCustomAlert("Username must start with a letter and can contain only letters and numbers.");
    return;
}
  if (!emailRegex.test(email)) {
      showCustomAlert("Invalid email format!");
      return;
  }

  if (!passwordRegex.test(password)) {
    showCustomAlert("Password must contain at least 1 uppercase, 1 lowercase, 1 special character, and be at least 8 characters long.");
      return;
  }
 
  if (password !== confirmPassword) {
      showCustomAlert("Passwords does not match!");
      return;
  }

  if (users.some(user => user.email.toLowerCase() === email.toLowerCase() || user.username.toLowerCase() === username.toLowerCase())) {
      showCustomAlert("User already exists!");
      return;
  }

  let hashedPassword = CryptoJS.SHA256(password).toString();

  users.push({ username, email, password: hashedPassword });
  localStorage.setItem("users", JSON.stringify(users));

  showCustomAlert("New user added successfully!");
}
// addNewUser("YOMNA","Yomnaelwan19@gmail.com","Yomna@123","Yomna@123");
// addNewUser("Saif","Saif15@gmail.com","Saif@123","Saif@123");

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let userInput = document.getElementById("userName").value.trim();
      let password = document.getElementById("password").value.trim();
      let confirmPassword = document.getElementById("confirmPassword").value.trim();
      let users = JSON.parse(localStorage.getItem("users")) || [];

      let user = users.find(user => 
          user.email.toLowerCase() === userInput.toLowerCase() || 
          user.username.toLowerCase() === userInput.toLowerCase()
      );

      if (user) {
          let hashedInputPass = CryptoJS.SHA256(password).toString();
          let hashedInputConfirmPass=CryptoJS.SHA256(confirmPassword).toString();
        
        
          if (hashedInputPass === user.password  && hashedInputConfirmPass===user.password) {
            showCustomAlert(`Welcome, ${user.username}!`, function() {
              localStorage.setItem("loggedInUser", user.username);
              window.location.href = "index.html"; 
            });
        }
           else if (hashedInputPass !== user.password){
                showCustomAlert("Invalid Password")
           }
           else if (hashedInputConfirmPass !==user.hashedInputPass){
              showCustomAlert("Password Doesn't Match");
          }
      } else {
          showCustomAlert("User not found!");
      }
  });
});


function showHidePassword() {
  let passwordField = document.getElementById("password");
  let confirmPasswordField = document.getElementById("confirmPassword");
  let showPassCheckbox = document.getElementById("showPassword");

  let type = showPassCheckbox.checked ? "text" : "password";
  passwordField.type = type;
  confirmPasswordField.type = type;
}



