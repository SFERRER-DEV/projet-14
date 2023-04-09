import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EmployeesContext } from '../../utils/context';
import dayjs from 'dayjs';

function FormDialog({ open, setOpen, activeTab, setActiveTab }) {
  const handleClose = () => {
    const updateFormData = { ...formData.user };
    updateFormData.firstname = '';
    updateFormData.lastname = '';
    updateFormData.birthDate = '';
    updateFormData.street = '';
    updateFormData.city = '';
    updateFormData.federal = '';
    updateFormData.zipcode = '';
    updateFormData.department = 0;
    updateFormData.startDate = dayjs(new Date()).format('DD/MM/YYYY');
    setFormData({ ...formData, user: updateFormData });
    setOpen(false);
  };

  const handleView = () => {
    handleClose();
    setActiveTab(2);
  };
  /**
   * Déclare une variable d'état formData' pour contenant l'utilisateur créé et une fonction de mise à jour 'setFormData'
   * @typedef {Object} formData - Cette variable de State contient un utilisateur.
   * @typedef {Function} setFormData - Cette fonction met à jour le State local
   */
  const { formData, setFormData, department } = useContext(EmployeesContext);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New employee created</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {formData.user.firstname} {formData.user.lastname}
            <br />
            Department :
            {department.find((dep) => dep.id === formData.user.department)
              ?.name || ''}{' '}
            <br />
            Start date:
            {formData.user.startDate}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleView}>All current employees</Button>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FormDialog.defaultProps = {
  open: false,
  activeTab: 1,
};

FormDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  activeTab: PropTypes.number,
  setActiveTab: PropTypes.func.isRequired,
};

export default FormDialog;
