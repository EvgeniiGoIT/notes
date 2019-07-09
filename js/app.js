"use strict";
class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }
  get notes() {
    return this._notes;
  }
  findNoteById(id) {
    for (const note of this._notes) {
      if (note.id === id) {
        return note;
      }
    }
  }
  saveNote(note) {
    this._notes.push(note);
    return note;
  }
  deleteNote(id) {
    this._notes.splice(this._notes.indexOf(this.findNoteById(id)), 1);
  }
  updateNoteContent(id, updatedContent) {
    return Object.assign(this.findNoteById(id), updatedContent);
  }
  updateNotePriority(id, priority) {
    return (this.findNoteById(id).priority = priority);
  }
  filterNotesByQuery(query) {
    const arrayNotes = [];
    query = query.toLowerCase();
    for (const note of this._notes) {
      if ((note.title + " " + note.body).toLowerCase().includes(query)) {
        arrayNotes.push(note);
      }
    }
    return arrayNotes;
  }
  filterNotesByPriority(priority) {
    const arrayNotesCurrentPrioriry = [];
    for (const note of this.notes) {
      if (note.priority === priority) {
        arrayNotesCurrentPrioriry.push(note);
      }
    }
    return arrayNotesCurrentPrioriry;
  }

  createListItem(notes) {
    const li = document.createElement("li");
    li.classList.add("note-list__item");
    li.dataset.id = notes.id;

    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    const noteContent = this.createNoteContent(notes.title, notes.body);
    const noteFooter = this.createNoteFooter(notes.priority);

    noteDiv.append(noteContent, noteFooter);
    li.appendChild(noteDiv);
    return li;
  }

  createNoteContent(title, body) {
    const noteContentDiv = document.createElement("div");
    noteContentDiv.classList.add("note__content");

    const noteTitle = document.createElement("h2");
    noteTitle.classList.add("note__title");
    noteTitle.textContent = title;

    const noteBody = document.createElement("p");
    noteBody.classList.add("note__body");
    noteBody.textContent = body;

    noteContentDiv.append(noteTitle, noteBody);

    return noteContentDiv;
  }

  createNoteFooter(priority) {
    const noteFooter = document.createElement('footer');
    noteFooter.classList.add('note__footer');

    const firstSection = document.createElement('section');
    const firstButton = this.createButtonAction("decrease-priority", "expand_more");
    const secondButton = this.createButtonAction("increase-priority", "expand_less");

    const spanFooter = document.createElement('span');
    spanFooter.classList.add('note__priority');
    spanFooter.textContent = 'Priority: ';
    const textNode = document.createTextNode(`${priority}`);
    spanFooter.appendChild(textNode);

    firstSection.append(firstButton, secondButton, spanFooter);

    const secondSection = document.createElement('section');
    const thirdButton = this.createButtonAction("edit-note", "edit");
    const fourthButton = this.createButtonAction("delete-note", "delete");

     secondSection.append(thirdButton, fourthButton);
    
    noteFooter.append(firstSection, secondSection);
    return noteFooter;
  }

  createButtonAction(dataAction,textContent) {
    const button = document.createElement('button');
    button.classList.add('action');
    button.dataset.action = dataAction;

    const i = document.createElement('i');
    i.classList.add("material-icons", "action__icon");
    i.textContent = textContent;

    button.appendChild(i);
    return button;
  }

  renderNoteList(listRef, notes) {
    let elementsList= '';
    notes.forEach(element => {
      elementsList+=this.createListItem(element).outerHTML;
    });
    listRef.insertAdjacentHTML('afterbegin', elementsList);
  }
}
const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2
};

const ICON_TYPES = {
  EDIT: "edit",
  DELETE: "delete",
  ARROW_DOWN: "expand_more",
  ARROW_UP: "expand_less"
};

const NOTE_ACTIONS = {
  DELETE: "delete-note",
  EDIT: "edit-note",
  INCREASE_PRIORITY: "increase-priority",
  DECREASE_PRIORITY: "decrease-priority"
};

const initialNotes = [
  {
    id: "id-1",
    title: "JavaScript essentials",
    body:
      "Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",
    priority: PRIORITY_TYPES.HIGH
  },
  {
    id: "id-2",
    title: "Refresh HTML and CSS",
    body:
      "Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",
    priority: PRIORITY_TYPES.NORMAL
  },
  {
    id: "id-3",
    title: "Get comfy with Frontend frameworks",
    body:
      "First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",
    priority: PRIORITY_TYPES.NORMAL
  },
  {
    id: "id-4",
    title: "Winter clothes",
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW
  }
];

const note = new Notepad(initialNotes);
note.renderNoteList(document.querySelector('.note-list'), note.notes);
