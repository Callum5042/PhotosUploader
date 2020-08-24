class PhotoUploader {

    _data_dictionary = {}

    constructor(input) {

        this.initFile(input);
    }

    send() {

        // Build data
        const formData = new FormData();
        let i = 0;
        for (const key in this._data_dictionary) {

            if (this._data_dictionary.hasOwnProperty(key)) {

                const data = this._data_dictionary[key];
                formData.append("Photos[" + i + "].Key", key);
                formData.append("Photos[" + i + "].File", data.File);
                formData.append("Photos[" + i + "].IsPrimary", "true");

                i++;
            }
        }

        // Submit
        const url = "/Photos/Create";

        const xhttp = new XMLHttpRequest();
        xhttp.addEventListener("load", function () {


        });

        xhttp.open("POST", url, true);
        xhttp.send(formData);
    }

    // Transform <input type=file /> into the photo uploader container
    initFile(input) {

        console.log("Init file");

        // Hide file
        input.setAttribute("hidden", "hidden");

        // Preview area
        const previewContainer = document.createElement("div");
        input.parentElement.appendChild(previewContainer);
        previewContainer.classList.add("photo-preview-container");
        previewContainer.addEventListener("click", () => {
            this.onClickAddPhoto(input, previewContainer);
        });

        // Add dynamic button upload
        const button = document.createElement("button");
        input.parentElement.appendChild(button);
        button.type = "button";
        button.innerText = "Add";
        button.classList.add("photo-add-button");

        // Button click logic
        button.addEventListener("click", () => {
            this.onClickAddPhoto(input, previewContainer);
        });
    }

    onClickAddPhoto(input, previewContainer) {

        console.log("Photo uploaded");

        // Click logic
        const file = document.createElement("input");
        document.querySelector("body").appendChild(file);
        file.type = "file";
        file.setAttribute("multiple", "multiple");
        file.click();
        file.addEventListener("input", (e) => {

            const target = e.target as HTMLInputElement;

            // Add preview to container
            for (let i = 0; i < target.files.length; ++i) {

                const key = this.generateUUID();

                // Build preview
                const preview = this.buildPreview(target.files[i], previewContainer, undefined, key);

                // Add data
                this._data_dictionary[key] = {

                    File: target.files[i],
                    isprimary: false
                };
            }
        });

        document.querySelector("body").removeChild(file);
    }

    buildPreview(file, previewContainer, clone, key) {

        // Create preview
        const preview = document.createElement("div");
        preview.setAttribute("data-photoupload-key", key);
        preview.classList.add("photo-preview");

        preview.addEventListener("click", function (e) {
            e.stopPropagation();
        });

        // Header
        const header = this.buildHeader(file, previewContainer, clone, preview, key);

        // Create image
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);

        // Build
        preview.appendChild(header);
        preview.appendChild(image);
        previewContainer.appendChild(preview);

        return preview;
    }

    buildHeader(file, previewContainer, clone, preview, key) {

        const header = document.createElement("div");
        header.classList.add("photo-preview-header");

        // Checkbox
        const checkboxGroup = document.createElement("div");
        checkboxGroup.classList.add("form-group");
        checkboxGroup.classList.add("form-check");
        checkboxGroup.classList.add("m-0");
        checkboxGroup.classList.add("ml-1");
        checkboxGroup.classList.add("d-inline");

        // Random guid to link label to checkbox
        const guid = this.generateUUID();

        const label = document.createElement("label");
        label.textContent = "Primary";
        label.classList.add("form-check-label");
        label.setAttribute("for", guid);

        const checkbox = document.createElement("input");
        checkbox.id = guid;
        checkbox.type = "checkbox";
        checkbox.classList.add("form-check-input");
        checkbox.addEventListener("change", (e) => {

            const target = e.target as HTMLInputElement;
            if (target.checked) {
                this._data_dictionary[key].isprimary = true;
            }
            else {
                this._data_dictionary[key].isprimary = false;
            }
        });

        checkboxGroup.appendChild(checkbox);
        checkboxGroup.appendChild(label);
        header.appendChild(checkboxGroup);

        // Bin icon
        const bin = document.createElement("i");
        header.appendChild(bin);
        bin.classList.add("fas");
        bin.classList.add("fa-trash");
        bin.classList.add("float-right");
        bin.classList.add("m-1");
        bin.addEventListener("click", () => {

            delete this._data_dictionary[key];
            previewContainer.removeChild(preview);
        });

        return header;
    }

    generateUUID() {
        let d = new Date().getTime();//Timestamp
        let d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16;//random number between 0 and 16
            if (d > 0) {//Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}