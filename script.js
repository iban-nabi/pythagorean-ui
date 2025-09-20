const seen = [];

document
  .getElementById("pythagorean-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const inputBox = document.getElementById("input-box");
    const value = inputBox.value.trim();
    const feedback = document.querySelector("#invalid-msg");

    feedback.textContent = "";
    feedback.classList.remove("d-block");
    inputBox.value = "";

    if (value === "") {
      feedback.textContent = "Input cannot be empty!";
      feedback.classList.add("d-block");
      return;
    }

    if (!seen.includes(value)) {
      sendNumber(value);
      return;
    }
  });

function sendNumber(value) {
  const url = `http://localhost:8080/api/pythagorean/calculate-pythagorean-sides/${value}`;
  const feedback = document.querySelector("#invalid-msg");

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      seen.push(value);
      const tbody = document.querySelector("#pythagorean-table tbody");
      const placeholderRow = document.getElementById("no-entries-default");

      if (placeholderRow) {
        placeholderRow.classList.add("d-none");
      }

      if (data.value == null || data.value === undefined) {
        tbody.insertAdjacentHTML(
          "afterbegin",
          `<tr>
              <th scope="row">${value}</th>
              <td>Invalid</td>
              <td>Invalid</td>
              <td>Invalid</td>
              <td>Invalid</td>
          </tr>`
        );
      } else {
        tbody.insertAdjacentHTML(
          "afterbegin",
          `<tr>
              <th scope="row">${data.value}</th>
              <td>${data.a}</td>
              <td>${data.b}</td>
              <td>${data.c}</td>
              <td>${data.average}</td>
          </tr>`
        );
      }
    })
    .catch((err) => {
      console.error(err);
      feedback.textContent = "Server error, please try again later.";
      feedback.classList.add("d-block");
    });
}
