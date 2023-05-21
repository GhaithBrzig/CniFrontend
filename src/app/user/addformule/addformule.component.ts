import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-addformule',
  templateUrl: './addformule.component.html',
  styleUrls: ['./addformule.component.scss']
})
export class AddformuleComponent implements OnInit {
  selectObj: SelectObj ;
  selectArr : SelectObj[] = [];
  // making buttons work
  toshow ='';
  currentvalue=''
  writetoinput(value: string){
    this.currentvalue = this.currentvalue + value
    this.toshow =this.currentvalue
  }
  // --------------------------------------
  constructor() {
    this.selectObj = new SelectObj();
    
  }

  ngOnInit():void {

  }
  
  test(){
    alert('L"opération est ajoutée')
  }


}

export class SelectObj {
  NomKpi: string ;
  formule: string;
  constructor() {
    this.NomKpi="";
    this.formule="";
   }
  }