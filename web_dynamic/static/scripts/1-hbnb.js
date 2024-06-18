$(document).ready(() => {
  const amenityObj = {};

  $('.amenities .popover input').change(function () {
    const name = $(this).attr('data-name');
    const id = $(this).attr('data-id');

    if (this.checked) {
      amenityObj[name] = id;
    } else {
      delete amenityObj[name];
    }

    const names = Object.keys(amenityObj).sort();
    $('.amenities h4').text(names.join(', '));
  });
});

