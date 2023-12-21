import '../styles/main.css'

import formateurHomepage from './src/js/pages/formateurHomepage';
import createSessionPage from "./src/js/pages/CreateSessionPage";
import formateurEvalPage from './src/js/pages/FormateurEvalPage';
import LoginPage from './src/js/pages/LoginPage';

const appContainer = document.querySelector('#app');

function updatePage() {
  const path = window.location.pathname;

  if (appContainer) {
    switch (path) {
      case '/':
        appContainer.innerHTML = LoginPage;
        break;

        case '/createSessionPage.html':
          appContainer.innerHTML = createSessionPage;
          break;
        
        case '/formateurEvalPage.html':
          appContainer.innerHTML = formateurEvalPage;
          break;

          case '/formateurHomepage.html':
            appContainer.innerHTML = formateurHomepage;
            break;
            

      default:
        appContainer.innerHTML = "Page non trouvée";
    }
  } else {
    console.error("Element with ID 'app' not found");
  }
}

window.addEventListener('popstate', updatePage);

updatePage();
