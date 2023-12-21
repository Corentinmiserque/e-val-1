import displayProfil from "../components/profil";
import sessionCreate from "../components/sessionsCreate";

const createSessionPage = `
<div class="page formateur_homepage ">
<section class= "profil left">
        ${displayProfil()}
        </section>
        <section class="right">
        ${sessionCreate}
    </section>
</div>
    
`;

export default createSessionPage;





