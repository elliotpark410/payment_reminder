import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { host } from './lib/constants';
import GetAllStudents from './components/Student/GetAllStudents';
import EditStudent from './components/Student/EditStudent';
import AddStudent from './components/Student/AddStudent';
import DeleteStudent from './components/Student/DeleteStudent';
import GetStudentLesson from './components/Lesson/GetStudentLesson';
import GetAllLessons from './components/Lesson/GetAllLessons';
import AddLesson from './components/Lesson/AddLesson';


function App() {
  // State variables
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);
  const [formData, setFormData] = useState({
    studentId: null,
    selectedStudentId: null, // TODO: refactor to follow DRY principle
    studentName: '',
    showAddStudentForm: false,
    showEditStudentForm: false,
    showAllLessons: false,
    showAddLessonModal: false,
    sendTextDate: null,
  });

  // fetch initial data
  useEffect(() => {
    fetchData();
  }, []);

  // fetch students and lessons data
  const fetchData = async () => {
    try {
      const [studentsResponse, lessonsResponse] = await Promise.all([
        fetch(`${host}/student/`),
        fetch(`${host}/lesson/`),
      ]);
      const studentsData = await studentsResponse.json();
      const lessonsData = await lessonsResponse.json();
      // order students by alphabetical order
      setStudents(studentsData.sort((a, b) => a.student_name.localeCompare(b.student_name)));
      setLessons(lessonsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  // Event handlers
  const handleAddStudentClick = () => {
    setFormData({ ...formData, showAddStudentForm: true });
  };

  const handleEditStudentClick = (student) => {
    setEditStudent(student);
    setFormData({ ...formData, showEditStudentForm: true });
  };

  const handleDeleteStudentClick = (student) => {
    setDeleteStudent(student);
  };

  const handleStudentLessonsClick = (student) => {
    setFormData({
      ...formData,
      studentId: student.id,
      selectedStudentId: student.id,
      studentName: student.student_name
    });
  };

  const handleCloseLessonHistory = () => {
    setFormData({ ...formData, studentId: null });
    fetchData();
  };

  const handleAllLessons = () => {
    setFormData({ ...formData, showAllLessons: true });
  };

  // TODO: update this function to get lesson count up to send text message / clear button
  const getLessonCountForStudent = (studentId) => {
    return lessons.filter((lesson) => lesson.student_id === studentId).length;
  };

  const handleAddLesson = (student) => {
    setFormData({ ...formData, selectedStudentId: student.id, showAddLessonModal: true });
  };

  const handleCloseAddLessonModal = () => {
    setFormData({ ...formData, showAddLessonModal: false, selectedStudentId: null });
  };

  const handleSendTextClick = (student) => {
    setFormData({ ...formData, selectedStudentId: student.id });
  };

  return (
    <Container>
      {/* Header */}
      <Row className="mt-5">
        <Col className="text-center">
          <h1>Payment Reminder</h1>
        </Col>
        {/* TODO: refactor and create separate components for the buttons */}
        <Col className="text-left">
          <Button variant="primary" onClick={handleAddStudentClick}>
            Add Student
          </Button>
        </Col>
        <Col className="text-left">
          <Button variant="success" onClick={handleAllLessons}>
            All Lessons
          </Button>
        </Col>
      </Row>
      {/* Components */}
      <GetAllStudents
        // props being passed to component
        students={students}
        handleEditStudentClick={handleEditStudentClick}
        handleDeleteStudentClick={handleDeleteStudentClick}
        handleStudentLessonsClick={handleStudentLessonsClick}
        getLessonCountForStudent={getLessonCountForStudent}
        handleAddLesson={handleAddLesson}
        handleSendTextClick={handleSendTextClick}
      />
      {/* Edit Student Modal */}
      {/* Edit Student component is conditionally rendered if showEditStudentForm is truthy */}
      {formData.showEditStudentForm && (
        <EditStudent
          student={editStudent}
          onClose={() => setFormData({ ...formData, showEditStudentForm: false })}
          onUpdate={() => {
            fetchData();
            setFormData({ ...formData, showEditStudentForm: false });
          }}
        />
      )}
      {/* Add Student Modal */}
      {/* Add Student component is conditionally rendered if showAddStudentForm is truthy */}
      {formData.showAddStudentForm && (
        <AddStudent
          onClose={() => setFormData({ ...formData, showAddStudentForm: false })}
          onAdd={() => {
            fetchData();
            setFormData({ ...formData, showAddStudentForm: false });
          }}
        />
      )}
      {/* Delete Student Modal */}
      {deleteStudent && (
        <DeleteStudent
          student={deleteStudent}
          onCancel={() => setDeleteStudent(null)}
          onDelete={(deletedStudentId) => {
            setStudents(students.filter((student) => student.id !== deletedStudentId));
            setDeleteStudent(null);
          }}
        />
      )}
      {/* Student Lesson History */}
      {/* Get Student Lesson component is conditionally rendered if studentId is truthy */}
      {formData.studentId && (
        <GetStudentLesson
          studentId={formData.studentId}
          studentName={formData.studentName}
          lessons={lessons}
          onClose={handleCloseLessonHistory}
          sendTextDate={formData.sendTextDate}
        />
      )}
      {/* All Lessons Modal */}
      {/* Get All Lesson component is conditionally rendered if showAllLessons is truthy */}
      {formData.showAllLessons && (
        <GetAllLessons
          onClose={() => setFormData({ ...formData, showAllLessons: false })}
        />
      )}
      {/* Add Lesson Modal */}
      {/* Add Lesson component is conditionally rendered if showAddLessonModal is truthy */}
      {formData.showAddLessonModal && (
        <AddLesson
          studentId={formData.selectedStudentId}
          onClose={handleCloseAddLessonModal}
          onAdd={() => {
            fetchData();
            handleCloseAddLessonModal();
          }}
        />
      )}
    </Container>
  );
}

export default App;
