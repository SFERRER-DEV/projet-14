import React, { useContext } from 'react';
import { EmployeesContext } from '../../utils/context';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen }) {
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
    updateFormData.startDate = dayjs(new Date()).format('YYYY-MM-DD');

    setFormData({ ...formData, user: updateFormData });

    setOpen(false);
  };
  /**
   * Déclare une variable d'état formData' pour contenant l'utilisateur créé et une fonction de mise à jour 'setFormData'
   * @typedef {Object} formData - Cette variable de State contient un utilisateur.
   * @typedef {Function} setFormData - Cette fonction met à jour le State local
   */
  const { formData, setFormData, department } = useContext(EmployeesContext);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <p>
          {formData.user.firstname} {formData.user.lastname}
        </p>
        <p>
          Department :
          {department.find((dep) => dep.id === formData.user.department)
            ?.name || ''}{' '}
        </p>
        <p>Start date: {dayjs(formData.user.startDate).format('DD-MM-YYYY')}</p>
        <p>New employee created</p>
      </Box>
    </Modal>
  );
}
