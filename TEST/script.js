// Description: Script pour la page de création de CV

document.addEventListener('DOMContentLoaded', function() {
    // Ajouter une expérience
    document.getElementById('addExperience').addEventListener('click', function() {
        const experienceTemplate = document.querySelector('.experience-entry').cloneNode(true);
        experienceTemplate.querySelectorAll('input, textarea').forEach(input => input.value = '');
        document.getElementById('experiences').appendChild(experienceTemplate);
    });
    
    // Ajouter une formation
    document.getElementById('addFormation').addEventListener('click', function() {
        const formationTemplate = document.querySelector('.formation-entry').cloneNode(true);
        formationTemplate.querySelectorAll('input').forEach(input => input.value = '');
        document.getElementById('formations').appendChild(formationTemplate);
    });
    
    // Mise à jour de la prévisualisation en temps réel
    document.getElementById('cvForm').addEventListener('input', updatePreview);
    
    function updatePreview() {
        // Mise à jour des informations personnelles
        const nom = document.querySelector('input[name="nom"]').value;
        const prenom = document.querySelector('input[name="prenom"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const telephone = document.querySelector('input[name="telephone"]').value;
        
        document.getElementById('preview-name').textContent = `${prenom} ${nom}`;
        document.getElementById('preview-contact').textContent = `${email} | ${telephone}`;
        
        // Mise à jour des expériences
        const previewExperiences = document.getElementById('preview-experiences');
        previewExperiences.innerHTML = '';
        document.querySelectorAll('.experience-entry').forEach(entry => {
            const poste = entry.querySelector('input[name="poste[]"]').value;
            const entreprise = entry.querySelector('input[name="entreprise[]"]').value;
            const periode = entry.querySelector('input[name="periode[]"]').value;
            const description = entry.querySelector('textarea[name="description[]"]').value;
            
            if (poste || entreprise || periode || description) {
                const experienceDiv = document.createElement('div');
                experienceDiv.className = 'mb-4';
                experienceDiv.innerHTML = `
                    <h4 class="font-medium">${poste}</h4>
                    <p class="text-gray-600">${entreprise} - ${periode}</p>
                    <p class="mt-1">${description}</p>
                `;
                previewExperiences.appendChild(experienceDiv);
            }
        });
        
        // Mise à jour des formations
        const previewFormations = document.getElementById('preview-formations');
        previewFormations.innerHTML = '';
        document.querySelectorAll('.formation-entry').forEach(entry => {
            const diplome = entry.querySelector('input[name="diplome[]"]').value;
            const ecole = entry.querySelector('input[name="ecole[]"]').value;
            const annee = entry.querySelector('input[name="annee[]"]').value;
            
            if (diplome || ecole || annee) {
                const formationDiv = document.createElement('div');
                formationDiv.className = 'mb-4';
                formationDiv.innerHTML = `
                    <h4 class="font-medium">${diplome}</h4>
                    <p class="text-gray-600">${ecole} - ${annee}</p>
                `;
                previewFormations.appendChild(formationDiv);
            }
        });
    }
    
    // Empêcher la soumission du formulaire
    document.getElementById('cvForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Ici vous pouvez ajouter la logique pour sauvegarder ou exporter le CV
    });
});

//Sauvegarde en pdf 

document.getElementById('downloadPDF').addEventListener('click', function() {
    // Configuration pour html2pdf
    const element = document.getElementById('preview');
    const opt = {
        margin: 1,
        filename: 'mon-cv.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    // Message de chargement
    const button = this;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Génération en cours...';
    button.disabled = true;
    
    // Générer le PDF
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
