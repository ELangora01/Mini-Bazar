
document.addEventListener('DOMContentLoaded', () => {
    let loginDiv = document.getElementById('login');
    let signUpDiv = document.getElementById('signUp');
    let otpSection = document.getElementById('otp');
    otpSection.classList.add('hide');

    let loginBtn = document.getElementById('login-btn');
    let signUpBtn = document.getElementById('signUp-btn');
    let switchToSignUp = document.getElementById('switch-to-signUp');
    let switchToLogin = document.getElementById('switch-to-login');

    switchToSignUp.addEventListener('click', () => {
        signUpDiv.classList.remove('hide');
        signUpDiv.classList.add('show');
        loginDiv.classList.add('hide');
    });

    switchToLogin.addEventListener('click', () => {
        loginDiv.classList.remove('hide');
        loginDiv.classList.add('show');
        signUpDiv.classList.add('hide');
    });

//----------------------------------After Clicking Sign Up button-----------------

    let signupAlertText = document.querySelector('.signUp-comment p');
    signUpBtn.addEventListener('click', () => {
        let email = document.getElementById('signUp-email').value;
        let password = document.getElementById('signUp-password').value;

        if (email && password) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(user => user.email === email)) {
                signupAlertText.textContent = 'Email already exists. Please log in.';
                signupAlertText.style.color = "red";
            } else {
                console.log('Showing OTP section');
                otpSection.classList.remove('hide');
                otpSection.classList.add('show');
                signUpDiv.classList.add('hide');
                otp(email, password);
            }
        } else {
            signupAlertText.textContent = 'Please fill both fields.';
            signupAlertText.style.color = 'red';
        }
    });

    let otpGenerateNumber = document.getElementById('otp-number');
    let otpAlertText = document.querySelector('.otp-comment p');
    let resendBtn = document.getElementById('reSend');
    let resendText = document.querySelector('.resend-section p');

    let otpNumber;
    let otpTimer;
    let canResend = true;

    function otp(email, password) {
        otpGeneration(email, password);
        resetResendButton();
    }

//------------------------------------OTP Resend--------------------------------- 
    
    function resetResendButton() {
        if (otpTimer) {
            clearInterval(otpTimer);
        }
        let countdown = 60;
        resendText.textContent = `Wait for ${countdown} seconds to resend OTP`;
        resendBtn.removeEventListener('click', resendOtp);

        resendBtn.classList.add('less-visible');

        otpTimer = setInterval(() => {
            countdown--;
            if (countdown <= 0) {
                clearInterval(otpTimer);
        resendBtn.addEventListener('click', resendOtp);

                resendBtn.classList.remove('less-visible');
                resendText.textContent = "You can resend now";
                resendText.style.color = "green";
                canResend = true;
            } else {
                resendText.textContent = `Wait for ${countdown} seconds to resend OTP`;
            }
        }, 1000);


    }

    function resendOtp() {
        if (canResend) {
            canResend = false;
            let email = document.getElementById('signUp-email').value;
            let password = document.getElementById('signUp-password').value;
            otp(email, password);
        }
    }

//----------------------------------OTP Generation------------------------

    function otpGeneration(email, password) {
        otpNumber = Math.floor(1000 + Math.random() * 9000);
        const params = {
            email: email,
            otp: otpNumber
        };
        const serviceId = "service_ywsa0ui";
        const templateId = "template_h6la9pj";
        emailjs.send(serviceId, templateId, params)
            .then((response) => {
                otpAlertText.textContent = "OTP sent successfully";
                otpAlertText.style.color = "green";
                console.log(response);
            })
            .catch((error) => {
                otpAlertText.textContent = "Failed to send OTP. Enter a valid email by refreshing the page";
                otpAlertText.style.color = "red";
            });
    }

    //------------------------OTP Verification--------------------------

    let verifyBtn = document.getElementById('verify');
    verifyBtn.addEventListener('click', () => {
        if (otpGenerateNumber.value === '') {
            otpAlertText.textContent = "Please enter all fields";
            otpAlertText.style.color = "red";
        } else if (otpGenerateNumber.value == otpNumber) {
            loginDiv.classList.remove('hide');
            loginDiv.classList.add('show');
            otpSection.classList.add('hide');
             // Store the user email and password in localStorage after successful OTP verification
             let email = document.getElementById('signUp-email').value;
             let password = document.getElementById('signUp-password').value;
             let users = JSON.parse(localStorage.getItem('users')) || [];
             users.push({ email, password });
             localStorage.setItem('users', JSON.stringify(users));
        } else {
            otpAlertText.textContent = "Please enter a valid OTP";
            otpAlertText.style.color = "red";
        }
    });

    // --------------------------------  Handle Login   ----------------------------------------------
    let loginAlertText = document.querySelector('.login-comment p');
    loginBtn.addEventListener('click', () => {
        let email = document.getElementById('login-email').value;
        let password = document.getElementById('login-password').value;

        if (email && password) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            let user = users.find(user => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem('currentUser', email);
                loginAlertText.textContent = 'Login successful!';
                loginAlertText.style.color = 'green';
                // Redirect or show user's specific content
                window.location.href = "../html/home.html";
            } else {
                loginAlertText.textContent = 'Invalid email or password.';
                loginAlertText.style.color = 'red';
            }
        } else {
            loginAlertText.textContent = 'Please fill both fields.';
            loginAlertText.style.color = 'red';
        }
    });
});
