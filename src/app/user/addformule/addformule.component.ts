import { KpiService } from './../../core/services/kpi.service';
import { CompteurService } from './../../core/services/compteur.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormuleService } from '../../core/services/formul.service';
import { Formule } from 'src/app/core/model/formule';
import { Kpi } from 'src/app/core/model/kpi';
import { Compteur } from 'src/app/core/model/compteur';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-addformule',
  templateUrl: './addformule.component.html',
  styleUrls: ['./addformule.component.scss']
})
export class AddformuleComponent implements OnInit {

  formule: Formule = new Formule();
  selectedKpi!: any ;
  selectedCompteur!: any;
  formuleInput: string = ''; // Declare the formuleInput property
  formuleInputName: string = ''; // Declare the formuleInput property
  formules: Formule[] = [];
  kpis: Kpi[] = [];
  compteurs: Compteur[] = [];
  fileToUpload: File | null = null;


  constructor(
    private formuleService: FormuleService,
    private compteurService: CompteurService,
    private kpiService: KpiService,
    private cd: ChangeDetectorRef,
    private http:HttpClient // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchKpis();
    this.fetchCompteurs();
    this.fetchAllFormules();
  }

  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files[0];
  }

  fetchKpis(): void {
    this.kpiService.getKpis().subscribe(
      (kpis) => {
        this.kpis = kpis;
        console.log('KPIs:', this.kpis);
      },
      (error) => {
        console.error('Error fetching kpis', error);
      }
    );
  }

  uploadCsv(): void {
    Swal.fire({
      title: 'Are you sure you want to upload this file',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, upload',
    }).then((result) => {
      
      if (this.fileToUpload) {
        const formData: FormData = new FormData();
        formData.append('file', this.fileToUpload);
  
        this.http.post('http://localhost:8082/SpringMVC/product/upload', formData)
          .subscribe(
            () => {
              console.log('CSV file uploaded successfully');
              Swal.fire('Uploaded', 'Csv file uploaded successfully.', 'success');
            },
            (error) => {
              console.error('Error uploading CSV file:', error);
            }
          );
      }
    });
   
  }

  onKpiSelected() {
    console.log(this.selectedKpi);
  }

  onchange(event: any) {
    this.selectedKpi = event;
    console.log(this.selectedKpi);
  }

  fetchCompteurs(): void {
    this.compteurService.getCompteurs().subscribe(
      (compteurs) => {
        this.compteurs = compteurs;
        console.log('Compteurs:', this.compteurs);
      },
      (error) => {
        console.error('Error fetching compteurs', error);
      }
    );
  }

  fetchAllFormules(): void {
    this.formuleService.getAllFormules().subscribe(
      (formules) => {
        this.formules = formules;
        console.log(this.formules)
      },
      (error) => {
        console.error('Error fetching formules', error);
      }
    );
  }

  fetchKpisForFormules(): void {
    const kpiId = this.formule.kpis.idKPI;
    this.kpiService.getKpiById(kpiId).subscribe(
      (kpis) => {
        this.kpis = [kpis]; // Wrap the single Kpi object in an array
      },
      (error) => {
        console.error('Error fetching kpis', error);
      }
    );
  }

  getKpiName(kpi: Kpi): string {
    return kpi ? kpi.nomKPI : '';
  }

  addFormule(): void {
    const formuleData: Formule = new Formule();
    formuleData.nomFormule = this.formuleInputName;
    formuleData.descFormule = this.formuleInput;

    formuleData.kpis = new Kpi();
    formuleData.kpis.idKPI = this.selectedKpi;
    formuleData.compteurs = new Compteur();
    formuleData.compteurs.idCompteur = this.selectedCompteur;

    this.formuleService.addFormule(formuleData).subscribe(
      (response) => {
        console.log('Formula added successfully', response);
        // Reset form
        this.formuleInput = '';
        this.formuleInputName = '';
        this.selectedKpi = null;
        this.selectedCompteur = null;
        this.fetchAllFormules(); // Fetch all formules again to update the view
        this.cd.detectChanges(); // Detect changes in the view
      },
      (error) => {
        console.error('Error adding formula', error);
      }
    );
  }

  test() {
    alert('L"opération est ajoutée');
  }

  onButtonClick(symbol: string) {
    this.formuleInput += symbol;
  }
}
