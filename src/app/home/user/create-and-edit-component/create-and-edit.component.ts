import { Component, OnInit } from '@angular/core';
import {Vet} from '../../../globals/constants.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../crud-service/crud.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ConstantsService } from '../../../globals/constants.service';

@Component({
  selector: 'app-create-and-edit',
  templateUrl: './create-and-edit.component.html',
  styleUrls: ['./create-and-edit.component.css']
})
export class CreateAndEditComponent implements OnInit {
  id: number;
  states = [ 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ',
    'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
  ];
  levelsOfAccessSelect = { USUARIO : 'Usuário', ADMIN : 'Admin', VETERINARIO : 'Veterinário'};
  editPassword = false;
  passwordType = 'password';
  type: string;
  registerForm: FormGroup;
  buttonClick = false;
  vet: Vet;
  response;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private crudService: CrudService, private constant: ConstantsService) {
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id === undefined) { this.setUserValuesEmptyInputs(); } else { this.type = 'edit'; }
  }

  private setUserValuesEmptyInputs() {
    this.type = 'register';
    this.vet = {
      code: null,
      crmv: null,
      user: {
        code: null,
        createdBy: null,
        createdDate: null,
        lastModifiedBy: null,
        lastModifiedDate: null,
        levelsOfAccess: 'USUARIO',
        status: 'VISIBLE',
        name: '',
        email: '',
        telephone1: '',
        telephone2: '',
        city: '',
        state: 'SC',
        password: ''
      }
    };
  }

  get f() { return this.registerForm.controls; }

  async ngOnInit() {
    if (this.type === 'edit') {
      this.vet = await this.crudService.get(this.id);
    } else {
      this.constant.progress = false;
    }
    this.validator();
  }

  validator() {
    this.registerForm = new FormGroup({
      name: new FormControl(this.vet.user.name, [
        Validators.required,
        Validators.pattern("(([A-Za-z]+[\\-\\']?)*([A-Za-z]+)?\\s)+([A-Za-z]+[\\-\\']?)*([A-Za-z]+)")
      ]),
      email: new FormControl(this.vet.user.email, [Validators.required, Validators.email]),
      city: new FormControl(this.vet.user.city, [
        Validators.required,
        Validators.pattern('^([a-zA-Z\u0080-\u024F]+(?:. |-| |\'))*[a-zA-Z\u0080-\u024F]*$')
      ]),
      telephone1: new FormControl(this.vet.user.telephone1, [
        Validators.required,
        Validators.pattern('(\\(\\d{2}\\)\\s)(\\d{4,5}\\-\\d{4})')
      ]),
      telephone2: new FormControl(this.vet.user.telephone2, [
        Validators.pattern('(\\(\\d{2}\\)\\s)(\\d{4,5}\\-\\d{4})')
      ]),
      crmv: new FormControl(this.vet.crmv, [
        Validators.pattern('^([0-9.\\-]+)*$')
      ]),
      crmv2: new FormControl([this.vet.crmv, this.vet.user.levelsOfAccess], [
        this.crmvValidate
      ]),
      password: new FormControl(this.vet.user.password, [
        Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}'),
        Validators.min(8),
      ]),
      password2: new FormControl([this.vet.user.password, this.editPassword], [
        this.passwordValidate
      ]),
    });
  }

  private passwordValidate(control: FormControl) {
    let show; let password;
    password = control.value[0];
    show = control.value[1];
    if (show === true && (password === undefined || password === '' || password === null)) {
      return { required : true } ;
    } else {
      return null;
    }
  }

  private crmvValidate(control: FormControl) {
    let crmv; let user;
    crmv = control.value[0];
    user = control.value[1];
    if (user === 'VETERINARIO' && (crmv === undefined || crmv === '')) {
      return { required : true } ;
    } else {
      return null;
    }
  }

  async clickButton() {
    this.buttonClick = true;
    this.validator();
    if (this.registerForm.valid) {
      if ( this.type === 'edit') {
        this.vet.user.code = this.id;
        this.response = await this.crudService.edit(this.vet)
        if ( this.response !== undefined) {
          if (this.response.error === undefined) {this.router.navigate(['home/getUsers']); } else {
            // @ts-ignore
            M.toast({html: this.response.error.fieldMessage});
          }
        } else {
          // @ts-ignore
          M.toast({html: 'Erro, tente novamente mais tarde'});
        }
      } else {
        this.response = await this.crudService.create(this.vet);
        if (this.response !== undefined) {
          if (this.response.error === undefined) {this.router.navigate(['home/getUsers']); } else {
            // @ts-ignore
            M.toast({html: this.response.error.fieldMessage});
          }
        } else {
          // @ts-ignore
          M.toast({html: 'Erro, tente novamente mais tarde'});
        }
      }
    }
  }
}
