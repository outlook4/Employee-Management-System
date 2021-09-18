import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validators}from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!:FormGroup;
  employeeModelob:EmployeeModel=new EmployeeModel();
  employeeData:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      mobile:['',Validators.required],
      salary:['',Validators.required],
    })
    this.getAllEmployee();
  }
  clickAddEmployee()
  {
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postEmployeeDetails(){
    this.employeeModelob.firstName=this.formValue.value.firstName;
    this.employeeModelob.lastName=this.formValue.value.lastName;
    this.employeeModelob.email=this.formValue.value.email;
    this.employeeModelob.mobile=this.formValue.value.mobile;
    this.employeeModelob.salary=this.formValue.value.salary;
     this.api.postEmployee(this.employeeModelob).subscribe(res=>{
       console.log(res)
       alert("Employee Added Successfully !!")
       let ref =document.getElementById('cancle')
       ref?.click();
       this.formValue.reset();
       this.getAllEmployee();

     },
     err=>
     {
       alert("Somthing went worng")
     }
     )
    }
   getAllEmployee(){
     this.api.getEmployee().subscribe(res=>{
       this.employeeData=res;
     })
   }
   deleteEmployee(row:any){
     this.api.deleteEmployee(row.id).subscribe(res=>{
       alert("Employee Deleted Successfully!!")
       this.getAllEmployee();
     })
   }
   onEdit(row:any)
   {
    this.showAdd=false;
    this.showUpdate=true;
     this.employeeModelob.id=row.id;
         this.formValue.controls['firstName'].setValue(row.firstName);
     this.formValue.controls['lastName'].setValue(row.lastName);
     this.formValue.controls['email'].setValue(row.email);
     this.formValue.controls['mobile'].setValue(row.mobile);
     this.formValue.controls['salary'].setValue(row.salary);
     

   }
   updateEmployeeDetails(){
    this.employeeModelob.firstName=this.formValue.value.firstName;
    this.employeeModelob.lastName=this.formValue.value.lastName;
    this.employeeModelob.email=this.formValue.value.email;
    this.employeeModelob.mobile=this.formValue.value.mobile;
    this.employeeModelob.salary=this.formValue.value.salary;
    this.api.updateEmployee(this.employeeModelob,this.employeeModelob.id).subscribe
    (res=>{
      alert("Updated Successfully !!")
      let ref =document.getElementById('cancle')
       ref?.click();
       this.formValue.reset();
       this.getAllEmployee();

    })   
   }
}
