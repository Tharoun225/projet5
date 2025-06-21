// 1. On sélectionne les éléments
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

// 2. Variable pour stocker ce que l'utilisateur tape
let currentInput = "";

// 3. Écoute chaque clic sur les boutons
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "=") {
      try {
        currentInput = eval(currentInput);
        display.value = currentInput;
      } catch {
        display.value = "Erreur";
        currentInput = "";
      }
    } else if (value === "C") {
      currentInput = "";
      display.value = "";
    } else {
      currentInput += value;
      display.value = currentInput;
    }
  });
});

// 4. Activer les touches du clavier
document.addEventListener("keydown", (event) => {
  const key = event.key;

  // Si la touche est un chiffre ou un opérateur
  if (/[\d+\-*/.]/.test(key)) {
    currentInput += key;
    display.value = currentInput;
  }
  // Si on appuie sur "Entrée" ➤ comme le bouton "="
  else if (key === "Enter") {
    try {
      currentInput = eval(currentInput);
      display.value = currentInput;
    } catch {
      display.value = "Erreur";
      currentInput = "";
    }
  }
  // Si on appuie sur "Backspace" ➤ efface le dernier caractère
  else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  }
  // Si on appuie sur "Escape" ➤ reset total
  else if (key === "Escape") {
    currentInput = "";
    display.value = "";
  }

  // ✅ Effet visuel sur le bouton correspondant
  const matchingBtn = Array.from(buttons).find(btn =>
    btn.textContent === key ||
    (key === "Enter" && btn.id === "equal") ||
    (key === "Escape" && btn.textContent === "C")
  );

  if (matchingBtn) {
    matchingBtn.classList.add("active");
    setTimeout(() => {
      matchingBtn.classList.remove("active");
    }, 150);
  }
});
