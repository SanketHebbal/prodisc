import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormControl , FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  authError: any;
  showSuccessMessage: boolean;
  url: string;
  registrationForm;
  submitted :boolean;

  constructor(private auth: AuthService , 
              private router: Router , 
              private afAuth: AngularFireAuth ,
              private formBuilder: FormBuilder ) { }

  ngOnInit() {
    // this.auth.eventAuthError$.subscribe( data => {
    //   this.authError = data;
    //   if(this.authError)
    //     this.showSuccessMessage = true;
    //   setTimeout(() => this.showSuccessMessage = false, 3000);
    // })
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      skills : ['', Validators.required],
      bio: ['', Validators.required],
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  availableTargets = [ {id: 0, name: "C"}, {id: 1, name: "C++"}, {id: 2, name: "Java" },
                       {id: 3, name: "C#"}, {id: 4, name: "Php"}, {id: 5, name: "Python" },
                       {id: 6, name: "Go"}, {id: 7, name: "Ruby"}, {id: 8, name: "Haskel" },
                       {id: 9, name: "Kotlin"}, {id: 10, name: "Html"}, {id: 11, name: "Angular" },
                       {id: 12, name: "Data Structure"},
                    ];
  selectedTargets = [];

  public AddTarget(index) {
    
    for(var i = 0 ; i < this.selectedTargets.length ; i++)
    {
      if ( this.selectedTargets[i] == this.availableTargets[index].name)
        break;
    }
    if ( i == this.selectedTargets.length)
    {
      this.selectedTargets.push(this.availableTargets[index].name);
    }
  }

  createUser(frm) {
    frm.value.skills = this.selectedTargets
    console.log(frm.value.skills)
    this.submitted = true;
      //if (frm.value.password == frm.value.confirm)
        this.auth.createUser(frm.value);
        //this.router.navigate(['login']);
  }

  onChange(event)
  {
    let skill = event['srcElement']['value']
    console.log(event)
  }

  reset() 
  {
    this.submitted = false;
    this.registrationForm.reset();
  }

  get f() { return this.registrationForm.controls; }
}
