$(document).ready(() => {
  const amenityObj = {};
  const HOST = '0.0.0.0';
  const API_URL = `http://${HOST}:5001/api/v1/status/`;
  const PLACES_URL = `http://${HOST}:5001/api/v1/places_search/`;

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

  function apiStatus() {
    $.get(API_URL, (data, textStatus) => {
      if (textStatus === 'success' && data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }

  function fetchPlaces() {
    $.ajax({
      url: PLACES_URL,
      type: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({}),
      success: function (response) {
        response.forEach(place => {
          const article = `
            <article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>`;
          $('section.places').append(article);
        });
      },
      error: function (error) {
        console.error('Error fetching places:', error);
      }
    });
  }

  apiStatus();
  fetchPlaces();
});

