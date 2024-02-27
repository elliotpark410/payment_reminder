import connection from '../connection';

export function seedTexts() {
  const textsData = [
    // Insert text data here
    {
      student_name: 'Leah Feigenbaum',
      date: '2024-02-23',
      message: 'Hello',
    },
  ];

  for (const text of textsData) {
    connection.query('INSERT IGNORE INTO texts SET ?', text);
  }
}
