import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { PaginationComponent } from './Pagination/Pagination';
import { api } from '../../lib/constants';
import EditPayment from '../Payment/EditPayment';
import EditLesson from './EditLesson';
import EditReset from '../Reset/EditReset';
import SentText from '../Text/SentText';
import { formatDate, getTotalPaymentAmount } from '../../lib/util';
import '../../App.css';

export const fetchStudentLessons = async (studentId) => {
  try {
    const response = await api.get(`/lesson/student/${studentId}`);

    // Filter out records with null or invalid date
    const validLessons = response.data.filter((lesson) => {
      return lesson.date !== null && lesson.date !== undefined;
    });

    // Sort the valid records by date
    const sortedLessons = validLessons.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Format the sorted lessons
    const formattedLessons = sortedLessons.map((lesson, index) => ({
      ...lesson,
      lesson: true,
      lessonNumber: index + 1,
      formattedDate: formatDate(lesson.date)
    }));

    return formattedLessons;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
};

export const fetchStudentResets = async (studentId) => {
  try {
    // Fetch data from the API
    const response = await api.get(`/reset/student/${studentId}`);

    // Filter out records with null or undefined reset date
    const validResets = response.data.filter(
      (reset) => reset.date !== null && reset.date !== undefined
    );

    // Sort the valid records by reset date
    const sortedResets = validResets.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Format the sorted lessons
    const formattedResets = sortedResets.map((resetLesson) => ({
      ...resetLesson,
      resetLesson: true,
      formattedDate: formatDate(resetLesson.date)
    }));

    return formattedResets;
  } catch (error) {
    console.error('Error fetching reset lessons:', error);
    throw error;
  }
};

export const fetchStudentPayments = async (studentId) => {
  try {
    // Fetch data from the API
    const response = await api.get(`/payment/student/${studentId}`);

    // Filter out records with null or undefined dates
    const validPayments = response.data.filter(
      (payment) => payment.created_at !== null && payment.created_at !== undefined
    );

    // Format the valid payments and sort them
    const formattedPayments = validPayments.map((payment) => ({
      ...payment,
      payment: true,
      formattedDate: formatDate(payment.date)
    }));

    return formattedPayments;
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};

export const fetchStudentTexts = async (studentId) => {
  try {
    // Fetch data from the API
    const response = await api.get(`/text/student/${studentId}`);

    // Filter out records with null or undefined dates
    const validTexts = response.data.filter(
      (text) => text.date !== null && text.date !== undefined
    );

    // Format the valid texts and sort them
    const formattedTexts = validTexts.map((text) => ({
      ...text,
      text: true,
      formattedDate: formatDate(text.date)
    }));

    return formattedTexts;
  } catch (error) {
    console.error('Error fetching texts:', error);
    throw error;
  }
};

function GetStudentHistory({ studentId, studentName, onClose, onUpdate }) {
  const [lessons, setLessons] = useState([]);
  const [resets, setResets] = useState([]);
  const [texts, setTexts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [showEditLessonModal, setShowEditLessonModal] = useState(false);
  const [showEditResetModal, setShowEditResetModal] = useState(false);
  const [showEditPaymentModal, setShowEditPaymentModal] = useState(false);
  const [editLesson, setEditLesson] = useState(null);
  const [editReset, setEditReset] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [lessonDate, setLessonDate] = useState('');
  const [resetDate, setResetDate] = useState('');
  const [editPayment, setEditPayment] = useState(null);
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(null);
  const [showTextModal, setShowTextModal] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  // Height for each page
  const rowHeight = 50;
  const tableHeaderHeight = 40;
  const paginationHeight = 50;
  const tableContainerHeight = itemsPerPage * rowHeight + tableHeaderHeight;
  const totalContentHeight = tableContainerHeight + paginationHeight;

  const fetchStudentData = useCallback(async () => {
    const fetchedLessons = await fetchStudentLessons(studentId);
    const fetchedResets = await fetchStudentResets(studentId);
    const fetchedPayments = await fetchStudentPayments(studentId);
    const fetchedTexts = await fetchStudentTexts(studentId);

    const mergedRecords = [
      ...fetchedLessons,
      ...fetchedResets,
      ...fetchedPayments,
      ...fetchedTexts
    ];
    const recordsWithLessonNumbers = assignLessonNumbers(mergedRecords);
    const totalPages = Math.ceil(recordsWithLessonNumbers.length / itemsPerPage);

    setLessons(fetchedLessons);
    setResets(fetchedResets);
    setPayments(fetchedPayments);
    setTexts(fetchedTexts);
    setCurrentPage(totalPages);
  }, [studentId]);

  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData, studentId]);

  const fetchStudentLessonData = async () => {
    const fetchedLessons = await fetchStudentLessons(studentId);
    setLessons(fetchedLessons);
  };

  const fetchStudentResetData = async () => {
    const fetchedResets = await fetchStudentResets(studentId);
    setResets(fetchedResets);
  };

  const fetchStudentPaymentData = async () => {
    const fetchedPayments = await fetchStudentPayments(studentId);
    setPayments(fetchedPayments);
  };

  const handleEditLesson = (lesson) => {
    setEditLesson(lesson);
    setLessonDate(new Date(lesson.date).toISOString().slice(0, 10));
    setShowEditLessonModal(true);
    setEditModalOpen(true);
  };

  const handleEditReset = (reset) => {
    setEditReset(reset);
    setResetDate(new Date(reset.date).toISOString().slice(0, 10));
    setShowEditResetModal(true);
    setEditModalOpen(true);
  };

  const handleEditPayment = (payment) => {
    setEditPayment(payment);
    setPaymentDate(new Date(payment.date).toISOString().slice(0, 10));
    setPaymentAmount(payment.amount);
    setShowEditPaymentModal(true);
    setEditModalOpen(true);
  };

  const handleTextClick = (message) => {
    setTextMessage(message);
    setShowTextModal(true);
    setEditModalOpen(true);
  };

  const mergedRecords = [...lessons, ...resets, ...payments, ...texts].sort(
    (a, b) => new Date(a.formattedDate) - new Date(b.formattedDate)
  );

  // Function to reset lesson numbers after each text or reset record
  const assignLessonNumbers = (records) => {
    let currentLessonNumber = 0; // Start lesson counter

    return records.map((record) => {
      if (record.lesson) {
        currentLessonNumber += 1; // Increment for each lesson
        return { ...record, lessonNumber: currentLessonNumber }; // Assign the updated lesson number
      } else if (record.resetLesson) {
        // Reset counter if a "reset lesson" is encountered
        currentLessonNumber = 0;
        return record; // Just return the record
      } else {
        // Skip for payment records
        return record;
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
      className={editModalOpen ? 'modal-disabled' : ''}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{studentName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{ height: `${totalContentHeight}px`, display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ height: `${tableContainerHeight}px`, overflowY: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Count</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record, index) => {
                  const uniqueKey = `${record.id}-${index}`;
                  // lesson records
                  if (record.lesson) {
                    return (
                      <tr key={uniqueKey} style={{ height: `${rowHeight}px` }}>
                        <td>{record.lessonNumber}</td>
                        <td className="lesson-data" onClick={() => handleEditLesson(record)}>
                          {record.formattedDate}
                        </td>
                      </tr>
                    );
                    // text message records
                  } else if (record.text) {
                    return (
                      <tr key={uniqueKey} style={{ height: `${rowHeight}px` }}>
                        <td
                          colSpan="2"
                          onClick={() => handleTextClick(record.message)}
                          className="text-data text-center"
                          style={{
                            backgroundColor: '#007bff', // blue
                            color: 'white',
                            padding: '8px 15px',
                            borderRadius: '4px',
                            height: '55px'
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
                      <tr key={uniqueKey} style={{ height: `${rowHeight}px` }}>
                        <td
                          colSpan="2"
                          className="payment-data text-center"
                          style={{
                            backgroundColor: '#74db79', // green
                            padding: '8px 15px',
                            borderRadius: '4px'
                          }}
                          onClick={() => handleEditPayment(record)}
                        >
                          ${record.amount.toLocaleString()} received on {record.formattedDate}
                        </td>
                      </tr>
                    );
                  } else {
                    // lesson reset records
                    return (
                      <tr key={uniqueKey} style={{ height: `${rowHeight}px` }}>
                        <td
                          colSpan="2"
                          className="reset-data text-center"
                          style={{
                            backgroundColor: '#FFC107', // yellow
                            padding: '8px 15px',
                            borderRadius: '4px'
                          }}
                          onClick={() => handleEditReset(record)}
                        >
                          Lesson reset on {record.formattedDate}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
          <div
            style={{
              height: `${paginationHeight}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ flex: 1, textAlign: 'left', fontSize: '18px' }}>
          <div style={{ marginBottom: '0.5em' }}>
            Lessons Completed:{' '}
            <span className="lesson-payment-text">{lessons.length.toLocaleString()}</span>
          </div>
          <div>
            Payments Received:{' '}
            <span className="lesson-payment-text">{getTotalPaymentAmount(payments)}</span>
          </div>
        </div>
        <Button className="button" variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>

      {/* Edit Lesson Modal */}
      <EditLesson
        show={showEditLessonModal}
        onHide={() => {
          setShowEditLessonModal(false);
          setEditModalOpen(false);
        }}
        lesson={editLesson}
        lessonDate={lessonDate}
        setLessonDate={setLessonDate}
        setEditLesson={setEditLesson}
        fetchStudentLessonData={fetchStudentLessonData}
        onUpdate={onUpdate}
      />

      {/* Edit Reset Modal */}
      <EditReset
        show={showEditResetModal}
        onHide={() => {
          setShowEditResetModal(false);
          setEditModalOpen(false);
        }}
        reset={editReset}
        resetDate={resetDate}
        setResetDate={setResetDate}
        setEditReset={setEditReset}
        fetchStudentResetData={fetchStudentResetData}
        onUpdate={onUpdate}
      />

      {/* Edit Payment Modal */}
      <EditPayment
        show={showEditPaymentModal}
        onHide={() => {
          setShowEditPaymentModal(false);
          setEditModalOpen(false);
        }}
        payment={editPayment}
        paymentDate={paymentDate}
        paymentAmount={paymentAmount}
        setPaymentDate={setPaymentDate}
        setPaymentAmount={setPaymentAmount}
        setEditPayment={setEditPayment}
        fetchStudentPaymentData={fetchStudentPaymentData}
        onUpdate={onUpdate}
      />

      {/* Display Sent Text Modal */}
      <SentText
        show={showTextModal}
        onHide={() => {
          setShowTextModal(false);
          setEditModalOpen(false);
        }}
        textMessage={textMessage}
      />
    </Modal>
  );
}

export default GetStudentHistory;
