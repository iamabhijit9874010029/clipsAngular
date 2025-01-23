import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IUser from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterValidator } from '../validators/register-validator';
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  constructor(private auth: AuthService, private emailTaken: EmailTaken) { }

  inSubmission: boolean = false;

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ], [this.emailTaken.validate]),
    age: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(18),
      Validators.max(120)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
    ]),
    confirm_password: new FormControl('', [
      Validators.required
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13)
    ])
  }, [RegisterValidator.match("password", "confirm_password")]);

  // name = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(3)
  // ])
  // email = new FormControl('')
  // age = new FormControl('')
  // password = new FormControl('')
  // confirm_password = new FormControl('')
  // phoneNumber = new FormControl('')

  // registerForm = new FormGroup({
  //   name: this.name,
  //   email: this.email,
  //   age: this.age,
  //   password: this.password,
  //   confirm_password: this.confirm_password,
  //   phoneNumber: this.phoneNumber
  // })

  alertColor: string = "blue";
  ShowAlert: boolean = false;
  alertMsg: string = "Please wait! Your account is being created."

  async register() {
    this.alertColor = "blue";
    this.ShowAlert = true;
    this.alertMsg = "Please wait! Your account is being created."
    // console.log(this.registerForm.value);
    this.inSubmission = true;


    try {
      await this.auth.createUser(this.registerForm.value as IUser);
    } catch (error) {
      console.error(error);

      // this.alertMsg = error.message;
      this.alertMsg = "An unexpected error occurred. Please try again later.";
      this.alertColor = "red";

      this.inSubmission = false;
      return;
    }

    this.alertMsg = "Success! Your account has been created.";
    this.alertColor = "green";

    this.inSubmission = false;
  }


  //better approach
  // try {
  //   await this.auth.createUser(this.registerForm.value as IUser); // Await the async function
  //   this.alertMsg = "Success! Your account has been created.";
  //   this.alertColor = "green";
  // } catch (error) {
  //   console.error(error);

  //   this.alertMsg = "An unexpected error occurred. Please try again later.";
  //   this.alertColor = "red";
  // } finally {
  //   this.inSubmission = false; // Ensure this is set to false after the operation
  // }

}
