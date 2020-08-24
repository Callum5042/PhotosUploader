(function () {

    let photoUploader;

    document.addEventListener("DOMContentLoaded", function () {

        console.log("Loaded");

        // Highjack submit button
        const form = document.getElementById("submit-ajax");
        if (form) {
            form.addEventListener("click", onClickSubmitAjax)
        }

        // Register file uploaders
        const uploader = document.querySelectorAll("[data-roveuploader]");
        for (let i = 0; i < uploader.length; ++i) {

            photoUploader = new PhotoUploader(uploader[i]);

            photoUploader.onSuccess = function () {

                console.log("Hi");
            }
        }
    });

    function onClickSubmitAjax(e) {

        photoUploader.send();
    }

})();