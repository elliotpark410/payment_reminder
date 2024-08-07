import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { api } from '../../lib/constants';
import { formatDate } from '../../lib/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';

const EditLesson = ({
  show,
  onHide,
  lesson,
  lessonDate,
  setLessonDate,
  setEditLesson,
  fetchStudentLessonData,
  onUpdate
}) => {
  const handleSaveEdit = async () => {
    try {
      // Validate date
      const date = new Date(lessonDate);
      const isValidDate = date instanceof Date && !isNaN(date);

      if (!lessonDate || !isValidDate) {
        toast.error('Please enter a valid date.');
        return;
      }

      const response = await api.put(`/lesson/${lesson.id}`, {
        date: lessonDate
      });
      // console.log('Lesson updated successfully:', response.data);
      onHide();

      const notificationDate = formatDate(response.data.date);

      if (response.status === 200 || response.status === 201) {
        // Show notifcation
        toast.success(`Edited lesson ${notificationDate}`, {
          position: 'top-left',
          autoClose: 3000 // Close after 3 seconds
        });
      } else {
        console.error('Error editing lesson. Unexpected response:', response);
      }

      setEditLesson(null);
      setLessonDate('');
      fetchStudentLessonData();
    } catch (error) {
      console.error('Error updating lesson:', error);
      throw error;
    }
  };

  const handleDeleteLesson = async () => {
    try {
      await api.delete(`/lesson/delete/${lesson.id}`);

      onHide();
      fetchStudentLessonData();
      onUpdate();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      throw error;
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Lesson</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="lessonDate" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flexGrow: 1 }}>
            <Form.Label>Lesson Date</Form.Label>
            <Form.Control
              type="date"
              value={lessonDate}
              onChange={(e) => setLessonDate(e.target.value)}
            />
          </div>
          <Button
            variant="outline-danger"
            onClick={handleDeleteLesson}
            title="Delete lesson"
            style={{ marginLeft: '1em', height: 'fit-content', alignSelf: 'flex-end' }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
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

export default EditLesson;
