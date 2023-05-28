import {Component, OnInit} from '@angular/core';
import {Technicien} from "../../core/model/technicien";
import {CrudsService} from "../../core/services/cruds.service";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-list-tech',
  templateUrl: './list-tech.component.html',
  styleUrls: ['./list-tech.component.scss']
})
export class ListTechComponent implements OnInit{
  public techniciens: Technicien[];

  constructor(
    private crudsService : CrudsService,
  ) { }
  ngOnInit(): void {
    this.crudsService.getAll().subscribe({
      next : (params) => {
        this.techniciens = params;
        console.log(this.techniciens)
      },
      error: (error)=>{
        console.log(error);
      },
      complete: ()=>{
        console.log('complete');
      }
    });
  }

  deleteUser(id: any, i: number) {
    Swal.fire({
      title: 'Are you sure you want to delete this technicien?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      this.crudsService.delete(id).subscribe({
        next: (params) => {
          // Remove the element at index 'i' from the array
          this.techniciens.splice(i, 1);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('complete');
          Swal.fire('Deleted', 'User has been deleted successfully.', 'success');
        }
      });

    });
  }

}
