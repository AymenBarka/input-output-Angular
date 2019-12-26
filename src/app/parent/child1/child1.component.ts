import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.css']
})
export class Child1Component implements OnInit {

  @Output() formulaireOut = new EventEmitter<any[]>();
  
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }
  formulaireIn = [] ;
  title='';
  firstName='';
  lastName='';
  email='';
  password='';
  confirmPassword='';
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  });
  this.getInformation();
  //localStorage.removeItem('formulaireIn');
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {

      this.submitted = true;
      
      if (this.title && this.firstName && this.lastName && this.email && this.password  && this.confirmPassword) {
        this.formulaireIn.push({ title: this.title ,first: this.firstName, last: this.lastName, email: this.email, password:this.password,confirm: this.confirmPassword});
        this.formulaireOut.emit(this.formulaireIn);
        localStorage.setItem('formulaireIn', JSON.stringify(this.formulaireIn));
      }
      if (this.registerForm.invalid) {
         return;
     }
  }

  getInformation() {
    if (localStorage.getItem('formulaireIn') === null) {
      this.formulaireIn = [];
    } else {
      this.formulaireIn = JSON.parse(localStorage.getItem('formulaireIn'));
    }
  }
  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

}
