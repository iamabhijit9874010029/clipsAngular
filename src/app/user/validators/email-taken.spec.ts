import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EmailTaken } from './email-taken';

// describe('EmailTaken', () => {
//   it('should create an instance', () => {
//     expect(new EmailTaken()).toBeTruthy();
//   });
// });

describe('EmailTaken', () => {
  it('should create an instance', () => {
    const auth = {} as AngularFireAuth;
    expect(new EmailTaken(auth)).toBeTruthy();
  });
});


// describe('EmailTaken', () => {
//   it('should create an instance', () => {
//     const auth = jasmine.createSpyObj('AngularFireAuth', ['auth']);
//     expect(new EmailTaken(auth)).toBeTruthy();
//   });
// });