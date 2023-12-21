import Chart from 'chart.js/auto';

const formateurEvalContent =  `
<section class="formateurevalcontent">
    <div class="formateurevalcontent__profile">
        <picture class="profile__picture">
            <img src="#" alt="profil_picture" class="picture__image">
        </picture>
        <h1 class="profile__name title">firstname + lastname</h1>
        <div class="profile__graph student-graph"></div>
    </div>

    <form id="radarForm" class="formateurevalcontent__form">

        <div class="form__radars radars">
            <div class="radar">
                <input type="range" id="radar1" name="radars" min="1" max="5" value="1" />
                <label for="radar1">Radar 1</label>
            </div>
            <div class="radar">
                <input type="range" id="radar2" name="radars" min="1" max="5" value="1" />
                <label for="radar2">Radar 2</label>
            </div>
            <div class="radar">
                <input type="range" id="radar3" name="radars" min="1" max="5" value="1" />
                <label for="radar3">Radar 3</label>
            </div>
            <div class="radar">
                <input type="range" id="radar4" name="radars" min="1" max="5" value="1" />
                <label for="radar4">Radar 4</label>
            </div>
            <div class="radar">
                <input type="range" id="radar5" name="radars" min="1" max="5" value="1" />
                <label for="radar5">Radar 5</label>
            </div>
            <canvas id="formateur-graph" class="radarChart"></canvas>
        </div>

        <button type="button" id="submit" class="form__submit">Submit</button>
    </form>
</section>

`;



let myRadarChart;
const radarData = [1, 1, 1, 1, 1];

document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('formateur-graph');

    if (ctx) {
        myRadarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
                datasets: [{
                    data: radarData,
                    label: 'Radar Chart',
                    borderColor: 'rgb(75, 192, 192)',
                    fill: true,
                }]
            },
            options: {
                scales: {
                    r: {
                        suggestedMin: 0,
                        suggestedMax: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });

        for (let i = 1; i <= 5; i++) {
            const input = document.getElementById(`radar${i}`);
            if (input) {
                input.addEventListener('input', function () {
                    updateRadarChart(i, this.value);
                });
            }
        }

        const $submit = document.querySelector("#submit");
        console.log($submit);

        if ($submit) {
            $submit.addEventListener('click', function (event) {
                event.preventDefault();
                // Sauvegarder les données radar dans le localStorage lors du clic sur le bouton "Submit"
                localStorage.setItem('radarData', JSON.stringify(radarData));
                document.location.href = "/formateurHomepage.html";
            });
        }

        // Charger les données radar depuis le localStorage lors du chargement de la page
        const storedRadarData = localStorage.getItem('radarData');
        if (storedRadarData) {
            const parsedRadarData = JSON.parse(storedRadarData);
            radarData.splice(0, radarData.length, ...parsedRadarData);
            updateChart();
        }
    }
});

function updateRadarChart(index, value) {
    radarData[index - 1] = value;
    updateChart();
}

function updateChart() {
    myRadarChart.data.datasets[0].data = radarData;
    myRadarChart.update();
}

export default formateurEvalContent;