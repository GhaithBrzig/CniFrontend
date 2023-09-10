import {Component, OnInit} from '@angular/core';
import {Client} from "../../core/model/client";
import {CrudsService} from "../../core/services/cruds.service";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-list-tech',
  templateUrl: './list-tech.component.html',
  styleUrls: ['./list-tech.component.scss']
})
export class ListTechComponent implements OnInit{
  public clients: Client[];

  constructor(
    private crudsService : CrudsService,
  ) { }
  ngOnInit(): void {
    this.crudsService.getAll().subscribe({
      next : (params) => {
        this.clients = params;
        console.log(this.clients)
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
      title: 'Are you sure you want to delete this client?',
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
          this.clients.splice(i, 1);
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
