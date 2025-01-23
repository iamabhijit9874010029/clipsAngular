import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class RegisterValidator {
    static match(controlName: string, mathcingControlName: string): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const control = group.get(controlName);
            const mathcingControl = group.get(mathcingControlName);

            if (!control || !mathcingControl) {
                // console.log("Form control can not be found in the form group");// developers
                return { controlNotFound: false };
            }

            const error = control.value === mathcingControl.value ? null : { noMatch: true };

            mathcingControl.setErrors(error);

            return error;
        }

    }
}
