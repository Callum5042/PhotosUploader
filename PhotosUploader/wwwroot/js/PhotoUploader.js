var PhotoUploader = /** @class */ (function () {
    function PhotoUploader(input) {
        this._data_dictionary = {};
        this.initFile(input);
    }
    PhotoUploader.prototype.send = function () {
        // Build data
        var formData = new FormData();
        var i = 0;
        for (var key in this._data_dictionary) {
            if (this._data_dictionary.hasOwnProperty(key)) {
                var data = this._data_dictionary[key];
                formData.append("Photos[" + i + "].Key", key);
                formData.append("Photos[" + i + "].File", data.File);
                formData.append("Photos[" + i + "].IsPrimary", "true");
                i++;
            }
        }
        // Submit
        var url = "/Photos/Create";
        var xhttp = new XMLHttpRequest();
        xhttp.addEventListener("load", function () {
        });
        xhttp.open("POST", url, true);
        xhttp.send(formData);
    };
    // Transform <input type=file /> into the photo uploader container
    PhotoUploader.prototype.initFile = function (input) {
        var _this = this;
        console.log("Init file");
        // Hide file
        input.setAttribute("hidden", "hidden");
        // Preview area
        var previewContainer = document.createElement("div");
        input.parentElement.appendChild(previewContainer);
        previewContainer.classList.add("photo-preview-container");
        previewContainer.addEventListener("click", function () {
            _this.onClickAddPhoto(input, previewContainer);
        });
        // Add dynamic button upload
        var button = document.createElement("button");
        input.parentElement.appendChild(button);
        button.type = "button";
        button.innerText = "Add";
        button.classList.add("photo-add-button");
        // Button click logic
        button.addEventListener("click", function () {
            _this.onClickAddPhoto(input, previewContainer);
        });
    };
    PhotoUploader.prototype.onClickAddPhoto = function (input, previewContainer) {
        var _this = this;
        console.log("Photo uploaded");
        // Click logic
        var file = document.createElement("input");
        document.querySelector("body").appendChild(file);
        file.type = "file";
        file.setAttribute("multiple", "multiple");
        file.click();
        file.addEventListener("input", function (e) {
            var target = e.target;
            // Add preview to container
            for (var i = 0; i < target.files.length; ++i) {
                var key = _this.generateUUID();
                // Build preview
                var preview = _this.buildPreview(target.files[i], previewContainer, undefined, key);
                // Add data
                _this._data_dictionary[key] = {
                    File: target.files[i],
                    isprimary: false
                };
            }
        });
        document.querySelector("body").removeChild(file);
    };
    PhotoUploader.prototype.buildPreview = function (file, previewContainer, clone, key) {
        // Create preview
        var preview = document.createElement("div");
        preview.setAttribute("data-photoupload-key", key);
        preview.classList.add("photo-preview");
        preview.addEventListener("click", function (e) {
            e.stopPropagation();
        });
        // Header
        var header = this.buildHeader(file, previewContainer, clone, preview, key);
        // Create image
        var image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        // Build
        preview.appendChild(header);
        preview.appendChild(image);
        previewContainer.appendChild(preview);
        return preview;
    };
    PhotoUploader.prototype.buildHeader = function (file, previewContainer, clone, preview, key) {
        var _this = this;
        var header = document.createElement("div");
        header.classList.add("photo-preview-header");
        // Checkbox
        var checkboxGroup = document.createElement("div");
        checkboxGroup.classList.add("form-group");
        checkboxGroup.classList.add("form-check");
        checkboxGroup.classList.add("m-0");
        checkboxGroup.classList.add("ml-1");
        checkboxGroup.classList.add("d-inline");
        // Random guid to link label to checkbox
        var guid = this.generateUUID();
        var label = document.createElement("label");
        label.textContent = "Primary";
        label.classList.add("form-check-label");
        label.setAttribute("for", guid);
        var checkbox = document.createElement("input");
        checkbox.id = guid;
        checkbox.type = "checkbox";
        checkbox.classList.add("form-check-input");
        checkbox.addEventListener("change", function (e) {
            var target = e.target;
            if (target.checked) {
                _this._data_dictionary[key].isprimary = true;
            }
            else {
                _this._data_dictionary[key].isprimary = false;
            }
        });
        checkboxGroup.appendChild(checkbox);
        checkboxGroup.appendChild(label);
        header.appendChild(checkboxGroup);
        // Bin icon
        var bin = document.createElement("i");
        header.appendChild(bin);
        bin.classList.add("fas");
        bin.classList.add("fa-trash");
        bin.classList.add("float-right");
        bin.classList.add("m-1");
        bin.addEventListener("click", function () {
            delete _this._data_dictionary[key];
            previewContainer.removeChild(preview);
        });
        return header;
    };
    PhotoUploader.prototype.generateUUID = function () {
        var d = new Date().getTime(); //Timestamp
        var d2 = (performance && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16; //random number between 0 and 16
            if (d > 0) { //Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            }
            else { //Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };
    return PhotoUploader;
}());
//# sourceMappingURL=PhotoUploader.js.map