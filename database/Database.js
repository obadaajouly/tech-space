import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydatabase.db');

const initDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS userss (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT,imageUri TEXT);"
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `
      CREATE TABLE IF NOT EXISTS userss (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT,
        imageUri TEXT
      );
      `,
        [],
        () => {
          console.log("Database initialized");
        },
        (error) => {
          console.error("Error initializing database:", error);
        }
      );
    });
    printAllUsers()
}
  // Insert a new user
  const insertUser = (name, email, password,imageUri) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO userss (name, email, password,imageUri) VALUES (?, ?, ?,?)',
        [name, email, password,imageUri],
        (_, result) => {
          console.log('User inserted:', result);
        },
        (error) => {
          console.error('Error inserting user:', error);
        }
      );
    });
    printAllUsers()
  };
  

const updateImageUri = (userId, imageUri) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE userss SET imageUri = ? WHERE id = ?',
      [imageUri, userId],
      () => {
        console.log('Updated imageUri for user:', userId);
      },
      (error) => {
        console.error('Error updating imageUri:', error);
      }
    );
  });
};
const printAllUsers = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM userss',
      [],
      (_, result) => {
        const userss = result.rows._array;
        console.log('All userss:', userss);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  });
};

// Call the function to print all users
printAllUsers();


export { initDatabase, insertUser,db,updateImageUri };