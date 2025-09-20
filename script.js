const seen = [];

document
  .getElementById("pythagorean-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const value = document.getElementById("input-box").value;

    if (value.trim() !== "" && !seen.includes(value)) {
      sendNumber(value);
    }

    if (document.querySelector("#invalid-msg") && seen.includes(value)) {
      document.querySelector("#invalid-msg").remove();
    }
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
        const form = document.querySelector("#form-text");
        const warningElement = document.createElement("p");
        warningElement.textContent =
          "Invalid Input! Enter a Perfect Square Value";
        warningElement.id = "invalid-msg";
        form.insertAdjacentElement("afterend", warningElement);
      } else {
        seen.push(value);
        const tbody = document.querySelector("#pythagorean-table tbody");
        tbody.insertAdjacentHTML(
          "afterbegin",
          `<tr>
                <th scope="row">${data.value}</td>
                <td>${data.a}</td>
                <td>${data.b}</td>
                <td>${data.c}</td>
                <td>${data.average}</td>
            </tr>`
        );
      }
    })
    .catch((err) => console.error(err));
}
