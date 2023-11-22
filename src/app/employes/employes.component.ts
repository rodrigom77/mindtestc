import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule} from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import {MatTableModule} from '@angular/material/table'
import { __asyncGenerator } from 'tslib';

@Component({
  selector: 'app-employes',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule,MatFormFieldModule,MatIconModule,MatInputModule,MatTableModule],
  templateUrl: './employes.component.html',
  styleUrl: './employes.component.css',
  
})
export class EmployesComponent {


  newEmploye:boolean
  displayedColumns: string[] = ['id', 'name', 'age','delete'];
  dataSource:any = [];

  constructor(private http:HttpClient)
  {
         this.newEmploye = true;
  }

   profileForm = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(''),
    dateBirth: new FormControl('')
   });

   ngOnInit()
   {
       this.getList();
   }

   onDelete(id:number)
   {
     console.log(id);
     if(confirm("Are you sure to delete this item?"))
     {
          this.http.delete("https://localhost:7024/api/testc?id=" + id).subscribe(data => {
            this.getList();
          });
     }
   }

   onSubmit() {
  
    if(this.newEmploye)
    {


         console.log(this.profileForm.value);
         this.http.post("https://localhost:7024/api/testc",{name:this.profileForm.value.name,edad:this.profileForm.value.age })
         .subscribe(data => {
             
          console.log(data);
          this.profileForm.reset();
          this.getList();

         });
    }
    else
    {
                
    }
  }

  getList()
  {
      this.http.get("https://localhost:7024/api/testc")
      .subscribe(data => 
        {
           console.log(data);
           this.dataSource = data;
        });
  }

}



