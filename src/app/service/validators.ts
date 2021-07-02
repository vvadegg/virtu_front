import {ValidatorFn, FormGroup} from '@angular/forms'


// валидатор дат
export const DatePeriodValidator: ValidatorFn = (fg: FormGroup) => {
    const start = fg.get('dateStart').value;
    const end = fg.get('dateEnd').value;

    return start !== null && end !== null && start < end
    ? null
    : { range: true };

}

