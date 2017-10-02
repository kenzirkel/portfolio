 $(document).ready(function() {
    $('body').on('click contextmenu', '*:not([data-px-cc])', function(e) {
    if (e.button > 1 && ($(e.target).css('background-image') || /url/.test($(e.target).css('background')))) {
      e.preventDefault();
      return false;
    } else {
      return true;
      }
    });
    $('body').on('click contextmenu', 'img[src*="pcdn"]:not([data-px-cc])', function(e) {
    if (e.button > 1) {
      e.preventDefault();
      return false;
    } else {
      return true;
      }
    });
    $('body').on('mousedown dragstart', 'img[src*="pcdn"]:not([data-px-cc])', function(e) {
      e.preventDefault();
      return false
    });
  });