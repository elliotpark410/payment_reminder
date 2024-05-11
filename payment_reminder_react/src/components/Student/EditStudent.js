import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { host } from '../../lib/constants';

function EditStudent({ student, onClose, onEdit }) {
  const [formData, setFormData] = useState({
    student_name: student.student_name || "",
    parent_name: student.parent_name || "",
    phone_number: student.phone_number || "",
    email: student.email || "",
    subscription_price: student.subscription_price || "",
    number_of_lessons_in_subscription:
    student.number_of_lessons_in_subscription || "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      console.log('Saving edit for student', student);
      const response = await axios.put(
        `${host}/student/${student.id}`,
        formData
      );
      console.log('Updated student data:', response.data);
      onEdit(response.data);
      onClose();
    } catch (error) {
      console.error('Error saving student data:', error);
      throw error;
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
          Edit Student
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="studentName" className="pb-2">
            <Form.Label>
              Student Name <span style={{ color: 'red' }}>*</span>
            </Form.Label>
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
            <Form.Label>
              Phone Number <span style={{ color: 'red' }}>*</span>
            </Form.Label>
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
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditStudent;
