// ==========================================
// CONFIGURATION
// ==========================================
const CONFIG = {
  STORAGE_KEY: "cv_data",
  DEFAULT_PHOTO: "https://placehold.co/600x400",
  PDF_OPTIONS: {
    margin: 0,
    filename: "cv.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  },
};

// ==========================================
// GESTIONNAIRE DE STOCKAGE
// ==========================================
const StorageManager = {
  save(data) {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data));
      console.log("Données CV enregistrées dans le stockage local");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
    }
  },

  load() {
    try {
      const savedData = localStorage.getItem(CONFIG.STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
      return null;
    }
  },

  clear() {
    localStorage.removeItem(CONFIG.STORAGE_KEY);
  },
};

// ==========================================
// GESTIONNAIRE D'INTERFACE
// ==========================================
const UIManager = {
  updatePersonalInfo(data) {
    document.getElementById("cvPhoto").src = data.photo || CONFIG.DEFAULT_PHOTO;
    document.getElementById(
      "cvName"
    ).textContent = `${data.nom} ${data.prenom}`;
    document.getElementById("cvTitle").textContent = data.title;
    // ... autres mises à jour d'informations personnelles
  },

  updateSkills(skills) {
    const skillsList = document.getElementById("cvSkills");
    skillsList.innerHTML = skills.map((skill) => `<li>${skill}</li>`).join("");
  },

  updateExperiences(experiences) {
    const experiencesList = document.getElementById("cvExperiences");
    experiencesList.innerHTML = experiences
      .map(
        (exp) => `
            <div class="experience-item">
                <h4 class="item-title">${exp.poste}</h4>
                <p class="item-subtitle">${exp.entreprise} | ${exp.debut} - ${exp.fin}</p>
                <p class="item-description">${exp.description}</p>
            </div>
        `
      )
      .join("");
  },

  // ... autres méthodes de mise à jour des sections

  updateAll(data) {
    this.updatePersonalInfo(data);
    this.updateSkills(data.competences);
    this.updateExperiences(data.experiences);
    // ... appel des autres méthodes de mise à jour
    StorageManager.save(data);
  },
};

// ==========================================
// GESTIONNAIRE DE PDF
// ==========================================
const PDFManager = {
  generate() {
    const element = document.getElementById("cvDocument");
    return html2pdf().set(CONFIG.PDF_OPTIONS).from(element).save();
  },
};

// ==========================================
// GESTIONNAIRE D'ÉVÉNEMENTS
// ==========================================
const EventManager = {
  init() {
    document.getElementById("downloadPDF").addEventListener("click", () => {
      PDFManager.generate().catch((err) => {
        console.error("Erreur PDF:", err);
        alert("Erreur lors de la génération du PDF.");
      });
    });

    document.getElementById("printCV").addEventListener("click", () => {
      window.print();
    });

    document.getElementById("resetForm").addEventListener("click", () => {
      if (confirm("Réinitialiser les données du CV ?")) {
        StorageManager.clear();
        location.reload();
      }
    });

    window.addEventListener("message", (event) => {
      if (event.data && typeof event.data === "object") {
        UIManager.updateAll(event.data);
      }
    });
  },
};

// ==========================================
// DONNÉES D'EXEMPLE
// ==========================================
const exampleData = {
  photo: "",
  nom: "ATANGANA",
  prenom: "Jean",
  title: "Développeur Full Stack",
  description:
    "Passionné par le développement web et les nouvelles technologies.",
  address: "Toronto, Canada",
  email: "jean.atangana@example.com",
  sexe: "Masculin",
  age: "28 Ans",
  statut: "Celibataire",
  phone: "+1 647 123 4567",
  competences: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "GraphQL",
  ],
  experiences: [
    {
      poste: "Développeur Full Stack",
      entreprise: "Innovatech Solutions",
      debut: "2020",
      fin: "Présent",
      description:
        "Conception et développement d'applications web modernes pour divers clients internationaux.",
    },
    {
      poste: "Développeur Front End",
      entreprise: "Orange Digital Center",
      debut: "2015",
      fin: "2017",
      description:
        "Conception et développement d'applications web modernes pour divers clients internationaux.",
    },
    {
      poste: "Stagiaire Développeur Web",
      entreprise: "Startup XYZ",
      debut: "2014",
      fin: "2015",
      description:
        "Développement de sites web et d'applications mobiles pour les clients de la startup.",
    },
  ],
  formations: [
    {
      diplome: "Master en Informatique",
      ecole: "Université de Yaoundé I",
      anneeDebut: "2014",
      anneeFin: "2016",
    },
    {
      diplome: "Licence en Informatique",
      ecole: "Université de Yaoundé I",
      anneeDebut: "2011",
      anneeFin: "2014",
    },
  ],
  interets: ["Voyages", "Cuisine africaine", "Basketball"],
  langues: [
    { nom: "Français", niveau: "C2" },
    { nom: "Anglais", niveau: "C1" },
  ],
  references: [
    {
      nom: "Paul Nkem",
      entreprise: "Innovatech Solutions",
      ville: "Toronto",
      telephone: "+1 416 789 1234",
      email: "paul.nkem@innovatech.com",
    },
    {
      nom: "Alice Mvogo",
      entreprise: "Startup XYZ",
      ville: "Yaoundé",
      telephone: "+237 678 123 456",
      email: "alicemvogo@startupxyz;com",
    },
  ],
};

// ==========================================
// INITIALISATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const savedData = StorageManager.load();
  UIManager.updateAll(savedData || exampleData);
  EventManager.init();
});
