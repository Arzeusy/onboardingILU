import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import TemplateInterface from 'src/app/interfaces/template.interface';
import {TemplateService} from 'src/app/services/template.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  templates: TemplateInterface[] | undefined;
  
  constructor(
    private templateService:TemplateService,
    private route: Router,
  ){    
  }

  ngOnInit(): void {
    this.templateService.getTemplates().subscribe(
      res =>{ this.templates = res;},
      err =>{ console.error(err);},
    )
  }

  goNewTemplates(id:string){
    this.route.navigate(['template/', id ]);
  }
 

}
