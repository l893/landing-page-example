import 'core-js/actual';
import 'regenerator-runtime/runtime.js';

document.addEventListener('DOMContentLoaded', (event) => {
  const form = document.getElementById('contact-form');
  form.addEventListener('click', noSpamBotContact);
  form.addEventListener('submit', formSendContact);

  async function formSendContact(e) {
    e.preventDefault();

    let error = formValidateContact(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('_sending');
      let response = await fetch('contact.php', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        let result = await response.json();

        hideModalForm();

        let serverMessage = document.querySelector('#modal0 .p-modal');
        serverMessage.innerText = result.message;
        let modalServerMessage = new bootstrap.Modal(
          document.getElementById('modal0')
        );
        modalServerMessage.show();

        form.reset();
        form.classList.remove('_sending');

        form.classList.remove('was-validated');
      } else {
        hideModalForm();

        let modalError = new bootstrap.Modal(document.getElementById('modal1'));
        modalError.show();
        form.classList.remove('_sending');
      }
    } else {
      hideModalForm();

      let modalClarification = new bootstrap.Modal(
        document.getElementById('modal2')
      );
      modalClarification.show();
    }
  }

  function hideModalForm() {
    let talk = document.querySelector('#talkModal');
    let talkModal = bootstrap.Modal.getInstance(talk);
    talkModal.hide();
  }

  function formValidateContact(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.value === '') {
        formAddError(input);
        error++;
      } else if (input.classList.contains('_email') && input.value !== '') {
        if (emailTest(input) <= 0) {
          formAddError(input);
          error++;
        } else if (emailTest(input) > 0) {
          formRemoveError(input);
        }
      } else if (
        input.getAttribute('type') === 'checkbox' &&
        input.checked === false
      ) {
        formAddError(input);
        error++;
      }
    }

    return error;
  }

  //spam protection
  function noSpamBotContact() {
    // Get hidden input
    let codeQuestion = document.querySelector('#code_contact');

    // Click on the submit button
    document.querySelector('#submit-button2').onclick = function () {
      codeQuestion.value = 'NOSPAM'; // We substitute the value in the 'value' of the input
    };
  }

  function formAddError(input) {
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.classList.remove('_error');
  }

  function emailTest(input) {
    let email = document.getElementById('contact_email').value;

    return email.indexOf('@');
  }
  //https://www.endyourif.com/validate-an-email-address-in-javascript/
});
