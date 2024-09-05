const nutzerList = JSON.parse(localStorage.getItem('nutzerList')) || [];
const zuordnungen = JSON.parse(localStorage.getItem('zuordnungen')) || {
    "Posten 1": [],
    "Posten 2": [],
    "Posten 3": [],
    "Posten 4": [],
    "Springer": [],
    "Pause": []
};

const korrektesPasswort = "meinPasswort"; // Definiere hier das korrekte Passwort

document.addEventListener("DOMContentLoaded", () => {
    updateNutzerList();
    updateZuordnungen();
});

// Passwortprüfung
function verifyPassword() {
    const passwordInput = document.getElementById('passwordInput').value;
    if (passwordInput === korrektesPasswort) {
        document.getElementById('nutzerName').disabled = false;
        document.getElementById('addButton').disabled = false;
        document.getElementById('nutzerList').disabled = false;
        document.getElementById('postenSelect').disabled = false;
        document.getElementById('assignButton').disabled = false;
        document.getElementById('removeButton').disabled = false;
        document.getElementById('changeButton').disabled = false;
    } else {
        alert("Falsches Passwort!");
    }
}

// Nutzer hinzufügen
function addNutzer() {
    const nutzerName = document.getElementById('nutzerName').value;
    if (nutzerName) {
        if (!nutzerList.includes(nutzerName)) {
            nutzerList.push(nutzerName);
            localStorage.setItem('nutzerList', JSON.stringify(nutzerList));
            updateNutzerList();
            document.getElementById('nutzerName').value = '';
        } else {
            alert('Nutzername bereits vorhanden.');
        }
    } else {
        alert('Bitte einen Nutzernamen eingeben.');
    }
}

// Nutzer entfernen
function removeNutzer() {
    const nutzerListElement = document.getElementById('nutzerList');
    const selectedNutzerIndex = nutzerListElement.selectedIndex;
    if (selectedNutzerIndex >= 0) {
        const nutzer = nutzerList[selectedNutzerIndex];
        nutzerList.splice(selectedNutzerIndex, 1);
        localStorage.setItem('nutzerList', JSON.stringify(nutzerList));

        // Entferne den Nutzer aus allen Posten
        for (const posten in zuordnungen) {
            const index = zuordnungen[posten].indexOf(nutzer);
            if (index > -1) {
                zuordnungen[posten].splice(index, 1);
            }
        }
        localStorage.setItem('zuordnungen', JSON.stringify(zuordnungen));

        updateNutzerList();
        updateZuordnungen();
    } else {
        alert('Bitte einen Nutzer aus der Liste auswählen.');
    }
}

// Nutzerliste aktualisieren
function updateNutzerList() {
    const nutzerListElement = document.getElementById('nutzerList');
    nutzerListElement.innerHTML = '';
    nutzerList.forEach((nutzer) => {
        const option = document.createElement('option');
        option.text = nutzer;
        nutzerListElement.add(option);
    });
}

// Nutzer zuweisen
function assignNutzer() {
    const nutzerListElement = document.getElementById('nutzerList');
    const selectedNutzerIndex = nutzerListElement.selectedIndex;
    const posten = document.getElementById('postenSelect').value;

    if (selectedNutzerIndex >= 0) {
        const nutzer = nutzerList[selectedNutzerIndex];

        if (!zuordnungen[posten].includes(nutzer)) {
            zuordnungen[posten].push(nutzer);
            localStorage.setItem('zuordnungen', JSON.stringify(zuordnungen));
            updateZuordnungen();
        } else {
            alert(`${nutzer} ist bereits zu ${posten} zugeordnet.`);
        }
    } else {
        alert('Bitte einen Nutzer aus der Liste auswählen.');
    }
}

// Posten ändern
function changePosten() {}
    const nutzerListElement = document.getElementById('nutzerList');
    
