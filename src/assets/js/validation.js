import 'core-js/actual';
import 'regenerator-runtime/runtime.js';

document.addEventListener('DOMContentLoaded', (event) => {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  let forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (thisForm) {
    thisForm.addEventListener(
      'submit',
      function (event) {
        if (!thisForm.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        thisForm.classList.add('was-validated');
      },
      false
    );
  });
});
