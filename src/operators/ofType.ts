import { Observable } from 'rxjs/Rx'

export function ofType(predicate) {
  let source = this;
  return Observable.create(observer =>
    source.subscribe(value => {
      try {
       if(value == predicate) observer.next(value);
      } catch(e) {
        observer.error(e);
      }
    },
    err => observer.error(err),
    () => observer.complete()
   )
   return source
  );
}

//Observable.prototype.ofType = ofType 