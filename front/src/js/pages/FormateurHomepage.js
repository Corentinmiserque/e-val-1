import formationHomepageContent from "../components/FormateurHomepageContent";
import displayProfil from "../components/profil";

const formateurHomepage = `
    <div class="page formateur_homepage ">
    <section class= "profil left">
            ${displayProfil()}
            </section>
            <section class="right">
        ${formationHomepageContent}
        </section>
    </div>
`;

export default formateurHomepage;
