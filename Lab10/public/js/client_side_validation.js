// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!


// login page validations
let loginForm = document.getElementById('signin-form')
if(loginForm) {
    let allowSubmit = true
    loginForm.addEventListener('submit', (event) => {
        console.log("Event executed")

        let username = document.getElementById('username').value.trim()
        let password = document.getElementById('password').value.trim()

        let errorDiv = document.getElementById('error-div')
        errorDiv.innerHTML = ''
        errorDiv.hidden = true
        if(username.length < 5) {
            errorDiv.hidden = false
            errorDiv.innerHTML = 'Username length less than 5 characters'
            allowSubmit = false
        }

        if(username.length > 10 ) {
            errorDiv.hidden = false
            errorDiv.innerHTML = 'Username length greater than 10 characters'
            allowSubmit = false
        }

        if (/\d/.test(username)) {
            errorDiv.hidden = false
            errorDiv.innerHTML = 'Username contain number(s)'
            allowSubmit = false
        }

        if(!/\d/.test(password)) {
            errorDiv.hidden = false
            errorDiv.innerHTML = 'Password does not contain Digit'
            allowSubmit = false
        } 

        if(!/[A-Z]/.test(password)) {
            errorDiv.hidden = false
            errorDiv.innerHTML = 'Password does not contain Uppercase character'
            allowSubmit = false
        }

        if(!/[a-z]/.test(password)) {
            errorDiv.hidden = false
            errorDiv.innerHTML = 'Password does not contain Lowercase character'
            allowSubmit = false
        }

        if(!/[^A-Z0-9a-z]/.test(password)) {
            errorDiv.hidden = false
            errorDiv.innerHTML = 'Password does not contain Special character'
            allowSubmit = false
        }

        if(/\s/.test(password)) {
            errorDiv.hidden = false
            errorDiv.innerHTML = 'Password contains space character'  
            allowSubmit = false 
        }

        if(password.length < 8 ) {
            errorDiv.hidden = false
            errorDiv.innerHTML = 'Password Length is less than 8 characters'
            allowSubmit = false
        }

        if(!allowSubmit) {
            event.preventDefault()
            allowSubmit = true
        } 
        


    })
}


// register page validations
let registerForm = document.getElementById('signup-form')
if(registerForm) {
    let allowSubmit = true
    registerForm.addEventListener('submit', (event) => {
        let errorDiv = document.getElementById('error-div')

        document.getElementsByClassName('errorMessage')[0].innerHTML = ''
        errorDiv.innerHTML = ''
        errorDiv.hidden = true

        let firstName = document.getElementById('firstName').value.trim()
        let lastName = document.getElementById('lastName').value.trim()
        let username = document.getElementById('username').value.trim()
        let password = document.getElementById('password').value.trim()
        let confirmPassword = document.getElementById('confirmPassword').value.trim()
        let favoriteQuote = document.getElementById('favoriteQuote').value.trim()
        let themePreference = document.getElementById('themePreference').value.trim()
        let role = document.getElementById('role').value.trim()

        if(password != confirmPassword) {
            errorDiv.innerHTML = 'Password does not match'
            document.getElementById('password').value = ''
            document.getElementById('confirmPassword').value = ''
            allowSubmit = false
            errorDiv.hidden = false
        }

        if(firstName.length < 2 || firstName.length > 25 || /\d/.test(firstName)) {
            errorDiv.innerHTML = 'First Name is less than 2 characters (OR) greater than 25 characters (OR) contains any digit'
            allowSubmit = false
            errorDiv.hidden = false
        }

        if(lastName.length < 2 || lastName.length > 25 || /\d/.test(lastName)) {
            errorDiv.innerHTML = 'Last Name is less than 2 characters (OR) greater than 25 characters (OR) contains any digit'
            allowSubmit = false
            errorDiv.hidden = false
        }

        if(username.length <= 4 || username.length > 10 || /\d/.test(username)) {
            errorDiv.innerHTML = 'Username is either less than 4 characters (OR) greater than 10 characters (OR) includes a number'
            allowSubmit = false
            errorDiv.hidden = false
        }

        
        if(
            !/\d/.test(password) || 
            !/[A-Z]/.test(password) || 
            !/[a-z]/.test(password) || 
            !/[^A-Z0-9a-z]/.test(password) || 
            /\s/.test(password) ||
            password.length < 8 ) {
                errorDiv.innerHTML = 'Password does not contain atleast 1 Digit (OR) atleast 1 Uppercase Character (OR) atleast 1 Lowercase Character (OR) atleast 1 Special Character (OR) Contain(s) empty space (OR) is less than 8 characters'
                allowSubmit = false
                errorDiv.hidden = false
        }

        if(favoriteQuote.length<20 || favoriteQuote.length>255 || /\d/.test(favoriteQuote)) {
            errorDiv.innerHTML = 'Favorite Quote is less than 20 character (OR) greater than 255 characters (OR) contains any digit'
            allowSubmit = false
            errorDiv.hidden = false
        }

        if (themePreference !== 'dark' && themePreference !== 'light') {
            errorDiv.innerHTML = 'Theme Preference can only be Dark (OR) Light'
            allowSubmit = false
            errorDiv.hidden = false
        }

        if (role !== 'admin' && role !== 'user') {
            errorDiv.innerHTML = 'Role can only be Admin (OR) User'
            allowSubmit = false
            errorDiv.hidden = false
        }

        if(!allowSubmit) {
            event.preventDefault()
            allowSubmit = true
        }
    })
}

