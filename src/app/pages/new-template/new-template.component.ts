import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {TemplateService} from 'src/app/services/template.service';
import {MatStepperModule} from '@angular/material/stepper';

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.scss']
})
export class NewTemplateComponent implements OnInit {

  form!: FormGroup;
  id:string ="";

  constructor(
    private templateService:TemplateService,
    private route: ActivatedRoute
  ){
    this.id = this.route.snapshot.paramMap.get('id')!.toString();

    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl("", [Validators.minLength(10), Validators.maxLength(50)]),
      description: new FormControl("", [Validators.maxLength(300)]),
    });
    
  }

  ngOnInit(): void {
    
  }

  async onSubmit(){
    console.log(this.form.value);
    const response = await this.templateService.addTemplate(
      this.form.value
    );
    console.log(response);
  }

}