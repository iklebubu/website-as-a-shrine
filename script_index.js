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
    folderNameElement.classList.add('editable');
    folderNameElement.focus();

    // Select the text when the element is clicked
    folderNameElement.addEventListener('click', function(event) {
        var range = document.createRange();
        range.selectNodeContents(folderNameElement);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        event.stopPropagation(); // Stop propagation to prevent document click handler from triggering
    });

    // Listen for blur event to save changes
    folderNameElement.addEventListener('blur', function() {
        folderNameElement.contentEditable = false;
    });

    // Listen for click event on document body
    document.body.addEventListener('click', function(event) {
        if (event.target !== folderNameElement) {
            folderNameElement.blur(); // Remove focus from folderNameElement
        }
    });
}

function makeFileNameEditable(filenameElement) {
    filenameElement.contentEditable = true;
    filenameElement.classList.add('editable'); // Add class for styling
    filenameElement.focus();

    // Select the text when the element is double-clicked
    filenameElement.addEventListener('dblclick', function(event) {
        var range = document.createRange();
        range.selectNodeContents(filenameElement);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        event.stopPropagation(); // Stop propagation to prevent document click handler from triggering
    });

    // Listen for blur event to save changes
    filenameElement.addEventListener('blur', function() {
        filenameElement.contentEditable = false;
    });

    function deselectText() {
        var selection = window.getSelection();
        selection.removeAllRanges();
    }

    // Listen for click event on document body
    document.body.addEventListener('click', function(event) {
        if (event.target !== filenameElement) {
            filenameElement.blur(); // Remove focus from filenameElement
            deselectText();
        }
    });
}

var startX, startY;

// Function to handle mouse down event on the folder icon
function handleFolderMouseDown(event) {
    console.log("Mouse down on folder icon");
    startX = event.clientX;
    startY = event.clientY;
}

// Function to handle mouse up event on the folder icon
function handleFolderMouseUp(event) {
    console.log("Mouse up on folder icon");
    var endX = event.clientX;
    var endY = event.clientY;

    // Calculate the distance between the initial and final mouse positions
    var distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

    // If the distance is small, treat it as a click and open the subwindow
    if (distance < 3) {
        appearSubWindow(event.target.id);
    }
}

// Event listeners for mouse down and up events on the folder icon
document.querySelectorAll('.folder-icon').forEach(function(icon) {
    icon.addEventListener("mousedown", handleFolderMouseDown);
    icon.addEventListener("mouseup", handleFolderMouseUp);

    // Preserve existing onclick behavior
    var existingClickHandler = icon.onclick;
    icon.onclick = function(event) {
        if (!isDragging) {
            existingClickHandler.call(this, event);
        }
    };
});

// Function to appear subwindow
function appearSubWindow(folderId) {
    console.log("Appear subwindow for folder ID:", folderId);
    var string = "subwindow" + folderId;
    var subwindow = document.getElementById(string);
    if (subwindow) {
        subwindow.style.display = 'block';
    }
}

/**function appearSubWindow() {
    var string = "subwindow" + event.target.id;
    var subwindow = document.getElementById(string);
    subwindow.style.display = 'block';
  }*/

  function closeSubWindow(subwindowId) {
    var subwindow = document.getElementById(subwindowId);
    subwindow.style.display = "none";
  }

$(".folder").draggable();
$(".subwindow").draggable();
// Make grid items draggable
$(".grid-item").draggable();

$(document).ready(function() {
    $(".grid-item").draggable({
        revert: true, // Snap back if not dropped in a droppable area
        zIndex: 100,
        start: function(event, ui) {
            // Keep a reference to the dragged item
            $(this).data("origin", $(this).closest(".subwindow"));
        }
    });

    $(".subwindow").droppable({
        accept: ".grid-item",
        drop: function(event, ui) {
            var droppedItem = ui.draggable;

            // Remove the dragged item from its original subwindow
            var originSubwindow = droppedItem.data("origin");
            droppedItem.appendTo($(this).find(".grid-container"));

            // Apply styling and update event handlers for the dropped item
            droppedItem.css({ top: 0, left: 0 });
            makeFileNameEditable(droppedItem.find(".filename")[0]);

            // Optionally, you can save changes to the server or local storage
            // to reflect the new arrangement of grid items
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
  
    document.addEventListener('mousemove', function (e) {
      const x = e.clientX;
      const y = e.clientY;
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
    });
  });


