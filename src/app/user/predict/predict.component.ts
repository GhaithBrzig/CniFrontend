import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PredictionService } from 'src/app/core/services/prediction.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss']
})
export class PredictComponent {
  predictionResult: string;
  myForm: FormGroup;
  showResult = false;
  formValuesArray: any[] = [];

  constructor(
    private predictionService: PredictionService, 
    private fb : FormBuilder, 
    private http: HttpClient,
    ) {}
    ngOnInit(): void {
      this.myForm = this.fb.group({
      mois: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      annee: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      type_paie: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      codind: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
      montant_ind: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
      nature_ind: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
      cat: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
      corps: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      indice: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      echellon: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      fonc: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
      sitfam: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
      sexe: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
      total_recrutements: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
      montant_ind_total: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)])


      });
    }

    submit() { 

      const formValues = Object.values(this.myForm.value);
     //empty the formValuesArray array before pushing new values
     this.formValuesArray.splice(0, this.formValuesArray.length);
     this.formValuesArray.push(...formValues);
     console.log(this.formValuesArray);
    this.predictionService.predict(this.formValuesArray).subscribe({
      next: (result: any) => {
        this.predictionResult = result;
        this.showResult = true;
        console.log(result);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        // Optional complete callback
      }
    });
  }
    

}
