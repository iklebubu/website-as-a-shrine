// Load the folder names from localStorage when the page loads
/**window.onload = function() {
    loadFolderNames();
};

function makeFolderNameEditable(folderNameElement) {
    folderNameElement.contentEditable = true;
    folderNameElement.focus();

    folderNameElement.addEventListener('blur', function() {
        folderNameElement.contentEditable = false;
        saveFolderNames();
    });
}

function saveFolderNames() {
    var folderNames = document.querySelectorAll('.folder-name');
    var folderNamesArray = Array.from(folderNames).map(function(element) {
        return element.textContent;
    });
    localStorage.setItem('folderNames', JSON.stringify(folderNamesArray));
}

function loadFolderNames() {
    var folderNamesArray = JSON.parse(localStorage.getItem('folderNames'));
    if (folderNamesArray) {
        var folderNames = document.querySelectorAll('.folder-name');
        folderNames.forEach(function(element, index) {
            element.textContent = folderNamesArray[index];
        });
    }
}*/

// no name storage

function makeFolderNameEditable(folderNameElement) {
    folderNameElement.contentEditable = true;
    folderNameElement.focus();

    // Listen for blur event to save changes
    folderNameElement.addEventListener('blur', function() {
        folderNameElement.contentEditable = false;
    });
}

