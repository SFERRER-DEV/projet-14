/**
 * Remise à blanc des erreurs de validation 🧹
 * et des messages informatifs d'un champ de formulaire 🧽
 * @param {HTMLInputElement} field - Un champ du formulaire dans un parent avec la classe css `formData`
 */
const resetValidation = (field) => {
  /** @type {HTMLDivElement} */
  const formData = field.parentNode;
  if (formData === null || formData === undefined) {
    return;
  }
  if (formData.classList.contains('formData')) {
    formData.setAttribute('data-error', '');
    formData.setAttribute('data-error-visible', false);
    formData.setAttribute('data-message', '');
    formData.setAttribute('data-message-visible', false);
    field.setCustomValidity('');
  }
};

/**
 * Tester si un champ de formulaire a des erreurs de validation 👮‍♂️
 * @param {HTMLInputElement} field
 * @returns {boolean} Ce champ est-il validé ?
 */
const validateField = (field) => {
  /**
   * @type {Object}
   * @description Les états de validité de toutes les contraintes d'un champ de formulaire
   */
  const validityState = field.validity;
  resetValidation(field);
  if (!validityState.valid) {
    updateMessageValidation(field, field.validationMessage);
  }
  return validityState.valid;
};

/**
 * Marquer un champ en erreur et afficher son message d'erreur de validation
 * @param {HTMLInputElement} field - Un champ du formulaire dans un parent avec la classe css `formData`
 * @param {string} message - Texte de l'erreur de validation
 */
export const updateMessageValidation = (field, message) => {
  /** @type {HTMLDivElement} */
  const formData = field.parentNode;
  if (formData === null || formData === undefined) {
    return;
  }
  if (formData.classList.contains('formData')) {
    formData.setAttribute('data-error', message);
    formData.setAttribute('data-error-visible', true);
  }
};

/**
 * Sélectionner tous les éléments de formulaire possibles à valider
 * et se trouvant dans un élément ayant une classe "formData".
 * @param {Document} document - l'ensemble du document HTML chargé dans la fenêtre du navigateur.
 * @returns {NodeList}
 */
export const getFields = (document) => {
  return document.querySelectorAll(
    '.formData input[type="email"], .formData input[type="password"], .formData input[type="checkbox"],  .formData input[type="text"], .formData select'
  );
};

/**
 * Empêcher l'affichage des messages des infobulles de l'API HTML pour les champs dans un formulaire.
 * @param {NodeList} fields - La NodeList des éléments DOM à traiter.
 */
export const noBubbleMessage = (fields) => {
  for (let input of fields) {
    input.addEventListener('invalid', (event) => {
      event.preventDefault();
    });
  }
};

/**
 * Tester des champs du formulaire à valider
 * @param {NodeList} fields - La NodeList des éléments DOM à traiter.
 */
const checkValidity = (fields) => {
  /**
   * @type {boolean}
   * @description Est-ce que le formulaire et tous ses champs sont valides ?
   */
  let ok = true;
  // parcourir les élements du formulaire à valider
  for (let input of fields) {
    ok &= validateField(input);
  }
  return ok;
};

export default checkValidity;
