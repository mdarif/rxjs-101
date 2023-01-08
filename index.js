const { Observable } = require('rxjs');

const users = {
  data: [
    {
      status: 'active',
      age: 14,
    },
    {
      status: 'inactive',
      age: 32,
    },
    {
      status: 'active',
      age: 45,
    },
    {
      status: 'active',
      age: 12,
    },
    {
      status: 'inactive',
      age: 35,
    },
    {
      status: 'active',
      age: 44,
    },
  ],
};

/**
 * Create an observable
 *
 * @param {Function} subscribe
 * @returns {Observable}
 */

const observable = new Observable((subscriber) => {
  // Emit a value
  subscriber.next(10); // value emitted to the observer
  subscriber.next(11); // value emitted to the observer
  subscriber.next(12); // value emitted to the observer
});

// Create an observer
const observer = {
  next: (value) => {
    // Handle the emitted value
    console.log('Observer got a value of ', value);
  },
  // Handle errors
  error: (err) => {
    console.log('Observer got an error: ', err);
  },
  // Handle completion
  complete: () => {
    console.log('Observer got a complete notification');
  },
};

// Subscribe to the observable
observable.subscribe(observer);
