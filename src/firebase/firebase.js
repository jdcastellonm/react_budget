import * as firebase from 'firebase';

// Initialize firebase
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

firebase.initializeApp(config);
const database = firebase.database();

export {firebase, database as default};

// database.ref('expenses').push({
//   description: 'first expense',
//   note: 'no borrowing',
//   amount: 50000,
//   createdAt: 2
// });
// database.ref('expenses').push({
//   description: 'car',
//   note: 'no borrowing',
//   amount: 40000,
//   createdAt: 394
// });
// database.ref('expenses').push({
//   description: 'phone',
//   note: 'no borrowing',
//   amount: 3000,
//   createdAt: 394395
// });

// // database.ref('expenses').once('value', (snapshot) => {
// //   const expenses = [];
// //   snapshot.forEach((childSnapshot) => {
// //     expenses.push({
// //       id: childSnapshot.key,
// //       ...childSnapshot.val()
// //     });
// //   });
// //   console.log(expenses);
// // });

// database.ref('expenses').on('value', (snapshot) => {
//   const expenses = [];
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
//   console.log(expenses);
// });
// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.val());
// })


// const onValueChange = database.ref().on('value', (snapshot) => {
//   console.log(`${snapshot.val().name} is a ${snapshot.val().job.title} at ${snapshot.val().job.company}.`)
// });

// setTimeout(() => {
//   database.ref('job/company').set('Google');
// }, 3000);
// setTimeout(() => {
//   database.ref('job/company').set('Hubspot');
// }, 7000);

// // subscribe to changes to values. on() returns the callback function
// const onValueChange = database.ref().on('value', (snapshot) => {console.log(snapshot.val());});
// setTimeout(() => {
//   database.ref('age').set(29);
// }, 3500);
// setTimeout(() => {
//   database.ref().off(onValueChange);
// });
// setTimeout(() => {
//   database.ref('age').set(30);
// });

// fetch data only once (using an event function)
// database.ref().once('value').then((snapshot) => {
//   const value = snapshot.val();
//   console.log(value);
// }).catch((e) => {console.log('Error fetching data.', e)});

//   database().ref().set({
//       name: "Jose Castellon",
//       age: 30,
//       job: {
//           title: "Software Developer",
//           company: "Google"
//         },
//       location: {
//           city: 'Boston',
//           country: 'USA'
//       }
//   }).then(() => {
//     console.log("Data has been saved.");
//   }).catch((e) => {
//     console.log("Failed to save data.", e);
//   });

//   database().ref('location/city').set('Cambridge');
//   database().ref('attributes/height').set('177cm');
//   database().ref('attributes/weight').set('160lb');
//   database().ref('attributes/height').remove().then(() =>  {
//       console.log('Removed height.');
//   }).catch((e) => {
//       console.log('Access denied.');
//   });

// //   firebase.database().ref().update({ // setting a property to 'null' will delete it. can add new properties. nested objects can get overwritten
// //     'location/city': 'Boston' // updating nested property
// //   });
// database().ref().update({
//     'job/company': 'Hubspot',
//     'location/city' : 'Cambridge'
// });