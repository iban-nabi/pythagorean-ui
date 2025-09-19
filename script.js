document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("pythagorean-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const value = document.getElementById("input-box").value;
      sendNumber(value);
    });

  function sendNumber(value) {
    const url = `http://localhost:8080/api/pythagorean/calculate-pythagorean-sides/${value}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const invalidMsg = document.querySelector("#invalid-msg");
        if (invalidMsg) {
          invalidMsg.remove();
        }

        if (data.value == null || data.value == undefined) {
          const form = document.querySelector("#pythagorean-form");
          const warningElement = document.createElement("p");
          warningElement.textContent =
            "Invalid Input! Enter a Perfect Square Value";
          warningElement.id = "invalid-msg";
          form.insertAdjacentElement("afterend", warningElement);
        } else {
          const tbody = document.querySelector("#pythagorean-table tbody");
          tbody.insertAdjacentHTML(
            "afterbegin",
            `<tr><td>${data.value}</td><td>${data.a}</td><td>${data.b}</td><td>${data.c}</td><td>${data.average}</td></tr>`
          );
        }
      })
      .catch((err) => console.error(err));
  }
});
