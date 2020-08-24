var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var PhotoUploader = /** @class */ (function () {
    function PhotoUploader(input) {
        this._data_dictionary = {};
        this.initFile(input);
    }
    PhotoUploader.prototype.onSuccess = function () { };
    PhotoUploader.prototype.OnFailure = function () { };
    PhotoUploader.prototype.OnError = function () { };
    PhotoUploader.prototype.send = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, key, preview, overlay, msg, formData, data, url, response, responseData;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = [];
                        for (_b in this._data_dictionary)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        key = _a[_i];
                        preview = this.previewContainer.querySelector(".photo-preview[data-photoupload-key='" + key + "']");
                        console.log("WTF");
                        overlay = preview.querySelector(".photo-preview-overlay");
                        if (overlay) {
                            preview.removeChild(overlay);
                        }
                        overlay = document.createElement("div");
                        preview.appendChild(overlay);
                        overlay.classList.add("photo-preview-overlay");
                        msg = document.createElement("span");
                        overlay.appendChild(msg);
                        msg.className = "fas fa-spinner fa-spin fa-5x photo-preview-spinner";
                        formData = new FormData();
                        data = this._data_dictionary[key];
                        formData.append("Photo.Key", key);
                        formData.append("Photo.File", data.File);
                        formData.append("Photo.IsPrimary", "true");
                        url = "/Photos/Create";
                        return [4 /*yield*/, fetch(url, {
                                method: "POST",
                                body: formData
                            })];
                    case 2:
                        response = _c.sent();
                        if (!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.json()];
                    case 3:
                        responseData = _c.sent();
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
                        return [3 /*break*/, 5];
                    case 4:
                        // Error icon
                        msg.className = "fas fa-exclamation-circle fa-5x text-danger";
                        // Callback failure
                        this.OnError();
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // Transform <input type=file /> into the photo uploader container
    PhotoUploader.prototype.initFile = function (input) {
        var _this = this;
        console.log("Init file");
        // Hide file
        input.setAttribute("hidden", "hidden");
        // Preview area
        this.previewContainer = document.createElement("div");
        input.parentElement.appendChild(this.previewContainer);
        this.previewContainer.classList.add("photo-preview-container");
        this.previewContainer.addEventListener("click", function () {
            _this.onClickAddPhoto(input, _this.previewContainer);
        });
        // Add dynamic button upload
        var button = document.createElement("button");
        input.parentElement.appendChild(button);
        button.type = "button";
        button.innerText = "Add";
        button.classList.add("photo-add-button");
        // Button click logic
        button.addEventListener("click", function () {
            _this.onClickAddPhoto(input, _this.previewContainer);
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
                _this.buildPreview(target.files[i], _this.previewContainer, undefined, key);
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
        var header = this.buildHeader(file, this.previewContainer, clone, preview, key);
        // Create image
        var image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        // Build
        preview.appendChild(header);
        preview.appendChild(image);
        this.previewContainer.appendChild(preview);
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
            _this.previewContainer.removeChild(preview);
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