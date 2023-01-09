const { from, map, tap, take } = require('rxjs');

from([20, 15, 10, 5])
  .pipe(
    tap((item) => console.log(`emitted items ${item}`)),
    map((item) => item * 2),
    map((item) => item - 10),
    map((item) => {
      if (item === 0) throw new Error('zero detected');

      return item;
    }),
    take(3)
  )
  .subscribe({
    next: (item) => console.log(`resulting item... ${item}`),
    error: (err) => console.error(`error occurred ${err}`),
    complete: () => console.log('complete'),
  });

// of('Apple1', 'Apple2', 'Apple3').subscribe({
//   next: (apple) => console.log(`Apple emitted ${apple}`),
//   error: (err) => console.error(`Error occurred ${err}`),
//   complete: () => console.log('No more apples, go home'),
// });
