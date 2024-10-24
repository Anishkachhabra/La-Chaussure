const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

function signup(event) {
    event.preventDefault(); // Prevent default form submission behavior

    var email = document.getElementById('email').value;
    var userName = document.getElementById('userName').value;
    var password = document.getElementById('password').value;

    // Simple validation to check if fields are filled
    if (!email || !userName || !password) {
        alert("All fields are required!");
        return;
    }

    var user = {
        email: email,
        userName: userName,
        password: password, // Consider hashing passwords in a real application
    };

    var json = JSON.stringify(user);
    localStorage.setItem(userName, json);
    console.log('User added');
    alert('Signup successful!'); // User feedback
}

function validate() {
    let u = document.loginform.uname.value; // Change this to match your input field name
    let p = document.loginform.pwd.value; // Change this to match your input field name

    // Check if the user exists in localStorage
    let storedUser = localStorage.getItem(u);
    if (storedUser) {
        let user = JSON.parse(storedUser); // Parse the stored user object

        // Verify username and password
        if (u === user.userName && p === user.password) {
            alert("Login Successful");
            return true; // Successful login
        } else if(u != user.userName || p != user.passwor){
            document.getElementById("error").textContent = "Invalid Username or Password";
            alert("Invalid Credentials ");

            return false; // Invalid credentials
        }
    } else {
        document.getElementById("error").textContent = "User does not exist";
        alert("user not found please sign up ");
        return false; // User not found
    }
}