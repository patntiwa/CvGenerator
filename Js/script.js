// ==========================================
// CONFIGURATION ET CONSTANTES
// ==========================================
const CONFIG = {
  STORAGE_KEY: "cvData",
  DEFAULT_PHOTO: "https://placehold.co/600x400",
  AGE_LIMITS: { MIN: 18, MAX: 65 },
  NOTIFICATION_DURATION: 3000,
};

// ==========================================
// STRUCTURE DE DONNÉES
// ==========================================
let cvData = {
  photo: CONFIG.DEFAULT_PHOTO,
  informationsPersonnelles: {
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
  },
  sections: {
    competences: [],
    experiences: [],
    formations: [],
    interets: [],
    langues: [],
    references: [],
  },
};

// ==========================================
// GESTIONNAIRE DE NOTIFICATIONS
// ==========================================
const NotificationManager = {
  show(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white`;
    notification.textContent = message;

    document.body.appendChild(notification);
    setTimeout(
      () => document.body.removeChild(notification),
      CONFIG.NOTIFICATION_DURATION
    );
  },
};

// ==========================================
// GESTIONNAIRE DE STOCKAGE
// ==========================================
const StorageManager = {
  save() {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(cvData));
  },

  load() {
    return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || "null");
  },

  clear() {
    localStorage.removeItem(CONFIG.STORAGE_KEY);
  },
};

// ==========================================
// GESTIONNAIRE DE FORMULAIRE
// ==========================================
const FormManager = {
  validateAge(age) {
    const ageInt = parseInt(age, 10);
    return ageInt >= CONFIG.AGE_LIMITS.MIN && ageInt <= CONFIG.AGE_LIMITS.MAX;
  },

  handlePersonalInfoChange() {
    // ... code existant pour la gestion des informations personnelles
  },

  resetForm() {
    // ... code existant pour la réinitialisation
  },
};

// ==========================================
// GESTIONNAIRE DES SECTIONS
// ==========================================
const SectionManager = {
  addExperience() {
    // ... code existant pour l'ajout d'expérience
  },

  addFormation() {
    // ... code existant pour l'ajout de formation
  },

  // ... autres méthodes pour chaque section
};

// ==========================================
// GESTIONNAIRE D'ÉVÉNEMENTS
// ==========================================
const EventManager = {
  init() {
    this.initializePersonalInfo();
    this.initializeSections();
    this.initializeButtons();
  },

  initializePersonalInfo() {
    // ... code pour initialiser les écouteurs d'événements des infos personnelles
  },

  initializeSections() {
    // ... code pour initialiser les écouteurs d'événements des sections
  },
};

// ==========================================
// GESTIONNAIRE D'INTERFACE
// ==========================================
const UIManager = {
  updatePreview() {
    const iframe = document.querySelector("iframe");
    iframe.contentWindow.postMessage(cvData, "*");
    StorageManager.save();
  },

  updateAllFields() {
    // ... code pour mettre à jour tous les champs
  },
};

// ==========================================
// INITIALISATION DE L'APPLICATION
// ==========================================
function initializeApp() {
  const savedData = StorageManager.load();
  if (savedData) {
    cvData = savedData;
    UIManager.updateAllFields();
  }

  EventManager.init();
  UIManager.updatePreview();
}

// Démarrage de l'application
document.addEventListener("DOMContentLoaded", initializeApp);
