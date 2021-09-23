$(document).ready(function () {
  const AmenitiesChecked = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      AmenitiesChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete AmenitiesChecked[$(this).data('id')];
    }
    const Firstobj = Object.values(AmenitiesChecked);
    if (Firstobj > 0) {
      $('div.amenities > h4').text(Object.values(AmenitiesChecked).join(','));
    } else {
      $('div.amenities >h4').html('&nbsp;');
    }
    console.log(AmenitiesChecked);
  });

  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.getJSON(url, (data) => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    data: JSON.stringify({}),
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    success: data => {
      for (const place of data) {
        const template = `<article>
      <div class="title">
        <h2>${place.name}</h2>
        <div class="price_by_night">
    $${place.price_by_night}
          </div>
        </div>
        <div class="information">
          <div class="max_guest">
    <i class="fa fa-users fa-3x" aria-hidden="true"></i>
    <br />
    ${place.max_guest} Guests
        </div>
          <div class="number_rooms">
    <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
    <br />
    ${place.number_rooms} Bedrooms
        </div>
        <div class="number_bathrooms">
    <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
    <br />
    ${place.number_bathrooms} Bathroom
        </div>
      </div>
    <!-- USER -->
      <div class="description">
        ${place.description}
      </div>
    </article> <!-- End 1 PLACE Article -->`;
        $('section.places').append(template);
      }
    }
  });
});
