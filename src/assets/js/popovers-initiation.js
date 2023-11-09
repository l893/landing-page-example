import 'core-js/actual';
import 'regenerator-runtime/runtime.js';

document.addEventListener('DOMContentLoaded', (event) => {
  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
});
