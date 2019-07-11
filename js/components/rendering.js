export default {
  renderNoteList(listRef, notes) {
    const markup = notes.reduce((acc, currentNote) => {
      const markup = acc + this.createListItem(currentNote).outerHTML;
      return markup;
    }, "");
    listRef.insertAdjacentHTML("afterbegin", markup);
  },

  createListItem({ id, title, body, priority }) {
    const li = document.createElement("li");
    li.classList.add("note-list__item");
    li.dataset.id = id;

    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    const noteContent = this.createNoteContent(title, body);
    const noteFooter = this.createNoteFooter(priority);

    noteDiv.append(noteContent, noteFooter);
    li.appendChild(noteDiv);
    return li;
  },

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
  },

  createNoteFooter(priority) {
    const noteFooter = document.createElement("footer");
    noteFooter.classList.add("note__footer");

    const firstSection = document.createElement("section");
    const firstButton = this.createButtonAction(
      "decrease-priority",
      "expand_more"
    );
    const secondButton = this.createButtonAction(
      "increase-priority",
      "expand_less"
    );

    const spanFooter = document.createElement("span");
    spanFooter.classList.add("note__priority");
    spanFooter.textContent = "Priority: ";
    const textNode = document.createTextNode(`${priority}`);
    spanFooter.appendChild(textNode);

    firstSection.append(firstButton, secondButton, spanFooter);

    const secondSection = document.createElement("section");
    const thirdButton = this.createButtonAction("edit-note", "edit");
    const fourthButton = this.createButtonAction("delete-note", "delete");

    secondSection.append(thirdButton, fourthButton);

    noteFooter.append(firstSection, secondSection);
    return noteFooter;
  },

  createButtonAction(dataAction, textContent) {
    const button = document.createElement("button");
    button.classList.add("action");
    button.dataset.action = dataAction;

    const i = document.createElement("i");
    i.classList.add("material-icons", "action__icon");
    i.textContent = textContent;

    button.appendChild(i);
    return button;
  }
};
