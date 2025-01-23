import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";

@Injectable({
    providedIn: "root"
})
export class EmailTaken implements AsyncValidator {
    constructor(private auth: AngularFireAuth) {
        // this.validate = this.validate.bind(this); //when not using arrow function for validate
    }
    validate = (control: AbstractControl): Promise<ValidationErrors | null> => {

        // this.auth.fetchSignInMethodsForEmail(control.value).then(result => {
        //     console.log(result);
        // });

        return this.auth.fetchSignInMethodsForEmail(control.value).then(
            result => result.length ? { emailTaken: true } : null
        ).catch((error) => {
            console.error('Error fetching sign-in methods:', error);
            return null;
        });
    }
}
