import Chart from 'chart.js/auto';

const formateurEvalContent = `
  <section class="formateurevalcontent">
    <!-- ... (your existing HTML) ... -->
    <form id="radarForm" class="formateurevalcontent__form">
      <div class="form__radars radars" id="radarsContainer"></div>
      <canvas id="formateur-graph" class="radarChart"></canvas>
      <button type="button" id="submit" class="form__submit">Submit</button>
    </form>
  </section>
`;



let myRadarChart;
const radarData = [];

document.addEventListener('DOMContentLoaded', async function () {
  const ctx = document.getElementById('formateur-graph');
  const radarsContainer = document.getElementById('radarsContainer');

  if (ctx) {
    try {
      await fetchData();
      initializeRadarChart();
      addSubmitEventListener();
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
});

async function fetchData() {
  const evaluationId = sessionStorage.getItem('evaluationId');
  console.log('Evaluation ID from sessionStorage:', evaluationId);

  const evalResponse = await fetch(`https://cepegra-frontend.xyz/wf11-1/wp-json/wp/v2/evals/${evaluationId}`);
  const evalData = await evalResponse.json();


  const formationId = evalData.acf.formation_id;
  const radarResponse = await fetch(`https://cepegra-frontend.xyz/wf11-1/wp-json/wp/v2/radar`);
  const allRadarList = await radarResponse.json();


  const radarList = allRadarList.filter(radar => String(radar.acf.radar_id_formation) === String(formationId));


  radarList.forEach((radar, index) => {
    radarData.push({
      title: radar.acf.radar_title,
      note: parseInt(radar.acf.radar_note),
    });

    createRadarElement(index);
  });
}

function createRadarElement(index) {
  const radarElement = document.createElement('div');
  radarElement.innerHTML = `
    <div class="radar">
      <input type="range" id="radar${index + 1}" name="radars" min="1" max="5" value="${radarData[index].note}" />
      <label for="radar${index + 1}">${radarData[index].title}</label>
    </div>
  `;
  radarsContainer.appendChild(radarElement);

  const input = radarElement.querySelector(`#radar${index + 1}`);
  if (input) {
    input.addEventListener('input', function () {
      updateRadarData(index, this.value);
      updateChart();
    });
  }
}

function updateRadarData(index, value) {
  radarData[index].note = parseInt(value);
}

function initializeRadarChart() {
  const ctx = document.getElementById('formateur-graph');
  myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: radarData.map(radar => radar.title),
      datasets: [{
        data: radarData.map(radar => radar.note),
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
}

function updateChart() {
  myRadarChart.data.labels = radarData.map(radar => radar.title);
  myRadarChart.data.datasets[0].data = radarData.map(radar => radar.note);
  myRadarChart.update();
}

function addSubmitEventListener() {
  const $submit = document.querySelector("#submit");
  if ($submit) {
    $submit.addEventListener('click', async function (event) {
      event.preventDefault();
      await handleSubmit();
      document.location.href = "/formateurHomepage.html";
    });
  }
}

async function handleSubmit() {
  const evaluationId = sessionStorage.getItem('evaluationId');
  const token = sessionStorage.getItem('token');

  if (!token) {
    console.error('Token not available');
    return;
  }

  const updateResponse = await fetch(`https://cepegra-frontend.xyz/wf11-1/wp-json/wp/v2/evals/${evaluationId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      fields: {
        formateur_graph: JSON.stringify(radarData)
      },
    }),
  });

}

export default formateurEvalContent;
