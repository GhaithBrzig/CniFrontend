import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-uploadcsv',
  templateUrl: './uploadcsv.component.html',
  styleUrls: ['./uploadcsv.component.scss']
})
export class UploadcsvComponent {
  fileToUpload: File | null = null;


  constructor(private http:HttpClient){}


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

  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files[0];
  }
}
