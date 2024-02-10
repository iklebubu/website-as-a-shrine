function makeFileNameEditable(filenameElement) {
    filenameElement.contentEditable = true;
    filenameElement.focus();

    filenameElement.addEventListener('blur', function() {
        filenameElement.contentEditable = false;
    });
}

$(".grid-item").draggable();

