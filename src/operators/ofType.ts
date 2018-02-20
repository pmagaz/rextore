import { Observable } from 'rxjs/Rx'

const ofTypeFn = (action, actionType, subscriber ) => {
  try {
    if (action.type == actionType) subscriber.next(action);
    else subscriber.complete()
  } catch (err) {
    subscriber.error(err);
  }
}

export function ofType(actionType) {
  return function offTypeFn(source) {
    return Observable.create(subscriber => {
      let subscription = source.subscribe(value => {
        ofTypeFn(value, actionType, subscriber)
      },
        err => subscriber.error(err),
        () => subscriber.complete()
      )
      return subscription;
   });
  }
}

export function ofTypePrototype(actionType) {
  let source = this;
  return Observable.create(subscriber =>
    source.subscribe(value => {
      ofTypeFn(value, actionType, subscriber)
    },
    err => subscriber.error(err),
    () => subscriber.complete()
   )
  );
}

Observable.prototype.ofType = ofTypePrototype
