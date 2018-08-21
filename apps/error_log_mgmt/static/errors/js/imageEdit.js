var fileToUpdate;

function prepareCanvas(file) {
    fileToUpdate = file;
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    // var mainCanvas = document.createElement("canvas");
    var mainCanvas = document.getElementById("image-canvas");
    // mainCanvas.clearRect(0, 0, maxWidth, maxHeight);
    mainCanvas.setAttribute("width", maxWidth);
    mainCanvas.setAttribute("height", maxHeight);
        // mainCanvas.setAttribute("id", "image-canvas");
        // $("#canvas-test").append(mainCanvas);
    var backgroundCanvas = document.createElement("canvas");
    backgroundCanvas.setAttribute("width", maxWidth);
    backgroundCanvas.setAttribute("height", maxHeight);
    backgroundCanvas.setAttribute("id", "background-canvas");
    var mainContext = mainCanvas.getContext("2d");
    var backContext = backgroundCanvas.getContext("2d");

    // load background image
    var background = new Image();
    background.onload = function() {
        let height, width;
        if(background.height > maxHeight) {
            width = background.width * maxHeight / background.height;
            height = maxHeight;
        }
        else if(background.width > maxWidth) {
            height = background.height * maxWidth / background.width;
            width = maxWidth;
        }
        console.log(background)
        
        backContext.drawImage(background, 0, 0, width, height);
        // background = canvas.toDataURL("image/png");
    }
    background.src = file;
    // backContext.drawImage(mainCanvas, 0, 0);
    // mainContext.clearRect(0, 0, maxWidth, maxHeight);
    mainContext.drawImage(background, 0, 0);
    // mainContext.drawImage(backContext, 0, 0);

    $('#image-canvas').mousedown(function(e){
        // var mouseX = e.pageX - ((window.innerWidth-e.pageX)/2);
        // var mouseY = e.pageY - ((window.outerHeight-e.pageY)/2);
        
        paint = true;
        addClick(e.pageX, e.pageY);
        redraw();
    });
    
    $('#image-canvas').mousemove(function(e){
        console.log("mousemove")
        if(paint){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });
    
    $('#image-canvas').mouseup(function(e){
        console.log("mouseup")
        paint = false;
    });
    
    $('#image-canvas').mouseleave(function(e){
        console.log("mouseleave")
        paint = false;
    });
    
    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;
    
    function addClick(x, y, dragging)
    {
        console.log("adding click")
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }
    
    function redraw(){
        console.log("redrawing")
        // mainContext.clearRect(0, 0, mainContext.canvas.width, mainContext.canvas.height); // Clears the canvas
    
        mainContext.strokeStyle = "#df4b26";
        mainContext.lineJoin = "round";
        mainContext.lineWidth = 5;
                    
        for(var i=0; i < clickX.length; i++) {		
            mainContext.beginPath();
            if (clickDrag[i] && i) {
               mainContext.moveTo(clickX[i-1], clickY[i-1]);
            } else {
                mainContext.moveTo(clickX[i]-1, clickY[i]);
            }
            mainContext.lineTo(clickX[i], clickY[i]);
            mainContext.closePath();
            mainContext.stroke();
        }
    }

}

// displayImage = function(file) {
//     var maxWidth = window.innerWidth;
//     var maxHeight = window.innerHeight;
//     console.log(maxWidth, maxHeight);
//     var image = new Image();
//     image.onload = function(){
//         var canvas = document.createElement("canvas");
//         // if(image.height > size) {
//         //     image.width *= size / image.height;
//         //     image.height = size;
//         // }
        
//         // if(image.width > size) {
//         //     image.height *= size / image.width;
//         //     image.width = size;
//         // }
//         var context = canvas.getContext("2d");
//         context.clearRect(0, 0, canvas.width, canvas.height);
//         canvas.width = image.width;
//         canvas.height = image.height;
//         context.drawImage(image, 0, 0, image.width, image.height);
//         img = canvas.toDataURL("image/png");
//         $('#image-to-edit').attr('src', img);
//         $('#edit_image_modal').width(image.width);
//         $('#edit_image_modal').height(image.height);
//         $('#edit_image_modal').show();

//         $('#image-canvas').mousedown(function(e){
//             var mouseX = e.pageX - this.offsetLeft;
//             var mouseY = e.pageY - this.offsetTop;
                  
//             paint = true;
//             addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
//             redraw();
//           });
        
//         $('#image-canvas').mousemove(function(e){
//             if(paint){
//                 addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
//                 redraw();
//             }
//         });
        
//         $('#image-canvas').mouseup(function(e){
//             paint = false;
//         });
        
//         $('#image-canvas').mouseleave(function(e){
//             paint = false;
//         });
        
//         var clickX = new Array();
//         var clickY = new Array();
//         var clickDrag = new Array();
//         var paint;
        
//         function addClick(x, y, dragging)
//         {
//           clickX.push(x);
//           clickY.push(y);
//           clickDrag.push(dragging);
//         }
        
//         function redraw(){
//             context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        
//             context.strokeStyle = "#df4b26";
//             context.lineJoin = "round";
//             context.lineWidth = 5;
                        
//             for(var i=0; i < clickX.length; i++) {		
//                 context.beginPath();
//                 if (clickDrag[i] && i) {
//                    context.moveTo(clickX[i-1], clickY[i-1]);
//                 } else {
//                     context.moveTo(clickX[i]-1, clickY[i]);
//                 }
//                 context.lineTo(clickX[i], clickY[i]);
//                 context.closePath();
//                 context.stroke();
//             }
//         }


//     };
//     image.src = file;
// };

$("#updateImageForm").submit(function(e) {
    e.preventDefault();
    saveImage();
})
function saveImage() {
    // turn image into blob file
    var imgURL = document.getElementById("image-canvas").toDataURL();
    var blobBin = atob(imgURL.split(',')[1]);
    var blogArr = [];
    for(var i = 0; i < blobBin.length; i++) {
        blogArr.push(blobBin.charCodeAt(i));
    }
    var file=new Blob([new Uint8Array(blogArr)], {type: 'image/png'});

    // set up form data
    var ajaxData = new FormData($("#updateImageForm").get(0));
    ajaxData.append("imgFilename", fileToUpdate);
    ajaxData.append("uploadedImage", file)

    // send ajax
    $.ajax({
        url: "/updatephoto",
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
            console.log("There was an error uploading your file")
        }
    });
}

// var canvasDiv = document.getElementById('canvasDiv');
// canvas = document.createElement('canvas');
// canvas.setAttribute('width', canvasWidth);
// canvas.setAttribute('height', canvasHeight);
// canvas.setAttribute('id', 'canvas');
// canvasDiv.appendChild(canvas);
// if(typeof G_vmlCanvasManager != 'undefined') {
// 	canvas = G_vmlCanvasManager.initElement(canvas);
// }
// context = canvas.getContext("2d");