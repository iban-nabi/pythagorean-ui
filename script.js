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
        const tbody = document.querySelector("#pythagorean-table tbody");
        tbody.insertAdjacentHTML(
          "afterbegin",
          `<tr><td>${value}</td><td>${JSON.stringify(data)}</td></tr>`
        );
      })
      .catch((err) => console.error(err));
  }
});
