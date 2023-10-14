function previewImage(event) {
    var input = event.target;
    var image = document.querySelector("#preview");
    var textBox = document.querySelector("#fileText");

    if(input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            image.src = e.target.result;
        }

        textBox.value = input.files[0].name;

        reader.readAsDataURL(input.files[0]);
    }
}

window.onload() = function() {
    document.querySelector("#fileText").value = "";
}