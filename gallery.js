// Optional public browser API key, restricted to this site's domains and Drive API.
const DRIVE_API_KEY = '';
const DRIVE_FOLDER_ID = '11xKu-CSBvDofo5r6G_kW1YwwZ3vGw0-V';
const knownPhotos = [
  { id: '1mjiT4Wv8iO87UbXQBfL90iw5DPQSEk70', name: 'Photo CTPASE 4', createdTime: '2026-10-25T03:47:21.554Z' },
  { id: '1y4awv50y70aDrGoWItgYme-s3VpuAIiW', name: 'Photo CTPASE 1', createdTime: '2026-10-25T03:47:21.441Z' },
  { id: '1Edq4ItQ-dvZpHdtx964P3wvtkmFrxE_c', name: 'Photo CTPASE 3', createdTime: '2026-10-25T03:47:21.350Z' },
  { id: '1ZU2Gk65ObLT0ErLaE5O376ROITPc-Mx5', name: 'Photo CTPASE 2', createdTime: '2026-10-25T03:47:21.307Z' }
];
function renderRecentPhotos(photos) {
  const grid = document.querySelector('#recent-photos');
  grid.replaceChildren();
  photos.sort((a, b) => Date.parse(b.createdTime) - Date.parse(a.createdTime)).slice(0, 8).forEach(photo => {
    const link = document.createElement('a');
    link.className = 'recent-photo';
    link.href = `https://drive.google.com/file/d/${encodeURIComponent(photo.id)}/view`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Ouvrir ${photo.name} sur Google Drive`);
    const image = document.createElement('img');
    image.src = `https://drive.google.com/thumbnail?id=${encodeURIComponent(photo.id)}&sz=w640`;
    image.alt = photo.name;
    image.loading = 'lazy';
    image.referrerPolicy = 'no-referrer';
    const caption = document.createElement('span');
    caption.textContent = photo.name;
    image.addEventListener('error', () => { image.hidden = true; link.classList.add('photo-unavailable'); caption.textContent = 'Voir la photo sur Google Drive ↗'; });
    link.append(image, caption);
    grid.append(link);
  });
  document.querySelector('#recent-photo-count').textContent = photos.length ? `${Math.min(photos.length, 8)} photos récentes` : 'Aucune photo disponible pour le moment.';
}
async function loadRecentPhotos() {
  renderRecentPhotos(knownPhotos);
  if (!DRIVE_API_KEY) return;
  const params = new URLSearchParams({ key: DRIVE_API_KEY, q: `'${DRIVE_FOLDER_ID}' in parents and trashed = false and mimeType contains 'image/'`, orderBy: 'createdTime desc', pageSize: '8', fields: 'files(id,name,createdTime)' });
  try {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`);
    if (!response.ok) throw new Error('Drive unavailable');
    const data = await response.json();
    renderRecentPhotos(data.files);
  } catch {
    document.querySelector('#recent-photo-count').textContent = 'Dernières photos connues · Consultez la galerie complète pour les nouveautés.';
  }
}
loadRecentPhotos();
