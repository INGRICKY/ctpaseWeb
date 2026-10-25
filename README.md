# Site vitrine CTPASE

Site statique responsive en français, sans dépendances à installer. Ouvrir `index.html` dans un navigateur ou servir le dossier avec un serveur HTTP local.

## Fichiers

- `index.html` : contenu et lien officiel Google Forms.
- `styles.css` : présentation et versions mobile/tablette.
- `script.js` : carousel, navigation mobile et préparation du message de contact.

## Contenu à compléter

## Aperçu et page galerie

`index.html` affiche au maximum 8 photos, triées par date d’ajout décroissante dans `gallery.js`. Les 4 photos actuellement connues du dossier sont configurées. Les images sont chargées depuis Google Drive. Les boutons « Tout voir » ouvrent `galerie.html`, qui affiche le dossier complet en direct.

Pour actualiser automatiquement la sélection des 8 photos à chaque chargement, renseigner `DRIVE_API_KEY` dans `gallery.js` avec une clé navigateur Google autorisée pour Drive API et restreinte aux domaines du site. Le dossier et ses images doivent être accessibles publiquement. Sans clé, l’aperçu utilise les 4 photos configurées ; la page galerie complète reste liée au dossier en direct. Ne jamais mettre de jeton OAuth ou de secret de compte de service dans le JavaScript public.

Ajouter les coordonnées officielles, le logo si disponible, les formations confirmées, les actualités et les témoignages autorisés. Les images Unsplash sont illustratives et ne représentent pas nécessairement CTPASE. Les polices Google Fonts et les photos nécessitent Internet ; des polices système prennent le relais hors connexion.

Le formulaire de contact envoie les champs nom, e-mail et message via FormSubmit vers laurorericky790@gmail.com. Au premier envoi, le destinataire doit confirmer son adresse via le lien de confirmation FormSubmit. Tester depuis un serveur HTTP ou HTTPS, et non une URL file://. La protection reCAPTCHA par d?faut est conserv?e. Aucun envoi r?el de test n?a ?t? effectu? pendant le d?veloppement.

Le carrousel dispose de flèches, de sélecteurs et d’un bouton pause. Il s’arrête lors de la navigation au clavier et respecte la préférence de réduction des animations.

La galerie affiche directement le dossier Google Drive `11xKu-CSBvDofo5r6G_kW1YwwZ3vGw0-V` via son affichage int?gr? en grille. Les changements du dossier sont visibles au rechargement de la galerie, sans modification du code. Pour les visiteurs sans compte autoris?, le dossier et ses photos doivent ?tre accessibles avec le lien. Le site ne modifie pas les permissions Drive. Un lien permet aussi d?ouvrir le dossier directement si le navigateur bloque l?int?gration.
