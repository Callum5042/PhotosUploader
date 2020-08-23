(function () {

    document.addEventListener("DOMContentLoaded", function () {

        console.log("Loaded");

        // Register file uploaders
        const uploader = document.querySelectorAll("input[data-roveuploader]");
        for (let i = 0; i < uploader.length; ++i) {
            initFile(uploader[i]);
        }
    });

    function initFile(input) {

        console.log("Init file");

        // Hide file
        input.setAttribute("hidden", "hidden");

        // Preview area
        const previewContainer = document.createElement("div");
        input.parentElement.appendChild(previewContainer);
        previewContainer.classList.add("photo-preview-container");
        previewContainer.addEventListener("click", function () {
            onClickAddPhoto(input, previewContainer);
        });

        // Add dynamic button upload
        const button = document.createElement("button");
        input.parentElement.appendChild(button);
        button.type = "button";
        button.innerText = "Add";
        button.classList.add("photo-add-button");

        // Button click logic
        button.addEventListener("click", function () {
            onClickAddPhoto(input, previewContainer);
        });
    }

    function onClickAddPhoto(input, previewContainer) {

        console.log("Photo uploaded");

        // Clone file
        const clone = input.cloneNode(false);
        clone.setAttribute("hidden", "hidden");
        input.parentElement.appendChild(clone);

        // Clone logic
        clone.click();
        clone.addEventListener("change", function () {

            // Add preview to container
            for (let i = 0; i < this.files.length; ++i) {

                buildPreview(this.files[i], previewContainer);
            }
        });
    }

    function buildPreview(file, previewContainer) {

        // Create preview
        const preview = document.createElement("div");
        preview.classList.add("photo-preview");

        // Create image
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);

        // Build
        preview.appendChild(image);
        previewContainer.appendChild(preview);
    }

})();