import {AfterViewInit, Component, OnInit} from '@angular/core';
import { CrudService } from '../crud-service/crud.service';
import {User, Vet} from '../../../globals/constants.service';
import {Subject} from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConstantsService } from '../../../globals/constants.service';

interface GetUser {
  content: Array<User>;
  empty;
  first;
  last;
  number;
  numberOfElements;
  pageable;
  size;
  sort;
  totalElements;
  totalPages;
}

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit, AfterViewInit {
  users: GetUser;
  page = 1;
  pages: Array<number>;
  suggestions = [];
  suggestionValue: string;
  focus = false;
  response: GetUser;
  select = 'name';
  placeholder = 'Pesquisar por Nome';
  private filterString: Subject<string> = new Subject<string>();
  options = {name: 'Nome', email: 'Email', removed: 'Removidos (Veterinários)'};
  vet: Vet;
  showModal = false;

  constructor(private crudService: CrudService, private router: Router,
              private constant: ConstantsService) {}

  async ngOnInit() {
    await this.createTable();
    this.filterString.pipe(debounceTime(500)).subscribe(() => this.getSuggestions());
  }

  async getSuggestions() {
    this.suggestions = [];
    this.response = await this.crudService.getSuggestion(this.select, this.suggestionValue);
    if (this.response) {
      let i;
      for (i = 0; i < this.response.content.length; i++) {
        switch (this.select) {
          case 'name':
            this.suggestions.push(this.response.content[i].name);
            break;
          case 'email':
          case 'removed':
            this.suggestions.push(this.response.content[i].email);
            break;
        }
      }
    }
  }

  private async createTable() {
    if ( this.suggestionValue === undefined) {
      this.users = await this.crudService.getAll(this.select, 'empty', this.page - 1);
    } else {
      let search;
      search = this.suggestionValue === '' ? 'empty' : this.suggestionValue;
      this.users = await this.crudService.getAll(this.select, search, this.page - 1);
    }
    this.setTotalPage();
  }

  private setTotalPage() {
    this.pages = [];
    let i;
    if (this.users) {
      for (i = 0; i < this.users.totalPages; i++) {
        this.pages.push(i + 1);
      }
    } else {
      this.page = 1;
    }
  }

  private async setPage(value: number) {
    this.page = value;
    await this.createTable();
  }

  async delete(code: number) {
      if (await this.crudService.delete(code, this.select)) {
        this.users.content.forEach((value, index) => {
          // tslint:disable-next-line:triple-equals
          if (value.code == code) {
            this.users.content.splice(index, 1);
          }
        });
      }
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    $('select').formSelect();
  }

  setFocus(b: boolean) {
    this.focus = b;
  }

  async setSuggestion(suggestion: string) {
    this.suggestionValue = suggestion;
    this.focus = false;
    await this.getAll();
  }

  onKeyUp(): void {
    this.filterString.next();
  }

  async getAll() {
    this.page = 1;
    this.createTable();
  }

  async changePlaceholder() {
    switch (this.select) {
     case 'name':
       this.placeholder = 'Pesquisar por Nome';
       break;
     case 'email':
     case 'removed':
       this.placeholder = 'Pesquisar por Email';
       break;
   }
    this.page = 1;
    this.suggestionValue = '';
    this.createTable();
  }

  navigation(s: string) {
    this.constant.progress = true;
    this.router.navigate([s]);
  }

  async getById(code: number) {
    this.vet = await this.crudService.get(code);
    if (this.vet) { this.showModal = true; }
  }

  setShowModal(b: boolean) {
    this.showModal = b;
  }
}
