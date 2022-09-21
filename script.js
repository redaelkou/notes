let submitBtn = document.querySelector('button')
let input = document.querySelector('input')
let tasks = document.querySelector('.tasks')
let aletBtn = document.querySelector('.aletBtn')
let overlay = document.querySelector('.overlay')


submitBtn.addEventListener('click', () => {
    if (input.value === '') {
        overlay.classList.add('hideClass')
    }else {
        let localNotes = localStorage.getItem('notes')
        if (localNotes === null) {
            listArr = [];
        }else {
            listArr = JSON.parse(localNotes);
        }
        listArr.push(input.value);
        localStorage.setItem('notes', JSON.stringify(listArr));
        getNotes();
        getNotesNumber();
    }
})

// clearing input after adding a note
submitBtn.onclick = () => {
    input.value = '';
}


// add  notes
function getNotes() {
    let localNotes = localStorage.getItem('notes')

    if (localNotes === null) {
        listArr = [];
    }else {
        listArr = JSON.parse(localNotes);
    }

    let html = '';
    listArr.forEach((element, index) => {
        html +=`<ul>
                    <li><span class="note">${element}</span><i class="fa-solid fa-pen-to-square"><i class="fa-solid fa-floppy-disk" onclick="saveNewChanges(${index})"></i></i>
                    <i class="fa-solid fa-trash" onclick="deleteNote(${index})"></i> </li>
                </ul>`
    });
    tasks.innerHTML = html;
}
getNotes()



// delete the clicked note
function deleteNote(index) {
    let localNotes = localStorage.getItem('notes')
    listArr = JSON.parse(localNotes)
    listArr.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(listArr))
    getNotes();
    getNotesNumber();
}


// remove alert message
aletBtn.addEventListener('click', () => {
    overlay.classList.remove('hideClass')
})



// get existing notes number
let notesNumber = document.querySelector('.notesNumber')
function getNotesNumber() {
    notesNumber.innerHTML = listArr.length
}
getNotesNumber()




// clear all notes

let clearNotes = document.querySelector('.clearNotes')
let clearAllOverlay = document.querySelector('.clearAllOverlay')
let clearAllBletBtn = document.querySelector('.clearAllBletBtn')

clearNotes.addEventListener('click', () => {
    if (listArr.length > 0) {
        document.querySelector('.alert_note').innerHTML = 'you wanna delete all Notes?';
        clearAllOverlay.classList.add('clearAllOverlayHideClass')
        clearCancel.style.display = 'block'
    }else {
        document.querySelector('.alert_note').innerHTML = 'There are no note to clear!!';
        clearAllOverlay.classList.add('clearAllOverlayHideClass')
    }
})

clearAllBletBtn.addEventListener('click', () => {
    localStorage.removeItem('notes')
    getNotes()
    getNotesNumber()
    clearCancel.style.display = 'none'
    clearAllOverlay.classList.remove('clearAllOverlayHideClass')
})

let clearCancel = document.querySelector('.cancel')
clearCancel.onclick = () => {
    clearAllOverlay.classList.remove('clearAllOverlayHideClass')
}


// edit note 
let fa_pen_to_square = document.querySelectorAll('.fa-pen-to-square')
let note = document.querySelectorAll('.note')

function editNote() {
    fa_pen_to_square.forEach( (noteItem) => {
        noteItem.addEventListener('click', (e) => {
            let currentNoteItem = e.currentTarget.parentElement.children[0]
            currentNoteItem.contentEditable = 'true'
        })
    })
}
editNote()


// save new edits to notes
let fa_floppy_disk = document.querySelector('.fa-floppy-disk')
let notes = document.querySelectorAll('.tasks ul li')
function saveNewChanges(index) {
    notes.forEach( (note) => {
        note.addEventListener('click', (e) => {
            let currentNoteText = e.currentTarget.children[0].innerHTML
            listArr[index] = currentNoteText
            localStorage.setItem('notes', JSON.stringify(listArr))
            getNotes()
        })
    })
}


// clear all Notes alert

