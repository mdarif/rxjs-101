const { Observable, map, tap, take } = require('rxjs');

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
 * A collection of items emitted over time.
 * An Observable is a producer of multiple values over time.
 * Observables are declarative—that is, you define a function for
 * producing the sequence of values, but it is not executed until
 * a consumer subscribes to it.
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
  subscriber.complete(); // complete notification sent to the observer
}).pipe(
  /**
   * map
   *
   * map is a transformation operator that takes a function as an argument.
   *
   * Applies a given project function to each value emitted by the source Observable,
   * and emits the resulting values as an Observable.
   *
   * Subscribe to its input Observable
   * Creates an output Observable
   *
   */
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
 *
 * To invoke the Observable and see these values,
 * we need to subscribe to it:
 */
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
    console.log('Observer got a complete notification!');
  },
};
/**
 * observable.subscribe(Observer)
 *
 * Argument (Observer)
 *
 * What is an Observer?
 * An Observer is a consumer of values delivered by an Observable.
 * Observers are simply a set of callbacks, one for each type of notification
 * delivered by the Observable: 'next', 'error', and 'complete'.
 */
observable.subscribe(observer);
