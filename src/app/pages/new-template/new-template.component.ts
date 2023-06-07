import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {TemplateService} from 'src/app/services/template.service';

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.scss']
})
export class NewTemplateComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private templateService:TemplateService
  ){
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