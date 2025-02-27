
// Gestion du mode plein écran pour la prévisualisation
document.getElementById('toggleFullscreen').addEventListener('click', function () {
    const previewSection = document.querySelector('.lg\\:w-\\[55\\%\\]');
    previewSection.classList.toggle('lg:w-[55%]');
    previewSection.classList.toggle('xl:w-[60%]');
    previewSection.classList.toggle('lg:w-[100%]');
    previewSection.classList.toggle('fixed');
    previewSection.classList.toggle('inset-0');
    previewSection.classList.toggle('z-50');
    
    const icon = this.querySelector('i');
    if (icon.classList.contains('fa-expand')) {
        icon.classList.remove('fa-expand');
        icon.classList.add('fa-compress');
        this.querySelector('text-node').textContent = ' Réduire';
    } else {
        icon.classList.remove('fa-compress');
        icon.classList.add('fa-expand');
        this.querySelector('text-node').textContent = ' Plein Écran';
    }
});

// Gestion de la prévisualisation sur mobile
document.getElementById('showPreview').addEventListener('click', function () {
    document.getElementById('previewModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

document.getElementById('closePreview').addEventListener('click', function () {
    document.getElementById('previewModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
});