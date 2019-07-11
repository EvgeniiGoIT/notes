"use strict";
import rendering from "./components/rendering.js";
import addEventListenerOnForm from "./components/formSubmitHendler.js";
class Notepad {
  constructor(notes = []) {
    this._notes = notes;
    rendering.renderNoteList(document.querySelector(".note-list"), this._notes);
    addEventListenerOnForm();
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

  generateUniqueId() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  }

  saveNote(note) {
    note = {
      ...note,
      id: this.generateUniqueI(),
      priority: this.PRIORITY_TYPES.LOW
    };
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

new Notepad(initialNotes);
