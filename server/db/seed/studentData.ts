import connection from '../connection';

export function seedStudents() {
  const studentsData = [
    {
      student_name: 'Soo Borson',
      phone_number: '206-406-7645',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Nick Korneff',
      phone_number: '909-631-3843',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Isaiah Lopez',
      phone_number: '951-454-6564',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Maks Miner',
      phone_number: '949-298-0088',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Richard Wong',
      phone_number: '510-813-9989',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Jake Tran',
      phone_number: '480-280-8580',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Alexis Mabugat',
      phone_number: '818-416-0848',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Mina Deng',
      phone_number: '626-566-0052',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Juliette Bordier-Johnson',
      phone_number: '949-610-5259',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Lawrebce Abbott',
      phone_number: '760-536-2605',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Stella Sandeina Achda',
      phone_number: '925-391-4684',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Kalaya Cadle',
      phone_number: '818-579-1810',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Nili Wesolowski',
      phone_number: '310-993-9549',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Chris Sanchee',
      phone_number: '714-718-8378',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Tao Keny',
      phone_number: '714-924-2816',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Valentino Cavarica',
      phone_number: '949-395-2556',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Aiden Kim',
      phone_number: '949-527-2568',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Leah Feigenbaum',
      phone_number: '213-255-9578',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Edbert Feng',
      phone_number: '213-700-8938',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Pieta Myka Baca',
      parent_name: 'Kimberly Baca',
      phone_number: '949-735-5883',
      email: 'kimberlymacool@gmail.com',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Sandra Mah',
      phone_number: '415-203-7950',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Paige Choi',
      parent_name: 'Marie Anny Choi',
      phone_number: '310-857-8615',
      email: 'annychoe@yahoo.com',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Sarah Huang',
      phone_number: '949-372-9399',
      email: 'hr899076@gmail.com',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Serene Tan',
      phone_number: '619-213-9734',
      email: 'jmtserene@gmail.com',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Yui Tan',
      phone_number: '425-233-7668',
      email: 'yuiw@hey.com',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Jasmin Carrasco',
      phone_number: '562-712-6551',
      email: 'jasmincarrasco@gmail.com',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Ash Zhang',
      parent_name: 'Liz Qu',
      phone_number: '626-693-9619',
      email: 'lizadult789@gmail.com',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'daniel Beck',
      phone_number: '949-299-6392',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Bowei Deng',
      phone_number: '949-562-9492',
      email: 'boweideng0720@gmail.com',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Kris Mendez',
      phone_number: '484-862-1089',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Alex Cadena',
      phone_number: '310-906-7589',
      email: 'alexcadenajj@gmail.com',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Leslie Wei',
      parent_name: 'Lu Kong',
      phone_number: '949-592-8457',
      email: 'Luk20091103@gmail.com',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Christine Jiang',
      parent_name: 'Jade Hui',
      phone_number: '310-227-6942',
      email: 'jadehaiweihui@gmail.com',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Jacqueline Caldarella',
      parent_name: 'Cassandra Caldarella',
      phone_number: '949-233-0606',
      email: 'caldarella13127@yahoo.com',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
    {
      student_name: 'Jeffrey Eng',
      parent_name: 'Charlene Srivastava',
      phone_number: '650-283-5909',
      email: 'chargeng@gmail.com',
      subscription_price: 1800,
      number_of_lessons_in_subscription: 13
    },
  ];

  for (const student of studentsData) {
    connection.query('INSERT IGNORE INTO students SET ?', student);
  }
}
