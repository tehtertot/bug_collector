let uploadedImages = {};
let maxHeight = 300;
// allow for drag and drop
jQuery.event.addProp('dataTransfer');

// handle drag and drop
$(function(){
    var dropTimer;
    var dropTarget = $('.dragArea');
    var fileInput = $('#imageFile');
    dropTarget.on("dragover", function(event) {
        clearTimeout(dropTimer);
        if (event.currentTarget == dropTarget[0]) {
            dropTarget.addClass('over');
        }
        return false; // Required for drop to work
    });
    dropTarget.on('dragleave', function(event) {
        if (event.currentTarget == dropTarget[0]) {
            dropTimer = setTimeout(function() {
                dropTarget.removeClass('over');
            }, 200);
        }
    });
    handleDrop = function(files){
        dropTarget.removeClass('over');
        for (var file in files) {
            if (files[file].type.match('image.*')) {
                addImage(files[file]);
                resizeImage(files[file], maxHeight, showImage);
            } else {
                alert("Image files only");
            }
        }
    };
    dropTarget.on('drop', function(event) {
        event.preventDefault(); // Or else the browser will open the file
        handleDrop(event.dataTransfer.files);
    });
    fileInput.on('change', function(event) {
        handleDrop(event.target.files);
    });
    resizeImage = function(file, size, callback) {
        var fileTracker = new FileReader;
        fileTracker.onload = function() {
            var image = new Image();
            image.onload = function(){
                var canvas = document.createElement("canvas");
                
                if(image.height > size) {
                    image.width *= size / image.height;
                    image.height = size;
                }
                
                // if(image.width > size) {
                //     image.height *= size / image.width;
                //     image.width = size;
                // }
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0, image.width, image.height);
                callback(canvas.toDataURL("image/png"));
            };
            image.src = this.result;
        }
        fileTracker.readAsDataURL(file);
        fileTracker.onabort = function() {
            alert("The upload was aborted.");
        }
        fileTracker.onerror = function() {
            alert("An error occured while reading the file.");
        }
    };
    addImage = function(file) {
        // figure out how to prevent duplicates
        uploadedImages[file.name] = file;
        $("#fileList").append(`<p class="item" id="${file.name}">${file.name} <a onclick="deleteImg('${file.name}')"><i class="material-icons delete">delete_outline</a></p>`);
    }
});

// send form
$("#add_error_form").submit(function(e) {
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


function showImage(img) {
    $('#resultImage').attr('src', img);
    $('.resultImageWrapper').show();
}

function displayError(msg) {
    $("#error-text").text(msg);
}

function deleteImg(filename) {
    console.log(filename);
    delete uploadedImages[filename];
    console.log(uploadedImages)
    redisplayAll();
}

function redisplayAll() {
    $("#fileList").html("");
    for (let file in uploadedImages) {
        $("#fileList").append(`<p class="item" id="${file}">${file} <a onclick="deleteImg('${file}')"><i class="material-icons delete">delete_outline</a></p>`);
    }
}

$(document).on("mouseover", ".item", function() {
    resizeImage(uploadedImages[$(this).attr("id")], maxHeight, showImage)
});