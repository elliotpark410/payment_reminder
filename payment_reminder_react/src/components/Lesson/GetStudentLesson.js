import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Modal, Button, Pagination } from 'react-bootstrap';
import { host } from '../../lib/constants';
import DeleteLesson from './DeleteLesson';
import DeletePayment from '../Payment/DeletePayment';
import EditPayment from '../Payment/EditPayment';
import EditLesson from './EditLesson';
import EditReset from './EditReset';
import SentText from '../Text/SentText';
import { formatDate, getTotalPaymentAmount } from '../../lib/util';
import '../../App.css';

const fetchStudentLessons = async (studentId) => {
  try {
    const response = await axios.get(`${host}/lesson/student/${studentId}`);

    // Filter out records with null or invalid lesson_date
    const validLessons = response.data.filter((lesson) => {
      return lesson.lesson_date !== null && lesson.lesson_date !== undefined && lesson.deleted_at === null;
    });

    // Sort the valid records by lesson_date
    const sortedLessons = validLessons.sort(
      (a, b) => new Date(a.lesson_date) - new Date(b.lesson_date)
    );

    // Format the sorted lessons
    const formattedLessons = sortedLessons.map((lesson, index) => ({
      ...lesson,
      lesson: true,
      lessonNumber: index + 1,
      formattedDate: formatDate(lesson.lesson_date)
    }));

    return formattedLessons;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
};

const fetchStudentResetLessons = async (studentId) => {
  try {
    // Fetch data from the API
    const response = await axios.get(`${host}/lesson/student/${studentId}`);

    // Filter out records with null or undefined reset_lesson_date
    const validResetLessons = response.data.filter(
      (resetLesson) => resetLesson.reset_lesson_date !== null && resetLesson.reset_lesson_date !== undefined && resetLesson.deleted_at === null
    );

    // Sort the valid records by reset_lesson_date
    const sortedResetLessons = validResetLessons.sort(
      (a, b) => new Date(a.reset_lesson_date) - new Date(b.reset_lesson_date)
    );

    // Format the sorted lessons
    const formattedResetLessons = sortedResetLessons.map((resetLesson) => ({
      ...resetLesson,
      resetLesson: true,
      formattedDate: formatDate(resetLesson.reset_lesson_date)
    }));

    return formattedResetLessons;
  } catch (error) {
    console.error('Error fetching reset lessons:', error);
    throw error;
  }
};

const fetchStudentPayments = async (studentId) => {
  try {
    // Fetch data from the API
    const response = await axios.get(`${host}/payment/student/${studentId}`);

    // Filter out records with null or undefined dates
    const validPayments = response.data.filter(
      (payment) => payment.created_at !== null && payment.created_at !== undefined
    );

    // Format the valid payments and sort them
    const formattedPayments = validPayments.map((payment) => ({
      ...payment,
      payment: true,
      formattedDate: formatDate(payment.payment_date)
    }));

    return formattedPayments;
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};

const fetchStudentTexts = async (studentId) => {
  try {
    // Fetch data from the API
    const response = await axios.get(`${host}/text/student/${studentId}`);

    // Filter out records with null or undefined dates
    const validTexts = response.data.filter(
      (text) => text.created_date !== null && text.created_date !== undefined
    );

    // Format the valid texts and sort them
    const formattedTexts = validTexts.map((text) => ({
      ...text,
      text: true,
      formattedDate: formatDate(text.created_date)
    }));

    return formattedTexts
  } catch (error) {
    console.error('Error fetching texts:', error);
    throw error;
  }
};

function GetStudentLesson({ studentId, studentName, onClose }) {
  const [lessons, setLessons] = useState([]);
  const [resetLessons, setResetLessons] = useState([]);
  const [texts, setTexts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [showEditLessonModal, setShowEditLessonModal] = useState(false);
  const [showEditResetModal, setShowEditResetModal] = useState(false);
  const [showEditPaymentModal, setShowEditPaymentModal] = useState(false);
  const [editLesson, setEditLesson] = useState(null);
  const [lessonDate, setLessonDate] = useState('');
  const [resetDate, setResetDate] = useState('');
  const [editPayment, setEditPayment] = useState(null);
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(null);
  const [showTextModal, setShowTextModal] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const fetchData = useCallback(async () => {
    const fetchedLessons = await fetchStudentLessons(studentId);
    const fetchedResetLessons = await fetchStudentResetLessons(studentId);
    const fetchedPayments = await fetchStudentPayments(studentId);
    const fetchedTexts = await fetchStudentTexts(studentId);

    const mergedRecords = [...fetchedLessons, ...fetchedResetLessons, ...fetchedPayments, ...fetchedTexts];
    const recordsWithLessonNumbers = assignLessonNumbers(mergedRecords);
    const totalPages = Math.ceil(recordsWithLessonNumbers.length / itemsPerPage);

    setLessons(fetchedLessons);
    setResetLessons(fetchedResetLessons);
    setPayments(fetchedPayments);
    setTexts(fetchedTexts);
    setCurrentPage(totalPages);
  }, [studentId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, studentId]);

  const handleEditLesson = (lesson) => {
    setEditLesson(lesson);
    setLessonDate(new Date(lesson.lesson_date).toISOString().slice(0, 10));
    setShowEditLessonModal(true);
  };

  const handleEditReset = (reset) => {
    setEditLesson(reset);
    setResetDate(new Date(reset.reset_lesson_date).toISOString().slice(0, 10));
    setShowEditResetModal(true);
  };

  const handleEditPayment = (payment) => {
    setEditPayment(payment);
    setPaymentDate(new Date(payment.payment_date).toISOString().slice(0, 10));
    setPaymentAmount(payment.amount);
    setShowEditPaymentModal(true);
  };

  const handleDelete = (itemId, setState) => {
    setState(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== itemId);
      return updatedItems;
    });
  };

  const handleDeleteLesson = lessonId => {
    handleDelete(lessonId, setLessons);
  };

  const handleDeleteResetLesson = resetLessonId => {
    handleDelete(resetLessonId, setResetLessons);
  };

  const handleDeletePayment = paymentId => {
    handleDelete(paymentId, setPayments);
  };

  const handleTextClick = (message) => {
    setTextMessage(message);
    setShowTextModal(true);
  }

  const mergedRecords = [...lessons, ...resetLessons, ...payments, ...texts].sort((a, b) => new Date(a.formattedDate) - new Date(b.formattedDate));

  // Function to reset lesson numbers after each text or reset record
  const assignLessonNumbers = (records) => {
    let currentLessonNumber = 0; // Start lesson counter

    return records.map((record) => {
      if (record.lesson) {
        currentLessonNumber += 1; // Increment for each lesson
        return { ...record, lessonNumber: currentLessonNumber }; // Assign the updated lesson number
      } else if (record.text || record.resetLesson) {
         // Reset counter if a "text" or "reset lesson" is encountered
         currentLessonNumber = 0;
         return record; // Just return the record
      } else {
        // Skip for payment records
        return record

      }
    });
  };

  const recordsWithLessonNumbers = assignLessonNumbers(mergedRecords);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = recordsWithLessonNumbers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(recordsWithLessonNumbers.length / itemsPerPage);

  return (
    <Modal
      size="lg"
      show={true}
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {studentName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record, index) => {
              const uniqueKey = `${record.id}-${index}`;
              // lesson records
              if (record.lesson) {
                return (
                  <tr key={uniqueKey}>
                    <td>{record.lessonNumber}</td>
                    <td className="lessonData" onClick={() => handleEditLesson(record)}>{record.formattedDate}</td>
                    <td>
                      <DeleteLesson
                        lessonId={record.id}
                        onDelete={() => handleDeleteLesson(record.id)}
                      />
                    </td>
                  </tr>
                );
                // text message records
              } else if (record.text) {
                return (
                  <tr key={uniqueKey}>
                    <td
                      colSpan="2"
                      onClick={() => handleTextClick(record.message)}
                      className="textData text-center"
                      style={{
                        backgroundColor: '#007bff', // blue
                        color: 'white',
                        padding: '8px 15px',
                        borderRadius: '4px',
                        height: '55px',
                      }}
                      >
                        Message sent on {record.formattedDate}
                    </td>
                    <td colSpan="1"></td>
                  </tr>
                );
              } else if (record.payment) {
                // payment records
                return (
                  <tr key={uniqueKey}>
                    <td
                      colSpan="2"
                      className="paymentData text-center"
                      style={{
                      backgroundColor: '#74db79', // green
                      padding: '8px 15px',
                      borderRadius: '4px',
                      }}
                      onClick={() => handleEditPayment(record)}
                    >
                      ${record.amount.toLocaleString()} received on {record.formattedDate}
                    </td>
                    <td>
                      <DeletePayment
                        paymentId={record.id}
                        onDelete={() => handleDeletePayment(record.id)}
                      />
                    </td>
                  </tr>
                )
              }
               else {
                // lesson reset records
                return (
                  <tr key={uniqueKey}>
                    <td
                      colSpan="2"
                      className="resetData text-center"
                      style={{
                      backgroundColor: '#FFC107', // yellow
                      padding: '8px 15px',
                      borderRadius: '4px',
                      }}
                      onClick={() => handleEditReset(record)}
                    >
                      Lesson reset on {record.formattedDate}
                    </td>
                    <td>
                      <DeleteLesson
                        lessonId={record.id}
                        onDelete={() => handleDeleteResetLesson(record.id)}
                      />
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <Pagination className="justify-content-center">
          <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </Modal.Body>
      <Modal.Footer>
      <div style={{ flex: 1, textAlign: 'left', fontSize: '16px' }}>
        Lessons Completed: <span className="lessonPaymentText">{lessons.length.toLocaleString()}</span>
        <br />
        Payments Received: <span className="lessonPaymentText">{getTotalPaymentAmount(payments)}</span>
      </div>
        <Button
          className="button"
          variant="secondary"
          onClick={onClose}
        >
          Close
        </Button>
      </Modal.Footer>

      {/* Edit Lesson Modal */}
      <EditLesson
        show={showEditLessonModal}
        onHide={() => setShowEditLessonModal(false)}
        lesson={editLesson}
        lessonDate={lessonDate}
        setLessonDate={setLessonDate}
        setEditLesson={setEditLesson}
        studentId={studentId}
        fetchData={fetchData}
      />

      {/* Edit Reset Modal */}
      <EditReset
        show={showEditResetModal}
        onHide={() => setShowEditResetModal(false)}
        lesson={editLesson}
        resetDate={resetDate}
        setResetDate={setResetDate}
        setEditLesson={setEditLesson}
        studentId={studentId}
        fetchData={fetchData}
      />

      {/* Edit Payment Modal */}
      <EditPayment
        show={showEditPaymentModal}
        onHide={() => setShowEditPaymentModal(false)}
        payment={editPayment}
        paymentDate={paymentDate}
        paymentAmount={paymentAmount}
        setPaymentDate={setPaymentDate}
        setPaymentAmount={setPaymentAmount}
        setEditPayment={setEditPayment}
        studentId={studentId}
        fetchData={fetchData}
      />

      {/* Display Sent Text Modal */}
      <SentText
        show={showTextModal}
        onHide={() => setShowTextModal(false)}
        textMessage={textMessage}
      />
    </Modal>
  );
}

export default GetStudentLesson;
