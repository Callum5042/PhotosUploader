(function () {

    document.addEventListener("DOMContentLoaded", function () {

        console.log("Loaded");

        // Register file uploaders
        const uploader = document.querySelectorAll("[data-roveuploader]");
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

        // Enable for cloning
        const inputInputs = input.querySelectorAll("input");
        for (let i = 0; i < inputInputs.length; ++i) {
            inputInputs[i].removeAttribute("disabled");
        }

        // Clone file
        const clone = input.cloneNode(true);
        clone.setAttribute("hidden", "hidden");

        // Disable to avoid posting the templates to the server
        for (let i = 0; i < inputInputs.length; ++i) {
            inputInputs[i].setAttribute("disabled", "disabled");
        }

        // Size
        const sizeinput = clone.querySelector("input[data-photoupload-size]");
        sizeinput.value = "123215";

        // Clone logic
        const fileinput = clone.querySelector("input[type='file']");
        fileinput.click();
        fileinput.addEventListener("change", function () {

            // Add preview to container
            for (let i = 0; i < this.files.length; ++i) {

                const preview = buildPreview(this.files[i], previewContainer, this);

                // Add input values
                preview.appendChild(clone);

                // Update model binding array
                updateFilesArray(previewContainer);
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

        return preview;
    }

    // To ensure the model binding works correctly, must be contiguous from 0..x
    function updateFilesArray(previewContainer) {

        const expr = /^(\w+\[)(\d+)(\]\.\w+)$/g;
        const previews = previewContainer.querySelectorAll(".photo-preview");
        for (let i = 0; i < previews.length; ++i) {

            const inputs = previews[i].querySelectorAll("input");
            for (let j = 0; j < inputs.length; ++j) {

                inputs[j].name = inputs[j].name.replace(expr, "$1" + i + "$3");
            }
        }
    }

})();