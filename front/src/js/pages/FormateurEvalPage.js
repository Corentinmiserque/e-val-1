
import displayProfilSession from "../components/profilSession";
import formateurEvalContent from "../components/formateurEvalContent";

const  formateurEvalPage = `
<div class="page formateur_evalpage ">
<section class= "left">
        ${displayProfilSession()}
        </section>
        <section class="right">
        ${formateurEvalContent}
    </section>
</div>
    `;

export default formateurEvalPage;



