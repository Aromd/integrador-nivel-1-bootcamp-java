window.addEventListener('load', () => {

    const isEnrollPage = window.location.href.includes('inscripciones');

    const contactForm = document.getElementById('contact-form');
    const contactInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');

    if(isEnrollPage){
        const registerForm = document.getElementById('register-form');
        const registerInputs = document.querySelectorAll('#register-form input, #register-form textarea');

        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            validateFormInputs(registerInputs, 'register');
        });
    }
    
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        validateFormInputs(contactInputs, 'contact');
    });
    
    function validateFormInputs(inputs, formType){
        
        inputs.forEach(input => {

            const inputName = input.name;
            const inputValue = input.value.trim();
            const isNameOrMessage = ['name', 'message'].includes(inputName);
            const isPhone = inputName == 'phone';
            const isEmail = inputName == 'email';
            const isMessage = inputName == 'message';
            const isMessageRegister = isMessage && formType == 'register';

            if(input.type === "radio"){
                if(input.checked) {
                    console.log("Elegiste el turno: ", input.value);
                }
               return;
            }

            if((!input.value || inputValue === '') && !isMessageRegister ){
                return setFeedback(input, 'required');
            }

            if(( isNameOrMessage && !isMessageRegister && inputValue.length < 2) || (isPhone && inputValue.length < 8)){
                return setFeedback(input, 'minLength');
            }

            if(isEmail && !isValidEmail(inputValue)){
                return setFeedback(input, 'format');
            }

            if(isMessage && !isMessageRegister && input.value.length > 200 ){
                return setFeedback(input, 'maxLength');
            }

            return setFeedback(input);
        });
    }

    function setFeedback(input, error = undefined){

        const inputName = input.name;
        const parent = input.parentElement;
        const errorPrevio = parent.querySelector('p');
        const errorFeedback = document.createElement('p');
        
        if(!error){
            parent.classList.remove('feedback-error');
            errorPrevio?.remove();
            return;
        }
         
        if(errorPrevio){
            parent.classList.remove('feedback-error');
            errorPrevio.remove();
        }
        
        errorFeedback.innerText = errorMessages[inputName][error];
        parent.appendChild(errorFeedback);
        parent.classList.add('feedback-error');
    }

    function isValidEmail(email){
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
          );
    }

});