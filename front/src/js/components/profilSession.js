  

// Fonction pour récupérer l'ID d'évaluation depuis sessionStorage
const getEvaluationIdFromSession = () => {
    const evaluationId = sessionStorage.getItem('evaluationId');
    if (!evaluationId) {
        console.error('Aucun ID d\'évaluation disponible localement.');
        return null;
    }
    return evaluationId;
};

// Fonction principale pour afficher le profil de session
const displayProfilSession = async () => {
    // Récupérer l'ID d'évaluation depuis sessionStorage
    const evaluationId = getEvaluationIdFromSession();

    // Vérifier si l'ID est disponible
    if (!evaluationId) {
        console.error('Aucun ID d\'évaluation disponible.');
        return;
    }

    // Appeler la fonction pour afficher le profil de session avec l'ID d'évaluation
    await displayProfilSessionById(evaluationId);
};

// Fonction pour afficher le profil de session en utilisant un ID d'évaluation spécifique
const displayProfilSessionById = async (evaluationId) => {
    const evaluationData = await getEvaluationData(evaluationId);
    const $profilSession = document.querySelector(".profilSession");

    let template = "";

    if (!evaluationData) {
        console.error('Aucune donnée d\'évaluation disponible.');
        return;
    }

    // Utilisez les données d'évaluation pour remplir le template
    template += `
    <section class="profil">
<header class="profil__header">
    <picture class="profil__header__picture">
        <img src="${userData.acf.picture}" alt="profil_picture" class="profil__header__picture__image">
    </picture>
    <div class="profil__header__info">
        <h1 class="title profil__header__info__name">${userData.name}</h1>
        <!-- Vous pouvez ajouter d'autres éléments ici si nécessaire -->
    </div>
    <div>
        <p class="title profil__header__info__center">centre</p>
        <h1 class="title profil__header__info__name">${evaluationData.acf.eval_formation_center}</h1>
        <p class="title profil__header__info__center">Formation</p>
        <p class="text profil__header__info__center">nom formation</p>
        <p class="title profil__header__info__center">code session</p>
        <p class="text profil__header__info__center">${evaluationData.acf.eval_session_code}</p>
        <p class="title profil__header__info__center">date evaluation</p>
        <p class="text profil__header__info__center">${evaluationData.acf.eval_date}</p>
    </div>
</header>
</section>
    `;

    $profilSession.innerHTML = template;
};

export default displayProfilSession;

// Appel de la fonction principale pour afficher le profil de session
displayProfilSession();







const displayProfil = async () => {
    const storedFormateurId = sessionStorage.getItem('id');

    if (!storedFormateurId) {
        console.error('Aucun ID de formateur disponible localement.');
        return;
    }

    const userData = await getFormateurData(storedFormateurId);
    const $profil = document.querySelector(".profil");

    let template = "";

    if (!userData) {
        console.error('Aucune donnée de formateur disponible.');
        return;
    }

   

};