interface Settings {
    message?: string;
    showBrowseButton?: boolean;
    browseButtonText?: string;
    browseButtonClass?: string;
}

class PhotoUploader {

    settings: Settings;
    _data_dictionary = {}
    previewContainer: HTMLElement

    constructor(input, settings?: Settings) {

        this.settings = settings || {
            showBrowseButton: true,
            browseButtonText: "Browse",
            browseButtonClass: "btn btn-primary mt-3"
        };

        this.initFile(input);
    }

    onSuccess() { }
    OnFailure() { }
    OnError() { }

    async send() {

        console.log(this.settings.message);

        for (const key in this._data_dictionary) {

            const preview = this.previewContainer.querySelector(".photo-preview[data-photoupload-key='" + key + "']");

            // Add overlay
            let overlay = preview.querySelector(".photo-preview-overlay");
            if (overlay) {
                preview.removeChild(overlay);
            }

            overlay = document.createElement("div");
            preview.appendChild(overlay);
            overlay.classList.add("photo-preview-overlay");

            // Add Icon
            const msg = document.createElement("span");
            overlay.appendChild(msg);
            msg.className = "fas fa-spinner fa-spin fa-5x photo-preview-spinner";

            // Build data
            const formData = new FormData();
            const data = this._data_dictionary[key];
            formData.append("Photo.Key", key);
            formData.append("Photo.File", data.File);
            formData.append("Photo.IsPrimary", "true");

            // Submit
            const url = "/Photos/Create";

            const response = await fetch(url, {
                method: "POST",
                body: formData
            });

            if (response.ok) {

                const responseData = await response.json();
                if (responseData) {

                    // Remove data from key
                    delete this._data_dictionary[key];

                    // Success icon
                    msg.className = "far fa-check-circle fa-5x text-success";

                    // Call success
                    this.onSuccess();
                }
                else {

                    // Error icon
                    msg.className = "fas fa-exclamation-circle fa-5x text-danger";

                    // Callback failure
                    this.OnFailure();
                }
            }
            else {

                // Error icon
                msg.className = "fas fa-exclamation-circle fa-5x text-danger";

                // Callback failure
                this.OnError();
            }
        }
    }

    // Transform <input type=file /> into the photo uploader container
    initFile(input) {

        console.log(this.settings.message);
        console.log("Init file");

        // Hide file
        input.setAttribute("hidden", "hidden");

        // Preview area
        this.previewContainer = document.createElement("div");
        input.parentElement.appendChild(this.previewContainer);
        this.previewContainer.classList.add("photo-preview-container");
        this.previewContainer.addEventListener("click", () => {
            this.onClickAddPhoto(input, this.previewContainer);
        });

        // Add dynamic button upload
        if (this.settings.showBrowseButton) {
            const button = document.createElement("button");
            input.parentElement.appendChild(button);
            button.type = "button";
            button.innerText = this.settings.browseButtonText;
            button.className = this.settings.browseButtonClass;

            // Button click logic
            button.addEventListener("click", () => {
                this.onClickAddPhoto(input, this.previewContainer);
            });
        }
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
                this.buildPreview(target.files[i], this.previewContainer, undefined, key);

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
        const header = this.buildHeader(file, this.previewContainer, clone, preview, key);

        // Create image
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);

        // Build
        preview.appendChild(header);
        preview.appendChild(image);
        this.previewContainer.appendChild(preview);

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
            this.previewContainer.removeChild(preview);
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