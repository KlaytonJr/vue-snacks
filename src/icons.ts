import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Importar apenas os ícones que desejar
// import { faCheckCircle, faExclamationTriangle, faTimesCircle, faInfoCircle, faCoffee } from '@fortawesome/free-solid-svg-icons';
// library.add(faCheckCircle, faExclamationTriangle, faTimesCircle, faInfoCircle, faCoffee);

// Importa todos os ícones do conjunto sólido
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export default FontAwesomeIcon;