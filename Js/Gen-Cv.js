let cvData = {
  photo: "https://placehold.co/600x400",
  nom: "",
  prenom: "",
  title: "",
  description: "",
  address: "",
  email: "",
  phone: "",
  sexe: "",
  age: "",
  statut: "",
  competences: [],
  experiences: [],
  formations: [],
  interets: [],
  langues: [],
  references: [],
};

// Fonction pour mettre à jour la prévisualisation du CV
function updatePreview() {
  const iframe = document.querySelector("iframe");
  iframe.contentWindow.postMessage(cvData, "*");
}

// Gestion de la photo de profil
document
  .getElementById("file-personal-photo")
  .addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        cvData.photo = event.target.result;
        updatePreview();
      };
      reader.readAsDataURL(file);
    }
  });

// Validation Âge
function validateAge(age) {
  const ageInt = parseInt(age, 10);
  return ageInt >= 18 && ageInt <= 65;
}

// Fonction pour gérer les changements dans les champs d'information personnelle
function handlePersonalInfoChange() {
  const ageValue = document.getElementById("input-personal-age").value;

  if (!validateAge(ageValue)) {
    showNotification("L'âge doit être compris entre 18 et 65 ans.", "error");
    return; // Stoppe l'exécution si l'âge est invalide
  }
  cvData.nom = document.getElementById("input-personal-lastname").value;
  cvData.prenom = document.getElementById("input-personal-firstname").value;
  cvData.title = document.getElementById("input-personal-title").value;
  cvData.description = document.getElementById(
    "textarea-personal-description"
  ).value;
  cvData.address = document.getElementById("input-personal-address").value;
  cvData.email = document.getElementById("input-personal-email").value;
  cvData.phone = document.getElementById("input-personal-phone").value;
  cvData.sexe = document.getElementById("select-personal-gender").value;
  cvData.age = ageValue;
  cvData.languageInput = document.getElementById("input-language").value;
  cvDatalanguageLevelSelect = document.querySelector(
    'select[name="select-level-language"]'
  ).value;

  cvData.statut = document.getElementById("input-personal-situation").value;

  updatePreview();
}

// Ajouter des écouteurs d'événements pour les champs d'information personnelle
document
  .getElementById("infopersonnel")
  .querySelectorAll("input, textarea")
  .forEach((input) => {
    input.addEventListener("input", handlePersonalInfoChange);
  });

// Fonction pour ajouter une expérience professionnelle
document
  .getElementById("button-add-experiencee")
  .addEventListener("click", function () {
    const poste = document.getElementById("input-experience-jobtitle").value;
    const entreprise = document.getElementById(
      "input-experience-company"
    ).value;
    const debut = document.getElementById("input-experience-startdate").value;
    const fin = document.getElementById("input-experience-enddate").value;
    const description = document.getElementById(
      "textarea-experience-description"
    ).value;

    if (poste && entreprise) {
      // Formatage des dates pour affichage
      const debutFormatted = new Date(debut).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "short",
      });
      const finFormatted = fin
        ? new Date(fin).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "short",
          })
        : "Présent";

      cvData.experiences.push({
        poste: poste,
        entreprise: entreprise,
        debut: debutFormatted,
        fin: finFormatted,
        description: description,
      });

      // Création d'un élément visuel pour l'expérience ajoutée
      const experienceList = document.createElement("div");
      experienceList.className = "mt-2 p-2 bg-blue-50 rounded-md";
      experienceList.innerHTML = `
              <div class="flex justify-between">
                  <div>
                      <strong>${poste}</strong> - ${entreprise}
                  </div>
                  <button class="delete-experience text-red-500 hover:text-red-700" data-index="${
                    cvData.experiences.length - 1
                  }">
                      <i class="fas fa-trash"></i>
                  </button>
              </div>
              <div class="text-sm text-gray-600">${debutFormatted} - ${finFormatted}</div>
          `;

      document.getElementById("experience-section").appendChild(experienceList);

      // Réinitialiser les champs
      document.getElementById("input-experience-jobtitle").value = "";
      document.getElementById("input-experience-company").value = "";
      document.getElementById("input-experience-startdate").value = "";
      document.getElementById("input-experience-enddate").value = "";
      document.getElementById("textarea-experience-description").value = "";

      // Notification de succès
      showNotification("Expérience ajoutée avec succès!");

      updatePreview();
    } else {
      alert("Veuillez remplir au moins le poste et l'entreprise.");
      // Notification de succès
      showNotification(
        "Veuillez remplir au moins le poste et l'entreprise.",
        "error"
      );
    }
  });

// Fonction pour ajouter une formation
document
  .getElementById("button-add-education")
  .addEventListener("click", function () {
    const diplome = document.querySelector(
      '[name="input-education-degree"]'
    ).value;
    const ecole = document.querySelector(
      '[name="input-education-school"]'
    ).value;
    const debut = document.querySelector(
      '[name="input-education-startdate"]'
    ).value;
    const fin = document.querySelector(
      '[name="input-education-enddate"]'
    ).value;

    if (diplome && ecole) {
      // Formatage des dates pour affichage
      const anneeDebut = new Date(debut).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "short",
      });
      const anneeFin = fin
        ? new Date(fin).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "short",
          })
        : "Présent";

      cvData.formations.push({
        diplome: diplome,
        ecole: ecole,
        anneeDebut: anneeDebut,
        anneeFin: anneeFin,
      });

      // Création d'un élément visuel pour la formation ajoutée
      const formationList = document.createElement("div");
      formationList.className = "mt-2 p-2 bg-blue-50 rounded-md";
      formationList.innerHTML = `
              <div class="flex justify-between">
                  <div>
                      <strong>${diplome}</strong> - ${ecole}
                  </div>
                  <button class="delete-formation text-red-500 hover:text-red-700" data-index="${
                    cvData.formations.length - 1
                  }">
                      <i class="fas fa-trash"></i>
                  </button>
              </div>
              <div class="text-sm text-gray-600">${anneeDebut} - ${anneeFin}</div>
          `;

      document.getElementById("education-section").appendChild(formationList);

      // Réinitialiser les champs
      document.querySelector('[name="input-education-degree"]').value = "";
      document.querySelector('[name="input-education-school"]').value = "";
      document.querySelector('[name="input-education-startdate"]').value = "";
      document.querySelector('[name="input-education-enddate"]').value = "";

      showNotification("Formation ajoutée avec succès!");

      updatePreview();
    } else {
      showNotification("Veuillez remplir les champs obligatoires", "error");
      alert("Veuillez remplir au moins le diplôme et l'école.");
    }
  });

// Fonction pour ajouter une compétence
document
  .getElementById("button-add-skill")
  .addEventListener("click", function () {
    const skill = document.querySelector('[name="input-skill-name"]').value;

    if (skill) {
      cvData.competences.push(skill);

      // Création d'un élément visuel pour la compétence ajoutée
      const skillList = document.createElement("div");
      skillList.className =
        "mt-2 p-2 bg-blue-50 rounded-md flex justify-between";
      skillList.innerHTML = `
              <span>${skill}</span>
              <button class="delete-skill text-red-500 hover:text-red-700" data-index="${
                cvData.competences.length - 1
              }">
                <i class="fas fa-trash"></i>
                <i class="fa-solid fa-pen-to-square"></i>
          `;

      document.getElementById("skill-section").appendChild(skillList);

      // Réinitialiser le champ
      document.querySelector('[name="input-skill-name"]').value = "";

      showNotification("Compétence ajoutée avec succès!");

      updatePreview();
    } else {
      showNotification("Veuillez entrer une compétence", "error");
    }
  });

// Fonction pour ajouter un centre d'intérêt
document
  .getElementById("button-add-interest")
  .addEventListener("click", function () {
    const interest = document.querySelector(
      '[name="input-interest-name"]'
    ).value;

    if (interest) {
      cvData.interets.push(interest);

      // Création d'un élément visuel pour l'intérêt ajouté
      const interestList = document.createElement("div");
      interestList.className =
        "mt-2 p-2 bg-blue-50 rounded-md flex justify-between";
      interestList.innerHTML = `
              <span>${interest}</span>
              <button class="delete-interest text-red-500 hover:text-red-700" data-index="${
                cvData.interets.length - 1
              }">
                  <i class="fas fa-trash"></i>
              </button>
          `;

      document.getElementById("interest-section").appendChild(interestList);

      // Réinitialiser le champ
      document.querySelector('[name="input-interest-name"]').value = "";

      updatePreview();
      showNotification("centre d'intérêt ajouté.");
    } else {
      showNotification("Veuillez entrer un centre d'intérêt.", "error");
    }
  });

// Fonction pour ajouter une référence
document
  .getElementById("button-add-reference")
  .addEventListener("click", function () {
    const nom = document.getElementById("input-reference-name").value;
    const entreprise = document.getElementById("input-reference-company").value;
    const ville = document.getElementById("input-reference-city").value;
    const telephone = document.getElementById("input-reference-phone").value;
    const email = document.getElementById("input-reference-email").value;

    if (nom && entreprise) {
      cvData.references.push({
        nom: nom,
        entreprise: entreprise,
        ville: ville,
        telephone: telephone,
        email: email,
      });

      // Création d'un élément visuel pour la référence ajoutée
      const referenceList = document.createElement("div");
      referenceList.className = "mt-2 p-2 bg-blue-50 rounded-md";
      referenceList.innerHTML = `
              <div class="flex justify-between">
                  <div>
                      <strong>${nom}</strong> - ${entreprise}, ${ville}
                  </div>
                  <button class="delete-reference text-red-500 hover:text-red-700" data-index="${
                    cvData.references.length - 1
                  }">
                      <i class="fas fa-trash"></i>
                      <i class="fa-solid fa-pen-to-square"></i>
                  </button>
              </div>
              <div class="text-sm text-gray-600">${telephone} | ${email}</div>
          `;

      document.getElementById("reference-section").appendChild(referenceList);

      // Réinitialiser les champs
      document.getElementById("input-reference-name").value = "";
      document.getElementById("input-reference-company").value = "";
      document.getElementById("input-reference-city").value = "";
      document.getElementById("input-reference-phone").value = "";
      document.getElementById("input-reference-email").value = "";

      showNotification("Référence ajoutée avec succès!");
      updatePreview();
    } else {
      showNotification("Veuillez remplir les champs obligatoires", "error");
    }
  });

// Fonction pour ajouter une langue
document
  .getElementById("button-add-language")
  .addEventListener("click", function () {
    const langue = document.getElementById("input-language").value;
    const niveau = document.querySelector(
      '[name="select-level-language"]'
    ).value;

    if (langue && niveau) {
      cvData.langues.push({ nom: langue, niveau: niveau });

      // Création d'un élément visuel pour la langue ajoutée
      const languageList = document.createElement("div");
      languageList.className =
        "mt-2 p-2 bg-blue-50 rounded-md flex justify-between";
      languageList.innerHTML = `
              <span>${langue} (${niveau})</span>
              <div>
                  <button class="modify-language text-orange-500 hover:text-orange-700" data-index="${
                    cvData.langues.length - 1
                  }">
                      <i class="fas fa-edit"></i>
                  </button>
                  <button class="delete-language text-red-500 hover:text-red-700" data-index="${
                    cvData.langues.length - 1
                  }">
                      <i class="fas fa-trash"></i>
                  </button>
              </div>
          `;

      document.getElementById("language-section").appendChild(languageList);

      // Réinitialiser les champs
      document.getElementById("input-language").value = "";
      document.querySelector('[name="select-level-language"]').value = "";

      showNotification("Langue ajoutée avec succès!");
      updatePreview();
    } else {
      showNotification(
        "Veuillez sélectionner une langue et un niveau",
        "error"
      );
    }
  });
// Fonction pour afficher une notification
function showNotification(message, type = "success") {
  // Créer l'élément de notification
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-all duration-500 ease-in-out ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  } text-white font-semibold`;
  notification.textContent = message;

  // Ajouter au DOM
  document.body.appendChild(notification);

  // Animation d'entrée
  setTimeout(() => {
    notification.classList.add("translate-y-2");
  }, 10);

  // Supprimer après un délai
  setTimeout(() => {
    notification.classList.remove("translate-y-2");
    notification.classList.add("-translate-y-full", "opacity-0");

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}

// Gestion de la suppression d'éléments
document.body.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("delete-skill") ||
    e.target.parentElement.classList.contains("delete-skill")
  ) {
    const button = e.target.classList.contains("delete-skill")
      ? e.target
      : e.target.parentElement;
    const index = button.dataset.index;
    cvData.competences.splice(index, 1);
    button.closest("div").remove();
    updatePreview();
  } else if (
    e.target.classList.contains("delete-experience") ||
    e.target.parentElement.classList.contains("delete-experience")
  ) {
    const button = e.target.classList.contains("delete-experience")
      ? e.target
      : e.target.parentElement;
    const index = button.dataset.index;
    cvData.experiences.splice(index, 1);
    button.closest("div.mt-2").remove();
    updatePreview();
  } else if (
    e.target.classList.contains("delete-formation") ||
    e.target.parentElement.classList.contains("delete-formation")
  ) {
    const button = e.target.classList.contains("delete-formation")
      ? e.target
      : e.target.parentElement;
    const index = button.dataset.index;
    cvData.formations.splice(index, 1);
    button.closest("div.mt-2").remove();
    updatePreview();
  } else if (
    e.target.classList.contains("delete-interest") ||
    e.target.parentElement.classList.contains("delete-interest")
  ) {
    const button = e.target.classList.contains("delete-interest")
      ? e.target
      : e.target.parentElement;
    const index = button.dataset.index;
    cvData.interets.splice(index, 1);
    button.closest("div.mt-2").remove();
    updatePreview();
  } else if (
    e.target.classList.contains("delete-language") ||
    e.target.parentElement.classList.contains("delete-language")
  ) {
    const button = e.target.classList.contains("delete-language")
      ? e.target
      : e.target.parentElement;
    const index = button.dataset.index;
    cvData.langues.splice(index, 1);
    button.closest("div.mt-2").remove();
    updatePreview();
  } else if (
    e.target.classList.contains("delete-reference") ||
    e.target.parentElement.classList.contains("delete-reference")
  ) {
    const button = e.target.classList.contains("delete-reference")
      ? e.target
      : e.target.parentElement;
    const index = button.dataset.index;
    cvData.references.splice(index, 1);
    button.closest("div.mt-2").remove();
    updatePreview();
  }
});

// Fonction pour le localStorage : Sauvegarde et Récupération

// Fonction pour sauvegarder les données dans le localStorage
function saveDataToLocalStorage() {
  localStorage.setItem("cvData", JSON.stringify(cvData));
}

// Fonction pour charger les données depuis le localStorage
function loadDataFromLocalStorage() {
  const savedData = localStorage.getItem("cvData");
  if (savedData) {
    cvData = JSON.parse(savedData);
    updateFormFields();
    updatePreview();
  }
}

// Fonction pour mettre à jour les champs du formulaire avec les données chargées
function updateFormFields() {
  document.getElementById("input-personal-lastname").value = cvData.nom;
  document.getElementById("input-personal-firstname").value = cvData.prenom;
  document.getElementById("input-personal-title").value = cvData.title;
  document.getElementById("textarea-personal-description").value =
    cvData.description;
  document.getElementById("input-personal-address").value = cvData.address;
  document.getElementById("input-personal-email").value = cvData.email;
  document.getElementById("input-personal-phone").value = cvData.phone;
  document.getElementById("input-personal-phone").value = cvData.sexe;
  document.getElementById("input-personal-phone").value = cvData.age;

  // Mettre à jour les autres sections (compétences, expériences, formations, etc.)
  //fonctions similaires pour chaque section
  updateExperienceFields();
  updateEducationFields();
  updateSkillFields();
  updateInterestFields();
  updateReferenceFields();
  updateLanguageFields();
}

// Appeler la fonction de sauvegarde après chaque mise à jour
function updatePreview() {
  const iframe = document.querySelector("iframe");
  iframe.contentWindow.postMessage(cvData, "*");
  saveDataToLocalStorage(); // Sauvegarder les données après chaque mise à jour
}

// Charger les données depuis le localStorage lors du chargement de la page
window.addEventListener("load", function () {
  loadDataFromLocalStorage();
  setTimeout(updatePreview, 1000);
});

// Ajouter les fonctions pour mettre à jour les champs dupliqués
function updateExperienceFields() {
  cvData.experiences.forEach((experience, index) => {
    const experienceList = document.createElement("div");
    experienceList.className = "mt-2 p-2 bg-blue-50 rounded-md";
    experienceList.innerHTML = `
        <div class="flex justify-between">
          <div>
            <strong>${experience.poste}</strong> - ${experience.entreprise}
          </div>
          <button class="delete-experience text-red-500 hover:text-red-700" data-index="${index}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <div class="text-sm text-gray-600">${experience.debut} - ${experience.fin}</div>
      `;
    document.getElementById("experience-section").appendChild(experienceList);
  });
}

function updateEducationFields() {
  cvData.formations.forEach((formation, index) => {
    const formationList = document.createElement("div");
    formationList.className = "mt-2 p-2 bg-blue-50 rounded-md";
    formationList.innerHTML = `
        <div class="flex justify-between">
          <div>
            <strong>${formation.diplome}</strong> - ${formation.ecole}
          </div>
          <button class="delete-formation text-red-500 hover:text-red-700" data-index="${index}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <div class="text-sm text-gray-600">${formation.anneeDebut} - ${formation.anneeFin}</div>
      `;
    document.getElementById("education-section").appendChild(formationList);
  });
}

function updateSkillFields() {
  cvData.competences.forEach((skill, index) => {
    const skillList = document.createElement("div");
    skillList.className = "mt-2 p-2 bg-blue-50 rounded-md flex justify-between";
    skillList.innerHTML = `
        <span>${skill}</span>
        <button class="delete-skill text-red-500 hover:text-red-700" data-index="${index}">
          <i class="fas fa-trash"></i>
        </button>
      `;
    document.getElementById("skill-section").appendChild(skillList);
  });
}

function updateInterestFields() {
  cvData.interets.forEach((interest, index) => {
    const interestList = document.createElement("div");
    interestList.className =
      "mt-2 p-2 bg-blue-50 rounded-md flex justify-between";
    interestList.innerHTML = `
        <span>${interest}</span>
        <button class="delete-interest text-red-500 hover:text-red-700" data-index="${index}">
          <i class="fas fa-trash"></i>
        </button>
      `;
    document.getElementById("interest-section").appendChild(interestList);
  });
}

function updateReferenceFields() {
  cvData.references.forEach((reference, index) => {
    const referenceList = document.createElement("div");
    referenceList.className = "mt-2 p-2 bg-blue-50 rounded-md";
    referenceList.innerHTML = `
        <div class="flex justify-between">
          <div>
            <strong>${reference.nom}</strong> - ${reference.entreprise}, ${reference.ville}
          </div>
          <button class="delete-reference text-red-500 hover:text-red-700" data-index="${index}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <div class="text-sm text-gray-600">${reference.telephone} | ${reference.email}</div>
      `;
    document.getElementById("reference-section").appendChild(referenceList);
  });
}

function updateLanguageFields() {
  cvData.langues.forEach((langue, index) => {
    const languageList = document.createElement("div");
    languageList.className =
      "mt-2 p-2 bg-blue-50 rounded-md flex justify-between";
    languageList.innerHTML = `
        <span>${langue}</span>
        <button class="delete-language text-red-500 hover:text-red-700" data-index="${index}">
          <i class="fas fa-trash"></i>
        </button>
      `;
    document.getElementById("language-section").appendChild(languageList);
  });
}

// Bouton pour mettre à jour le CV
document.getElementById("updateForm")?.addEventListener("click", function () {
  updatePreview();
});

// Bouton pour réinitialiser le formulaire
document.getElementById("resetForm")?.addEventListener("click", function () {
  if (
    confirm(
      "Êtes-vous sûr de vouloir réinitialiser le formulaire ? Toutes les données seront perdues."
    )
  ) {
    document.getElementById("cvForm").reset();
    showNotification("Formulaire réinitialisé avec succès!");
    // Réinitialiser les données
    cvData = {
      photo: "https://placehold.co/600x400",
      nom: "",
      prenom: "",
      title: "",
      description: "",
      address: "",
      email: "",
      phone: "",
      sexe: "",
      age: "",
      statut: "",
      competences: [],
      experiences: [],
      formations: [],
      interets: [],
      langues: [],
      references: [],
    };

    // Supprimer tous les éléments ajoutés
    document
      .querySelectorAll(".mt-2.p-2.bg-blue-50")
      .forEach((el) => el.remove());

    updatePreview();
  }
});

// Télécharger le PDF
document.getElementById("downloadPDF")?.addEventListener("click", function () {
  const iframe = document.querySelector("iframe");
  iframe.contentWindow.postMessage("downloadPDF", "*");
});

// Initialisation
window.addEventListener("load", function () {
  // Attendre que l'iframe soit chargée
  setTimeout(updatePreview, 1000);
});
