// ===== FONCTIONS LOCALSTORAGE =====
function saveData() {
    const data = {
        revenulist: revenulist,
        depenselist: depenselist,
        solde: solde,
        totalrevenu: totalrevenu,
        totaldepense: totaldepense
    };
    localStorage.setItem("budgetData", JSON.stringify(data));
}

function loadData() {
    const savedData = localStorage.getItem("budgetData");
    if (savedData) {
        const data = JSON.parse(savedData);
        revenulist = data.revenulist || [];
        depenselist = data.depenselist || [];
        solde = data.solde || 0;
        totalrevenu = data.totalrevenu || 0;
        totaldepense = data.totaldepense || 0;
        
        document.getElementById("solde").textContent = solde;
        document.getElementById("total-revenu").textContent = totalrevenu;
        document.getElementById("total-depense").textContent = totaldepense;
        
        displayRevenu();
        displayDepense();
    }
}

function clearAllData() {
    revenulist = [];
    depenselist = [];
    solde = 0;
    totalrevenu = 0;
    totaldepense = 0;
    
    document.getElementById("solde").textContent = "0";
    document.getElementById("total-revenu").textContent = "0";
    document.getElementById("total-depense").textContent = "0";
    
    displayRevenu();
    displayDepense();
    localStorage.removeItem("budgetData");
}
// =====================================

// Variables globales
let revenulist = [];
let depenselist = [];
let solde = 0;
let totalrevenu = 0;
let totaldepense = 0;

// Initialiser les event listeners immédiatement

    let startbtn = document.getElementById("start-btn");
    let addbtn = document.getElementById("add-revenu-btn");
    let adddepensebtn = document.getElementById("add-depense-btn");
    let savebtn = document.getElementById("save-btn");
    let clearbtn = document.getElementById("clear-btn");

    if (addbtn) {
        addbtn.addEventListener("click", addRevenu);
    }
    if (adddepensebtn) {
        adddepensebtn.addEventListener("click", addDepense);
    }
    if (savebtn) {
        savebtn.addEventListener("click", function() {
            saveData();
            alert("Données sauvegardées avec succès !");
        });
    }
    
    
    if (startbtn) {
        startbtn.addEventListener("click", function() {
            window.location.href = "contenu.html";
        });
    }

    if (clearbtn) {
        clearbtn.addEventListener("click", clearAllData);
        
    }


// Charger les données et initialiser au démarrage
loadData();


// ===== REVENUS =====
function displayRevenu() {
    let html = "";
    for (let i = 0; i < revenulist.length; i++) {
        html += "<li>" + revenulist[i] + " <button class='remove-btn' onclick='removeRevenu(" + i + ")'>x</button></li>";
    }
    document.getElementById("revenu-list").innerHTML = html;
}

function addRevenu() {
    let revenuInput = document.getElementById("revenu-description");
    let montantInput = document.getElementById("revenu-amount");
    
    if (!revenuInput || !montantInput) {
        console.error("Éléments revenu introuvables");
        return;
    }
    
    let description = revenuInput.value.trim();
    let montant = parseFloat(montantInput.value);
    
    if (description === "" || isNaN(montant) || montant <= 0) {
        alert("Veuillez remplir correctement le formulaire");
        return;
    }
    
    revenulist.push(description + " : " + montant + " fcfa");
    solde += montant;
    totalrevenu += montant;
    
    document.getElementById("solde").textContent = solde;
    document.getElementById("total-revenu").textContent = totalrevenu;
    
    revenuInput.value = "";
    montantInput.value = "";
    
    displayRevenu();
    saveData();
}

function removeRevenu(i) {
    if (i >= 0 && i < revenulist.length) {
        let montant = parseFloat(revenulist[i].split(":")[1]);
        solde -= montant;
        totalrevenu -= montant;
        revenulist.splice(i, 1);
        
        document.getElementById("solde").textContent = solde;
        document.getElementById("total-revenu").textContent = totalrevenu;
        
        displayRevenu();
        saveData();
    }
}

// ===== DÉPENSES =====
function displayDepense() {
    let html2 = "";
    for (let i = 0; i < depenselist.length; i++) {
        html2 += "<li>" + depenselist[i] + " <button class='remove-btn' onclick='removeDepense(" + i + ")'>x</button></li>";
    }
    document.getElementById("depense-list").innerHTML = html2;
}

function addDepense() {
    let depenseInput = document.getElementById("depense-description");
    let montantInput = document.getElementById("depense-amount");
    
    if (!depenseInput || !montantInput) {
        console.error("Éléments dépense introuvables");
        return;
    }
    
    let description = depenseInput.value.trim();
    let montant = parseFloat(montantInput.value);
    
    if (description === "" || isNaN(montant) || montant <= 0) {
        alert("Veuillez remplir correctement le formulaire");
        return;
    }
    
    depenselist.push(description + " : " + montant + " fcfa");
    solde -= montant;
    totaldepense += montant;
    
    document.getElementById("solde").textContent = solde;
    document.getElementById("total-depense").textContent = totaldepense;
    
    depenseInput.value = "";
    montantInput.value = "";
    
    displayDepense();
    saveData();
}

function removeDepense(i) {
    if (i >= 0 && i < depenselist.length) {
        let montant = parseFloat(depenselist[i].split(":")[1]);
        solde += montant;
        totaldepense -= montant;
        depenselist.splice(i, 1);
        
        document.getElementById("solde").textContent = solde;
        document.getElementById("total-depense").textContent = totaldepense;
        
        displayDepense();
        saveData();
    }
}
