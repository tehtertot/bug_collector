$(document).ready(function(){

    // materialize autocomplete
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

    $("#clear-filter").click(function() {
        $.get("filtered/all", function(cards) {
            $('#autocomplete-input').val("");
            $("#errors").html(cards);
        })
    })
});
