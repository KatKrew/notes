document.getElementById("addNoteButton").addEventListener("click", createNote);

// Variables for dragging
let isDragging = false;
let draggedNote = null;
let offsetX = 0, offsetY = 0;

// Load saved notes from localStorage when the page loads
window.onload = loadNotes;

function createNote(content = "", left = 100, top = 100) {
    const noteContainer = document.getElementById("noteContainer");
    const note = document.createElement("div");
    note.classList.add("note");
    note.style.left = left + "px";
    note.style.top = top + "px";

    const textarea = document.createElement("textarea");
    textarea.placeholder = "Write your note here...";
    textarea.value = content;
    note.appendChild(textarea);

    // Add mouse events to handle dragging
    note.addEventListener("mousedown", startDragging);
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("mousemove", dragNote);

    // Save note whenever its content changes
    textarea.addEventListener("input", saveNotes);

    noteContainer.appendChild(note);
    saveNotes(); // Save notes after adding new one
}

function startDragging(e) {
    isDragging = true;
    draggedNote = e.target.closest('.note');
    offsetX = e.clientX - draggedNote.offsetLeft;
    offsetY = e.clientY - draggedNote.offsetTop;
}

function stopDragging() {
    isDragging = false;
    draggedNote = null;
    saveNotes();  // Save note positions after dragging
}

function dragNote(e) {
    if (isDragging && draggedNote) {
        // Update position of the note only, do not modify its content
        draggedNote.style.left = `${e.clientX - offsetX}px`;
        draggedNote.style.top = `${e.clientY - offsetY}px`;
    }
}

// Save notes to localStorage
function saveNotes() {
    const notes = [];
    document.querySelectorAll(".note").forEach(note => {
        const textarea = note.querySelector("textarea");
        const noteData = {
            content: textarea.value,
            left: note.style.left,
            top: note.style.top
        };
        notes.push(noteData);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Load notes from localStorage
function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.forEach(noteData => {
        createNote(noteData.content, parseInt(noteData.left), parseInt(noteData.top));
    });
}
