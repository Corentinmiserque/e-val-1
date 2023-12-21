async function getFormateurData() {
    try {
        const formateurId = sessionStorage.getItem('id');
        const response = await fetch(`https://cepegra-frontend.xyz/wf11-1/wp-json/wp/v2/users/${formateurId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données du formateur :', error);
        throw error;
    }
}

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

    template += `
        <div class="profil__header">
            <picture class=" image   is-square ">
                <img src="${userData.acf.picture}" alt="profil_picture" class="is-rounded" >
            </picture>
            <div class="profil__header__info">
                <h1 class="title profil__header__info__name">${userData.name}</h1>
                <p class="text profil__header__info__role">${userData.acf.role.value}</p>
                <p class="text profil__header__info__center">${userData.acf.center}</p>
            </div>
        </div>
    `;

    $profil.innerHTML = template;
};

export default displayProfil;




