import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { api } from '../../lib/constants';
import { toast } from 'react-toastify';
import { formatDate } from '../../lib/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';

const EditPayment = ({
  show,
  onHide,
  payment,
  paymentDate,
  paymentAmount,
  setPaymentDate,
  setPaymentAmount,
  setEditPayment,
  fetchStudentPaymentData,
  onUpdate
}) => {
  const handleSaveEdit = async () => {
    try {
      // Validate date
      const date = new Date(paymentDate);
      const isValidDate = date instanceof Date && !isNaN(date);

      if (!paymentDate || !isValidDate) {
        toast.error('Please enter a valid date.');
        return;
      }

      const isValidAmount = /^[1-9]\d*(\.\d+)?$/.test(paymentAmount);

      if (!isValidAmount) {
        toast.error('Please enter a valid amount.');
        return;
      }

      const response = await api.put(`/payment/${payment.id}`, {
        date: paymentDate,
        amount: paymentAmount
      });

      // console.log('Payment updated successfully:', response.data);

      onHide();

      const notificationDate = formatDate(response.data.date);

      if (response.status === 200 || response.status === 201) {
        // Show notifcation
        toast.success(`Edited payment ${notificationDate} `, {
          position: 'top-left',
          autoClose: 3000 // Close after 3 seconds
        });
      } else {
        console.error('Error editing payment. Unexpected response:', response);
      }

      setEditPayment(null);
      setPaymentDate('');
      setPaymentAmount(null);
      fetchStudentPaymentData();
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  };

  const handleDeletePayment = async () => {
    try {
      await api.delete(`/payment/delete/${payment.id}`);

      onHide();
      fetchStudentPaymentData();
      onUpdate();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      throw error;
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="paymentDate" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flexGrow: 1 }}>
            <Form.Label>Payment Date</Form.Label>
            <Form.Control
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </div>
          <Button
            variant="outline-danger"
            onClick={handleDeletePayment}
            title="Delete payment"
            style={{ marginLeft: '1em', height: 'fit-content', alignSelf: 'flex-end' }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Form.Group>
        <br />
        <Form.Group controlId="paymentAmount">
          <Form.Label>Amount</Form.Label>
          <div style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                fontSize: '18px'
              }}
            >
              $
            </span>
            <Form.Control
              type="number"
              value={paymentAmount ?? ''}
              onChange={(e) => setPaymentAmount(e.target.value)}
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                paddingLeft: '30px'
              }}
            />
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button className="small-button" variant="primary" onClick={handleSaveEdit}>
          Save
        </Button>
        <Button className="small-button" variant="secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPayment;
