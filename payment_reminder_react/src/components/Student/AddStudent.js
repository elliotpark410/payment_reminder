import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { host } from '../../lib/constants';
import '../../App.css';

function AddStudent({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    student_name: '',
    parent_name: '',
    phone_number: '',
    email: '',
    subscription_price: '',
    number_of_lessons_in_subscription: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddStudent = async () => {
    try {
      console.log('Adding new student:', formData);

      const response = await axios.post(`${host}/student/add`, formData);

      console.log('Added student:', response.data);

      onAdd(response.data); // Pass the added student data to the parent component

      if (response.status === 200 || 201) {
        // Show notifcation
        toast.success(`Sucessfully added student`, {
          autoClose: 3000, // Close after 3 seconds
        });
      } else {
        console.error('Error adding student. Unexpected response:', response);
      };

      onClose();
    } catch (error) {
      console.error('Error adding student:', error);
      throw error
    }
  };

  return (
    <Modal
      size="lg"
      show
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Student
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="studentName" className="pb-2">
          <Form.Label>Student Name <span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              type="text"
              name="student_name"
              value={formData.student_name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="parentName" className="py-2">
            <Form.Label>Parent Name</Form.Label>
            <Form.Control
              type="text"
              name="parent_name"
              value={formData.parent_name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="phoneNumber" className="py-2">
            <Form.Label>Phone Number <span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="email" className="py-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="subscriptionPrice" className="py-2">
            <Form.Label>Subscription Price</Form.Label>
            <Form.Control
              type="text"
              name="subscription_price"
              value={formData.subscription_price}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="NumberOfLessonsInSubscription" className="py-2">
            <Form.Label>Number of Lessons in Subscription</Form.Label>
            <Form.Control
              type="text"
              name="number_of_lessons_in_subscription"
              value={formData.number_of_lessons_in_subscription}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="button"
          variant="primary"
          onClick={handleAddStudent}
        >
          Add
        </Button>
        <Button
          className="button"
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddStudent;
