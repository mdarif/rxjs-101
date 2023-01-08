const { Observable } = require('rxjs');
const { map } = require('rxjs/operators');

const users = {
  data: [
    {
      status: 'active',
      age: 15,
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
 * Observable
 *
 * Observables are lazy Push collections of multiple values.
 */

/**
 * Create an observable
 *
 * @param {Function} subscribe
 * @returns {Observable}
 */

const observable = new Observable((subscriber) => {
  // Emit/push a value/object when subscribed
  subscriber.next(users); // value emitted to the observer
}).pipe(
  // First map operator to get the data from the object
  map((value) => {
    console.log('1) Got data from observable', value);
    return value.data;
  }),

  // Second map operator to filter the data
  map((value) => {
    console.log('2) Got data from first operator', value);
    return value.filter((user) => user.status === 'active');
  }),

  // Third map operator to get the sum of the ages
  map((value) => {
    console.log('3) Got data from first operator', value);
    return value.reduce((sum, user) => {
      return sum + user.age / value.length;
    }, 0);
  }),

  // Fourth map operator to throw an error if the age is less than 18
  map((value) => {
    console.log('4) Got data from third operator', value);
    if (value < 28) {
      throw new Error('Average age is less than 18');
    }
    return value;
  })
);

/**
 * To invoke the Observable and see these values,
 * we need to subscribe to it:
 */
observable.subscribe({
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
});
