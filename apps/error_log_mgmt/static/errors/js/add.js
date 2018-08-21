// send form
$("#add-error-form").submit(function(e) {
    e.preventDefault();

    // check for any files
    if (Object.keys(uploadedImages).length == 0) {
        displayError("Please upload at least 1 image");
        return;
    }

    // set form data
    var ajaxData = new FormData($(this).get(0));
    for (let name in uploadedImages) {
        ajaxData.append("uploadedImages", uploadedImages[name])
    }

    // send AJAX POST request
    $.ajax({
        url: "/create",
        type: "POST",
        data: ajaxData,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        complete: function() {
        //   $form.removeClass('is-uploading');
        },
        success: function(data) {
            window.location = '/';
        },
        error: function() {
            displayError("There was an error uploading your file")
        }
    });
})

// display image preview
function showImage(img) {
    $('#resultImage').attr('src', img);
    $('.resultImageWrapper').show();
}

// display error message
function displayError(msg) {
    $("#error-text").text(msg);
}

// remove image from upload list
function deleteImg(filename) {
    console.log(filename);
    delete uploadedImages[filename];
    console.log(uploadedImages)
    redisplayAll();
}
    // display list of currently uploaded files
    function redisplayAll() {
        $("#fileList").html("");
        for (let file in uploadedImages) {
            $("#fileList").append(`<p class="item" id="${file}">${file} <a onclick="deleteImg('${file}')"><i class="material-icons delete">delete_outline</a></p>`);
        }
    }