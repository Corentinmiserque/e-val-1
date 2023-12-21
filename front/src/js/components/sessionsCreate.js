const sessionCreate = `
<section class="sessionCreate">
  <h1 class="title sessionCreate__title">Session(s)</h1>

  <form id="sessionForm">

    <div class="field">
      <label class="label">Sélectionnez un centre</label>
      <div class="control">
        <div class="select">
          <select id="formationCenter" name="FormationCenter">
            <option value="namur">Namur</option>
            <option value="charleroi">Charleroi</option>
            <option value="liege">Liège</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Intitulé de formation</label>
      <div class="control">
        <div class="select">
          <select id="trainingTitle" name="Formationr">

          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Code de session</label>
      <div class="control">
        <input class="input" type="text" id="sessionCode" name="sessionCode" placeholder="Entrez le code de session" required>
      </div>
    </div>

    <div class="field">
      <label class="label">Date de début</label>
      <div class="control">
        <input class="input" type="date" id="startDate" name="startDate" required>
      </div>
    </div>

    <div class="field">
      <label class="label">Date de fin</label>
      <div class="control">
        <input class="input" type="date" id="endDate" name="endDate" required>
      </div>
    </div>

    <div class="field is-grouped">
    <div class="control is-expanded">
      <label class="label">Inviter par e-mail</label>
      <div class="control has-icons-left">
        <input class="input" type="email" id="inviteEmail" name="inviteEmail" placeholder="Entrez l'adresse e-mail">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
    </div>
    <div class="control">
      <button type="button" class="button is-link" id="inviteButton">Inviter</button>
    </div>
  </div>
  <div class="field">
  <div class="emails textarea"></div>
</div>

<div class="field is-grouped">
<div class="control is-expanded">
<label class="label">Date d'évaluation</label>
  <div class="control has-icons-left">
  <input class="input" type="date" id="evalDate" name="evalDate">
    <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
  </div>
</div>
<div class="control">
<button type="button" class="button is-link" id="addEvalButton">Ajouter une date d'évaluation</button>
</div>
</div>
<div class="field">
<div class="evalDates textarea"></div>
</div>



    <div class="field is-grouped">
      <div class="control">
        <button type="button" class="button is-link">Créer la session</button>
      </div>
      <div class="control">
        <a href="/formateurHomepage.html" class="button is-link is-light">Annuler</a>
      </div>
    </div>

  </form>
</section>
`;


document.addEventListener("DOMContentLoaded", async function () {
    const $trainingTitle = document.getElementById("trainingTitle");

  try {
    // Fetch the list of formations
    const formationsResponse = await fetch('https://cepegra-frontend.xyz/wf11-1/wp-json/wp/v2/formations');
    const formationsData = await formationsResponse.json();

    // Build a template using map and add the id to each option
    let template = formationsData.map(formation => `
        <option value="${formation.acf.formation_name}" id="${formation.id}">
            ${formation.acf.formation_name}
        </option>
    `).join('');

    // Append the template to the trainingTitle select element
    $trainingTitle.innerHTML = template;
} catch (error) {
    console.error('Erreur lors de la récupération des formations:', error.message);
}


    const $emails = document.querySelector(".emails");
    const $inviteEmailInput = document.getElementById("inviteEmail");
    const $inviteButton = document.querySelector("#inviteButton");
    const uniqueEmails = new Set();

    $inviteButton.addEventListener("click", function () {
        const emailValue = $inviteEmailInput.value;

        if (emailValue !== "") {
            if (!uniqueEmails.has(emailValue)) {
                uniqueEmails.add(emailValue);

                let template = "";
                for (const email of uniqueEmails) {
                    template += `<p>${email}</p>`;
                }
                $emails.innerHTML = template;

                $inviteEmailInput.value = "";
            } else {
                alert("Cette adresse e-mail est déjà dans la liste.");
            }
        }
    });

    const $evalDateInput = document.getElementById("evalDate");
    const $addEvalButton = document.querySelector("#addEvalButton");
    const $evalDates = document.querySelector(".evalDates");
    const uniqueEvalDates = new Set();

    $addEvalButton.addEventListener("click", function () {
        const evalDateValue = $evalDateInput.value;

        if (evalDateValue !== "") {
            if (!uniqueEvalDates.has(evalDateValue)) {
                uniqueEvalDates.add(evalDateValue);

                let template = "";
                for (const evalDate of uniqueEvalDates) {
                    template += `<p>${evalDate}</p>`;
                }
                $evalDates.innerHTML = template;

                $evalDateInput.value = "";
            } else {
                alert("Cette date d'évaluation est déjà dans la liste.");
            }
        }
    });

    const $submit = document.querySelector("#submit");

    if ($submit) {
        $submit.addEventListener('click', async function () {
            const sessionFormateurId = localStorage.getItem('formateurId');

            try {
                const sessionCode = document.getElementById("sessionCode").value;
                const formationCenter = document.getElementById("formationCenter").value;

                const response = await fetch('https://cepegra-frontend.xyz/wf11-1/wp-json/wp/v2/session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NlcGVncmEtZnJvbnRlbmQueHl6L3dmMTEtMSIsImlhdCI6MTcwMjk5NDI4MSwibmJmIjoxNzAyOTk0MjgxLCJleHAiOjE3MDM1OTkwODEsImRhdGEiOnsidXNlciI6eyJpZCI6IjQifX19.JAEv5SrSW338eQXPN75hhp6wiPcrOW2HvRc1us5uySQ',
                    },
                    body: JSON.stringify({
                        title: sessionCode,
                        status: "publish",
                        fields: {
                            session_name: sessionCode,
                            session_center: formationCenter,
                            session_date_start: document.getElementById("startDate").value,
                            session_date_finish: document.getElementById("endDate").value,
                            session_candidate_number: Array.from(uniqueEmails).length.toString(),
                            session_stagiaire_email: Array.from(uniqueEmails),
                            session_formateur_id: sessionFormateurId,
                            session_code: sessionCode,
                        },
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const sessionId = data.id;

                    // Create evaluations for each date
                    const evalDatesArray = Array.from(uniqueEvalDates);
                    for (const evalDate of evalDatesArray) {
                        const evalResponse = await fetch('https://cepegra-frontend.xyz/wf11-1/wp-json/wp/v2/evals', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NlcGVncmEtZnJvbnRlbmQueHl6L3dmMTEtMSIsImlhdCI6MTcwMjk5NDI4MSwibmJmIjoxNzAyOTk0MjgxLCJleHAiOjE3MDM1OTkwODEsImRhdGEiOnsidXNlciI6eyJpZCI6IjQifX19.JAEv5SrSW338eQXPN75hhp6wiPcrOW2HvRc1us5uySQ',
                            },
                            body: JSON.stringify({
                                title: evalDate,
                                status: "publish",
                                fields: {
                                    eval_date: evalDate,
                                    id_formateur: sessionFormateurId,
                                    eval_id_sessions: sessionId,
                                    eval_center: formationCenter,
                                    eval_session_code: sessionCode,
                                },
                            }),
                        });

                        if (evalResponse.ok) {
                            const evalData = await evalResponse.json();
                            console.log("Evaluation créée avec succès:", evalData);
                        } else {
                            const evalData = await evalResponse.json();
                            console.error('Erreur lors de la création de l\'évaluation:', evalData.error);
                        }
                    }

                    console.log("Session créée avec succès!");
                    window.location.href = "formateurHomepage.html";
                } else {
                    const data = await response.json();
                    console.error('Erreur lors de la création de la session:', data.error);
                }
            } catch (error) {
                console.error('Erreur:', error.message);
            }
        });
    }
});

export default sessionCreate;
