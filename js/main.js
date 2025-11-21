// Mostrar modal RGPD tras 2 segundos
window.onload = () => {
    setTimeout(() => {
        document.getElementById('gdprModal').style.display = 'flex';
    }, 2000);
};

function closeGDPR() {
    document.getElementById('gdprModal').style.display = 'none';
}
