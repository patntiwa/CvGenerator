document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cvForm');

    // Fonction pour afficher les erreurs
    function showError(fieldId, message) {
        const errorElement = document.getElementById(`error-${fieldId}`);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    // Fonction pour masquer les erreurs
    function hideError(fieldId) {
        const errorElement = document.getElementById(`error-${fieldId}`);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    // Fonction pour valider un champ
    function validateField(fieldId, value, isRequired = true) {
        if (isRequired && !value.trim()) {
            showError(fieldId, 'Ce champ est obligatoire.');
            return false;
        }
        hideError(fieldId);
        return true;
    }

    // Fonction pour valider l'email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('personal-email', 'Veuillez entrer une adresse email valide.');
            return false;
        }
        hideError('personal-email');
        return true;
    }

    // Écouteurs d'événements pour les champs
    document.getElementById('input-personal-lastname').addEventListener('input', updateIframe);
    document.getElementById('input-personal-firstname').addEventListener('input', updateIframe);
    document.getElementById('input-personal-email').addEventListener('input', updateIframe);
    document.getElementById('input-personal-phone').addEventListener('input', updateIframe);
    document.getElementById('input-personal-address').addEventListener('input', updateIframe);
    document.getElementById('textarea-personal-description').addEventListener('input', updateIframe);

    // Écouteurs pour les sections dynamiques
    document.querySelectorAll('.experience-entry input, .experience-entry textarea').forEach((field) => {
        field.addEventListener('input', updateIframe);
    });

    document.querySelectorAll('.education-entry input').forEach((field) => {
        field.addEventListener('input', updateIframe);
    });

    document.querySelectorAll('.skill-entry input').forEach((field) => {
        field.addEventListener('input', updateIframe);
    });

    document.querySelectorAll('.interest-entry input').forEach((field) => {
        field.addEventListener('input', updateIframe);
    });

    document.querySelectorAll('.language-entry select').forEach((field) => {
        field.addEventListener('change', updateIframe);
    });

    document.querySelectorAll('.reference-entry input').forEach((field) => {
        field.addEventListener('input', updateIframe);
    });


    // Fonction pour récupérer les données du formulaire
    function getFormData() {
        const formData = {
            personal: {
                photo: document.getElementById('file-personal-photo').files[0],
                lastname: document.getElementById('input-personal-lastname').value,
                firstname: document.getElementById('input-personal-firstname').value,
                age: document.getElementById('input-personal-age').value,
                gender: document.getElementById('select-personal-gender').value,
                title: document.getElementById('input-personal-title').value,
                situation: document.getElementById('input-personal-situation').value,
                description: document.getElementById('textarea-personal-description').value,
                email: document.getElementById('input-personal-email').value,
                phone: document.getElementById('input-personal-phone').value,
                address: document.getElementById('input-personal-address').value,
            },
            experiences: [],
            educations: [],
            skills: [],
            interests: [],
            languages: [],
            references: [],
        };

        // Récupérer les expériences
        document.querySelectorAll('.experience-entry').forEach((entry, index) => {
            formData.experiences.push({
                jobtitle: entry.querySelector('#input-experience-jobtitle').value,
                company: entry.querySelector('#input-experience-company').value,
                startdate: entry.querySelector('#input-experience-startdate').value,
                enddate: entry.querySelector('#input-experience-enddate').value,
                description: entry.querySelector('#textarea-experience-description').value,
            });
        });

        // Récupérer les formations
        document.querySelectorAll('.education-entry').forEach((entry, index) => {
            formData.educations.push({
                degree: entry.querySelector('#input-education-degree').value,
                school: entry.querySelector('#input-education-school').value,
                startdate: entry.querySelector('#input-education-startdate').value,
                enddate: entry.querySelector('#input-education-enddate').value,
            });
        });

        // Récupérer les compétences
        document.querySelectorAll('.skill-entry').forEach((entry, index) => {
            formData.skills.push(entry.querySelector('#input-skill-name').value);
        });

        // Récupérer les centres d'intérêt
        document.querySelectorAll('.interest-entry').forEach((entry, index) => {
            formData.interests.push(entry.querySelector('#input-interest-name').value);
        });

        // Récupérer les langues
        document.querySelectorAll('.language-entry').forEach((entry, index) => {
            formData.languages.push(entry.querySelector('#select-language-name').value);
        });

        // Récupérer les références
        document.querySelectorAll('.reference-entry').forEach((entry, index) => {
            formData.references.push({
                name: entry.querySelector('#input-reference-name').value,
                company: entry.querySelector('#input-reference-company').value,
                city: entry.querySelector('#input-reference-city').value,
                phone: entry.querySelector('#input-reference-phone').value,
                email: entry.querySelector('#input-reference-email').value,
            });
        });

        return formData;
    }

    // Écouteur d'événement pour la soumission du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validation des champs obligatoires
        const isLastNameValid = validateField('personal-lastname', document.getElementById('input-personal-lastname').value);
        const isFirstNameValid = validateField('personal-firstname', document.getElementById('input-personal-firstname').value);
        const isEmailValid = validateEmail(document.getElementById('input-personal-email').value);

        let debounceTimer;
        function updateIframe() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const formData = getFormData();
                const iframe = document.querySelector('iframe');
                if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.postMessage(formData, '*');
                }
            }, 300); // Délai de 300 ms
        }
    });
});

