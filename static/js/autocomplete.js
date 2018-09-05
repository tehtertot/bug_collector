$(document).ready(function(){
    $.get('/autocomplete', function(data) {
        $('input.autocomplete').autocomplete({
            data: data,
            onAutocomplete: function() {
                $.get(`/filtered/${$("#autocomplete-input").val()}`, function(cards) {
                    $("#errors").html(cards);
                });
            }
        });
    })
});