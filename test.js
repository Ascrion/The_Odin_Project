let button = document.querySelector("button");
button.addEventListener("click", function (event) {
    alert(`You pressed "${event.key}".`);
    event.target.style.background = "blue";
  });
