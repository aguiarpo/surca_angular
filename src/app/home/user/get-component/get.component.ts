import { Component, OnInit } from '@angular/core';
import {GetAllService} from '../get-all-service/get-all.service';
import { DeleteService } from '../delete-service/delete.service';
import { EditService } from '../edit-service/edit.service';
import {User} from '../../../globals/constants.service';

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
export class GetComponent implements OnInit {
  users: GetUser;
  page = 1;
  pages: Array<number>;

  constructor(private getAllService: GetAllService, private deleteService: DeleteService,
              private editService: EditService) {
  }

  async ngOnInit() {
    await this.createTable();
  }

  private async createTable() {
    this.users = await this.getAllService.getAll(this.page - 1);
    console.log(this.users);
    this.setTotalPage();
  }

  private setTotalPage() {
    this.pages = [];
    let i;
    for (i = 0; i < this.users.totalPages; i++) {
      this.pages.push(i + 1);
    }
  }

  private async setPage(value: number) {
    this.page = value;
    await this.createTable();
  }

  async delete(code: number) {
      if (await this.deleteService.delete(code)) {
        this.users.content.forEach((value, index) => {
          // tslint:disable-next-line:triple-equals
          if (value.code == code) {
            this.users.content.splice(index, 1);
          }
        });
      }
  }

  edit(code: number) {}
}
