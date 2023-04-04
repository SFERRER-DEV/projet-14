import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';
import Modal from '../Dialog';

function Tab1Content({ activeTab, setActiveTab }) {
  /**
   * État d'ouverture de la fenêtre modale, avec une fonction pour mettre à jour l'état.
   * @typedef {boolean} open - Fermée par défaut ou ouverte.
   * @typedef {function} setOpen - Une fonction pour mettre à jour l'état d'ouverture.
   */
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <h2>New Employee</h2>
      <Modal
        open={open}
        setOpen={setOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Form open={open} setOpen={setOpen} />
    </React.Fragment>
  );
}

Tab1Content.defaultProps = {
  activeTab: 1,
};

Tab1Content.propTypes = {
  activeTab: PropTypes.number,
  setActiveTab: PropTypes.func.isRequired,
};

export default Tab1Content;
