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
        }
    });

    function onClickSubmitAjax(e) {

        console.log("Submit");
        photoUploader.send();
    }

    ////////////////////////
    //////// Photos ////////
    ////////////////////////

    //let _data_dictionary = {};

    //// Transform <input type=file /> into the photo uploader container
    //function initFile(input) {

    //    console.log("Init file");

    //    // Hide file
    //    input.setAttribute("hidden", "hidden");

    //    // Preview area
    //    const previewContainer = document.createElement("div");
    //    input.parentElement.appendChild(previewContainer);
    //    previewContainer.classList.add("photo-preview-container");
    //    previewContainer.addEventListener("click", function () {
    //        onClickAddPhoto(input, previewContainer);
    //    });

    //    // Add dynamic button upload
    //    const button = document.createElement("button");
    //    input.parentElement.appendChild(button);
    //    button.type = "button";
    //    button.innerText = "Add";
    //    button.classList.add("photo-add-button");

    //    // Button click logic
    //    button.addEventListener("click", function () {
    //        onClickAddPhoto(input, previewContainer);
    //    });
    //}

    //function onClickAddPhoto(input, previewContainer) {

    //    console.log("Photo uploaded");

    //    // Click logic
    //    const file = document.createElement("input");
    //    document.querySelector("body").appendChild(file);
    //    file.type = "file";
    //    file.setAttribute("multiple", "multiple");
    //    file.click();
    //    file.addEventListener("input", function () {

    //        // Add preview to container
    //        for (let i = 0; i < this.files.length; ++i) {

    //            const key = generateUUID();

    //            // Build preview
    //            const preview = buildPreview(this.files[i], previewContainer, undefined, key);

    //            // Add data
    //            _data_dictionary[key] = {

    //                File: this.files[i],
    //                isprimary: false
    //            };
    //        }
    //    });

    //    document.querySelector("body").removeChild(file);
    //}

    //function buildPreview(file, previewContainer, clone, key) {

    //    // Create preview
    //    const preview = document.createElement("div");
    //    preview.setAttribute("data-photoupload-key", key);
    //    preview.classList.add("photo-preview");

    //    preview.addEventListener("click", function (e) {
    //        e.stopPropagation();
    //    });

    //    // Header
    //    const header = buildHeader(file, previewContainer, clone, preview, key);

    //    // Create image
    //    const image = document.createElement("img");
    //    image.src = URL.createObjectURL(file);

    //    // Build
    //    preview.appendChild(header);
    //    preview.appendChild(image);
    //    previewContainer.appendChild(preview);

    //    return preview;
    //}

    //function buildHeader(file, previewContainer, clone, preview, key) {

    //    const header = document.createElement("div");
    //    header.classList.add("photo-preview-header");

    //    // Checkbox
    //    const checkboxGroup = document.createElement("div");
    //    checkboxGroup.classList.add("form-group");
    //    checkboxGroup.classList.add("form-check");
    //    checkboxGroup.classList.add("m-0");
    //    checkboxGroup.classList.add("ml-1");
    //    checkboxGroup.classList.add("d-inline");

    //    // Random guid to link label to checkbox
    //    const guid = generateUUID();

    //    const label = document.createElement("label");
    //    label.textContent = "Primary";
    //    label.classList.add("form-check-label");
    //    label.setAttribute("for", guid);

    //    const checkbox = document.createElement("input");
    //    checkbox.id = guid;
    //    checkbox.type = "checkbox";
    //    checkbox.classList.add("form-check-input");
    //    checkbox.addEventListener("change", function () {

    //        if (this.checked) {
    //            _data_dictionary[key].isprimary = true;
    //        }
    //        else {
    //            _data_dictionary[key].isprimary = false;
    //        }
    //    });

    //    checkboxGroup.appendChild(checkbox);
    //    checkboxGroup.appendChild(label);
    //    header.appendChild(checkboxGroup);

    //    // Bin icon
    //    const bin = document.createElement("i");
    //    header.appendChild(bin);
    //    bin.classList.add("fas");
    //    bin.classList.add("fa-trash");
    //    bin.classList.add("float-right");
    //    bin.classList.add("m-1");
    //    bin.addEventListener("click", function () {

    //        delete _data_dictionary[key];
    //        previewContainer.removeChild(preview);
    //    });

    //    return header;
    //}

    ////////////////////////
    ////// Old Photos //////
    ////////////////////////
    //function initFile(input) {

    //    console.log("Init file");

    //    // Hide file
    //    input.setAttribute("hidden", "hidden");

    //    // Preview area
    //    const previewContainer = document.createElement("div");
    //    input.parentElement.appendChild(previewContainer);
    //    previewContainer.classList.add("photo-preview-container");
    //    previewContainer.addEventListener("click", function () {
    //        onClickAddPhoto(input, previewContainer);
    //    });

    //    // Add dynamic button upload
    //    const button = document.createElement("button");
    //    input.parentElement.appendChild(button);
    //    button.type = "button";
    //    button.innerText = "Add";
    //    button.classList.add("photo-add-button");

    //    // Button click logic
    //    button.addEventListener("click", function () {
    //        onClickAddPhoto(input, previewContainer);
    //    });
    //}

    //function onClickAddPhoto(input, previewContainer) {

    //    console.log("Photo uploaded");

    //    // Click logic
    //    const fileinput = document.createElement("input");
    //    document.querySelector("body").appendChild(fileinput);
    //    fileinput.type = "file";
    //    fileinput.setAttribute("multiple", "multiple");
    //    fileinput.setAttribute("hidden", "hidden");
    //    fileinput.click();
    //    fileinput.addEventListener("input", function () {

    //        // Add preview to container
    //        for (let i = 0; i < this.files.length; ++i) {

    //            // Enable for clone
    //            const inputInputs = input.querySelectorAll("input");
    //            for (let i = 0; i < inputInputs.length; ++i) {
    //                inputInputs[i].removeAttribute("disabled");
    //            }

    //            // Reclone data, set multiple files to 1 file each
    //            const clone = input.cloneNode(true);
    //            clone.setAttribute("hidden", "hidden");
    //            const clone_fileinput = clone.querySelector("input[type='file']");

    //            // Not supported by IE or safari
    //            const list = new DataTransfer();
    //            list.items.add(this.files[i]);
    //            clone_fileinput.files = list.files;

    //            const preview = buildPreview(this.files[i], previewContainer, clone);

    //            // Add input values
    //            preview.appendChild(clone);

    //            // Update model binding array
    //            updateFilesArray(previewContainer);

    //            // Disable to avoid posting the templates to the server
    //            for (let i = 0; i < inputInputs.length; ++i) {
    //                inputInputs[i].setAttribute("disabled", "disabled");
    //            }
    //        }
    //    });
    //}

    //function buildHeader(file, previewContainer, clone, preview) {

    //    const header = document.createElement("div");
    //    header.classList.add("photo-preview-header");

    //    // Checkbox
    //    const checkboxGroup = document.createElement("div");
    //    checkboxGroup.classList.add("form-group");
    //    checkboxGroup.classList.add("form-check");
    //    checkboxGroup.classList.add("m-0");
    //    checkboxGroup.classList.add("ml-1");
    //    checkboxGroup.classList.add("d-inline");

    //    // Random guid to link label to checkbox
    //    const guid = generateUUID();

    //    const label = document.createElement("label");
    //    label.textContent = "Primary";
    //    label.classList.add("form-check-label");
    //    label.setAttribute("for", guid);

    //    const checkbox = document.createElement("input");
    //    checkbox.id = guid;
    //    checkbox.type = "checkbox";
    //    checkbox.classList.add("form-check-input");
    //    checkbox.addEventListener("change", function () {

    //        console.log("Change");
    //        const isprimary = clone.querySelector("input[data-photoupload-isprimary]");
    //        isprimary.checked = this.checked;
    //        if (isprimary.checked) {
    //            isprimary.value = true;
    //        }
    //        else {
    //            isprimary.value = false;
    //        }
    //    });

    //    checkboxGroup.appendChild(checkbox);
    //    checkboxGroup.appendChild(label);
    //    header.appendChild(checkboxGroup);

    //    // Bin icon
    //    const bin = document.createElement("i");
    //    header.appendChild(bin);
    //    bin.classList.add("fas");
    //    bin.classList.add("fa-trash");
    //    bin.classList.add("float-right");
    //    bin.classList.add("m-1");
    //    bin.addEventListener("click", function () {

    //        previewContainer.removeChild(preview);
    //        updateFilesArray(previewContainer);
    //    });

    //    return header;
    //}

    //function buildPreview(file, previewContainer, clone) {

    //    // Create preview
    //    const preview = document.createElement("div");
    //    preview.classList.add("photo-preview");

    //    preview.addEventListener("click", function (e) {
    //        e.stopPropagation();
    //    });

    //    // Header
    //    const header = buildHeader(file, previewContainer, clone, preview);

    //    // Create image
    //    const image = document.createElement("img");
    //    image.src = URL.createObjectURL(file);

    //    // Build
    //    preview.appendChild(header);
    //    preview.appendChild(image);
    //    previewContainer.appendChild(preview);

    //    return preview;
    //}

    //// To ensure the model binding works correctly, must be contiguous from 0..x
    //function updateFilesArray(previewContainer) {

    //    const expr = /^(\w+\[)(\d+)(\]\.\w+)$/g;
    //    const previews = previewContainer.querySelectorAll(".photo-preview");
    //    for (let i = 0; i < previews.length; ++i) {

    //        const inputs = previews[i].querySelectorAll("input");
    //        for (let j = 0; j < inputs.length; ++j) {

    //            inputs[j].name = inputs[j].name.replace(expr, "$1" + i + "$3");
    //        }
    //    }
    //}

    // Public Domain/MIT
    //function generateUUID() {
    //    var d = new Date().getTime();//Timestamp
    //    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    //    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    //        var r = Math.random() * 16;//random number between 0 and 16
    //        if (d > 0) {//Use timestamp until depleted
    //            r = (d + r) % 16 | 0;
    //            d = Math.floor(d / 16);
    //        } else {//Use microseconds since page-load if supported
    //            r = (d2 + r) % 16 | 0;
    //            d2 = Math.floor(d2 / 16);
    //        }
    //        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    //    });
    //}

})();