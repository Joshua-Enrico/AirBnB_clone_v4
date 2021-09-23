$(document).ready(function () {
    let AmenitiesChecked = {};
    $(document).on('change', "input[type='checkbox']", function () {
        if (this.checked) {
            AmenitiesChecked[$(this).data('id')] = $(this).data('name');
        } else {
            delete AmenitiesChecked[$(this).data('id')];
        }
        let Firstobj = Object.values(AmenitiesChecked);
        if (Firstobj > 0) {
            $('div.amenities > h4').text(Object.values(AmenitiesChecked).join(','));
        } else {
            $('div.amenities >h4').html('&nbsp;');
        }
        console.log(AmenitiesChecked);
    });
});