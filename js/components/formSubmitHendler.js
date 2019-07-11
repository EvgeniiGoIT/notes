const refs = {
  form: document.querySelector(".note-editor")
};

export default function addEventListenerOnForm() {
  refs.form.addEventListener("submit", formSubmitHandler);
}

function formSubmitHandler(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  //   for (const iterator of formData.values()) {
  //     console.log(iterator);
  //   }

  const promise = new Promise(resolve => {
    resolve("hi");
  });
  return promise;
}
