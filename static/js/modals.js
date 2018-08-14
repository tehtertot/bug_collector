document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    let _defaults = {
        opacity: 0.5,
        inDuration: 250,
        outDuration: 250,
        onOpenStart: null,
        onOpenEnd: null,
        onCloseStart: null,
        onCloseEnd: null,
        preventScrolling: true,
        dismissible: true,
        startingTop: '0%',
        endingTop: '7%'
      };
    var instances = M.Modal.init(elems, _defaults);
});

$(document).ready(function(){
    $('.modal').modal();
});