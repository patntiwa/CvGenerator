// Clé pour le stockage local
const CV_STORAGE_KEY = 'cv_data';

// Fonction pour mettre à jour les informations du CV
function updateCV(data) {
    // Informations personnelles
    document.getElementById('cvPhoto').src = data.photo || 'https://placehold.co/600x400';
    document.getElementById('cvName').textContent = `${data.nom} ${data.prenom}`;
    document.getElementById('cvTitle').textContent = data.title;
    document.getElementById('cvDescription').textContent = data.description;
    document.getElementById('cvAddress').innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + data.address;
    document.getElementById('cvEmail').innerHTML = '<i class="fas fa-envelope"></i> ' + data.email;
    document.getElementById('cvPhone').innerHTML = '<i class="fas fa-phone"></i> ' + data.phone;
    document.getElementById('cvSexe').innerHTML = '<i class="fa-solid fa-user"></i> ' + data.sexe;
    document.getElementById('cvAge').textContent = 'Âge: ' + data.age; 'Ans';
    document.getElementById('cvStatut').textContent = 'Situation actuelle: ' + data.statut;

    // Compétences
    const skillsList = document.getElementById('cvSkills');
    skillsList.innerHTML = data.competences.map(skill => `<li>${skill}</li>`).join('');

    // Expériences professionnelles
    const experiencesList = document.getElementById('cvExperiences');
    experiencesList.innerHTML = data.experiences.map(exp => `
        <div class="experience-item">
            <h4 class="item-title">${exp.poste}</h4>
            <p class="item-subtitle">${exp.entreprise} | ${exp.debut} - ${exp.fin}</p>
            <p class="item-description">${exp.description}</p>
        </div>
    `).join('');

    // Formations
    const formationsList = document.getElementById('cvFormations');
    formationsList.innerHTML = data.formations.map(formation => `
        <div class="education-item">
            <h4 class="item-title">${formation.diplome}</h4>
            <p class="item-subtitle">${formation.ecole} | ${formation.anneeDebut} - ${formation.anneeFin}</p>
        </div>
    `).join('');

    // Centres d'intérêt
    const interestsList = document.getElementById('cvInterests');
    interestsList.innerHTML = data.interets.map(interet => `<li>${interet}</li>`).join('');

    // Langues
    const languagesList = document.getElementById('cvLanguages');
    languagesList.innerHTML = data.langues.map(langue => `<li>${langue.nom} (${langue.niveau})</li>`).join('');

    // Références
    const referencesList = document.getElementById('cvReferences');
    referencesList.innerHTML = data.references.map(ref => `
        <div class="reference-item">
             <h4 class="item-title">${ref.nom}</h4>
             <p class="item-subtitle">${ref.entreprise} - ${ref.ville}</p>
             <p class="item-description"><i class="fa-solid fa-phone"></i> ${ref.telephone} | <i class="fa-solid fa-envelope"></i> ${ref.email}</p>
        </div>
    `).join('');

    // Sauvegarder les données dans le localStorage
    saveToLocalStorage(data);
}

// Fonction pour sauvegarder les données dans le localStorage
function saveToLocalStorage(data) {
    try {
        localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(data));
        console.log("Données CV enregistrées dans le stockage local ");
    } catch (error) {
        console.error("Erreur lors de l'enregistrement dans le stockage local:", error);
    }
}

// Fonction pour récupérer les données du localStorage
function loadFromLocalStorage() {
    try {
        const savedData = localStorage.getItem(CV_STORAGE_KEY);
        if (savedData) {
            return JSON.parse(savedData);
        }
    } catch (error) {
        console.error('Erreur lors du chargement depuis le stockage local:', error);
    }
    return null;
}

// Configuration des boutons
document.getElementById('downloadPDF').addEventListener('click', function () {
    const element = document.getElementById('cvDocument');
    const opt = {
        margin: 0,
        filename: 'cv.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save()
        .then(() => {
            // Restaurer le bouton
            button.innerHTML = originalText;
            button.disabled = false;
        })
        .catch(err => {
            console.error('Erreur lors de la génération du PDF:', err);
            button.innerHTML = originalText;
            button.disabled = false;
            alert('Une erreur est survenue lors de la génération du PDF.');
        });
});

document.getElementById('printCV').addEventListener('click', function () {
    window.print();
});

// Bouton de réinitialisation
document.getElementById('resetForm').addEventListener('click', function () {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser les données du CV ?')) {
        localStorage.removeItem(CV_STORAGE_KEY);
        location.reload();
    }
});

// Exemple de données (à utiliser si rien n'est trouvé dans le localStorage)
const exampleData = {
    photo: "",
    nom: "ATANGANA",
    prenom: "Jean",
    title: "Développeur Full Stack",
    description: "Passionné par le développement web et les nouvelles technologies.",
    address: "Toronto, Canada",
    email: "jean.atangana@example.com",
    sexe: "Masculin",
    age: "28 Ans",
    statut: "Celibataire",
    phone: "+1 647 123 4567",
    competences: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "GraphQL"],
    experiences: [
        {
            poste: "Développeur Full Stack",
            entreprise: "Innovatech Solutions",
            debut: "2020",
            fin: "Présent",
            description: "Conception et développement d'applications web modernes pour divers clients internationaux."
        },
        {
            poste: "Développeur Front End",
            entreprise: "Orange Digital Center",
            debut: "2015",
            fin: "2017",
            description: "Conception et développement d'applications web modernes pour divers clients internationaux."
        },
        {
            poste: "Stagiaire Développeur Web",
            entreprise: "Startup XYZ",
            debut: "2014",
            fin: "2015",
            description: "Développement de sites web et d'applications mobiles pour les clients de la startup."
        }
    ],
    formations: [
        {
            diplome: "Master en Informatique",
            ecole: "Université de Yaoundé I",
            anneeDebut: "2014",
            anneeFin: "2016"
        },
        {
            diplome: "Licence en Informatique",
            ecole: "Université de Yaoundé I",
            anneeDebut: "2011",
            anneeFin: "2014"
        }
    ],
    interets: ["Voyages", "Cuisine africaine", "Basketball"],
    langues: [
        { nom: "Français", niveau: "C2" },
        { nom: "Anglais", niveau: "C1" }
    ],
    references: [
        {
            nom: "Paul Nkem",
            entreprise: "Innovatech Solutions",
            ville: "Toronto",
            telephone: "+1 416 789 1234",
            email: "paul.nkem@innovatech.com"
        },
        {
            nom: "Alice Mvogo",
            entreprise: "Startup XYZ",
            ville: "Yaoundé",
            telephone: "+237 678 123 456",
            email: "alicemvogo@startupxyz;com",
        }
    ]
};

// Initialisation du CV
window.addEventListener('DOMContentLoaded', function () {
    // Essayer de charger les données du localStorage d'abord
    const savedData = loadFromLocalStorage();

    if (savedData) {
        // Utiliser les données sauvegardées
        updateCV(savedData);
    } else {
        // Utiliser les données d'exemple
        updateCV(exampleData);
    }
});

// Écouter les messages pour mettre à jour le CV
window.addEventListener('message', (event) => {
    if (event.data && typeof event.data === 'object') {
        updateCV(event.data);
    }
});