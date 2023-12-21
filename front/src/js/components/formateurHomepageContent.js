const formationHomepageContent = `
    <section class="formationHomepageContent">
        <h1 class="title formationHomepageContent__title">Session(s)</h1>
        <div class="sessions" id="sessionsContainer"></div>
        <a class="button" href="createSessionPage.html">Créer une session</a>
    </section>
`;

const fetchSessions = async () => {
    try {
        const formateurId = sessionStorage.getItem('id');
        if (!formateurId) {
            console.error('Formateur ID not found in sessionStorage.');
            return;
        }

        const sessionsResponse = await fetch('https://cepegra-frontend.xyz/wf11-1/wp-json/wp/v2/session');
        const sessionsData = await sessionsResponse.json();

        const sessionsContainer = document.getElementById('sessionsContainer');
        let template = '';

        for (const session of sessionsData) {
            if (session.acf.session_formateur_id == formateurId) {
                template += `
                    <div class="session" id="session${session.id}">
                        <div class="info">
                            <p class="session-code">${session.acf.session_code}</p>
                            <p class="participant">${session.acf.session_candidate_number} participants</p>
                        </div>
                        <div class="evals" id="evalsContainer${session.id}"></div>
                    </div>
                `;
            }
        }

        sessionsContainer.innerHTML = template;

        return sessionsData.filter(session => session.acf.session_formateur_id == formateurId);
    } catch (error) {
        console.error('Error fetching sessions data:', error);
        throw error;
    }
};

const storeEvaluationId = (evaluationId) => {
    sessionStorage.setItem('evaluationId', evaluationId);
};

const fetchEvaluations = async (session) => {
    try {
        const evaluationResponse = await fetch(`https://cepegra-frontend.xyz/wf11-1/wp-json/wp/v2/evals?eval_id_sessions=${session.id}`);
        const evaluationData = await evaluationResponse.json();

        const evalsContainer = document.getElementById(`evalsContainer${session.id}`);

        if (evalsContainer) {
            // Filtrer les évaluations pour ne conserver que celles liées à la session actuelle
            const filteredEvaluations = evaluationData.filter(evaluation => evaluation.acf.eval_id_sessions === `${session.id}`);

            let evalsTemplate = '';

            for (const evaluation of filteredEvaluations) {
                evalsTemplate += `
                    <a href='#' class="evaluation" data-eval-id="${evaluation.id}">${evaluation.acf.eval_date}</a>
                `;
            }

            evalsContainer.innerHTML = evalsTemplate;

            // Add click event listener to each evaluation link
            const evaluationLinks = evalsContainer.querySelectorAll('.evaluation');
            evaluationLinks.forEach(link => {
                link.addEventListener('click', handleEvaluationClick);
            });
        } else {
            console.error(`Container not found for session ${session.id}`);
        }
    } catch (error) {
        console.error(`Error fetching evaluations data for session ${session.id}:`, error);
        throw error;
    }
};

const handleEvaluationClick = (event) => {
    const evaluationId = event.target.dataset.evalId;
    storeEvaluationId(evaluationId);

};

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const sessions = await fetchSessions();

        for (const session of sessions) {
            await fetchEvaluations(session);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

export default formationHomepageContent;
