import { Component, OnInit } from '@angular/core';
import {GetReportService} from './services/get-report.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {ExcelService} from './services/excel.service';

interface Report {
  male: number;
  female: number;
  castrated: number;
  notCastrated: number;
  cat: number;
  dog: number;
  other: number;
  state: string;
  city: string;
  neighborhood: string;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportList: Array<Report>;
  suggestionValue: string;
  private filterString: Subject<string> = new Subject<string>();
  focus = false;
  suggestions = [];
  excel = [];
  map = new Map();
  private response: any;

  constructor(private report: GetReportService, private excelService: ExcelService) { }

  async ngOnInit() {
    await this.createTable();
    this.filterString.pipe(debounceTime(500))
      .subscribe(() => this.getSuggestions()); // Quando o usuário fica 500ms sem digitar exceuta a função
  }

  onKeyUp() { // Função para o evento de keyUp
    this.filterString.next();
  }

  async getAll() {
    this.createTable();
  }

  setFocus(b: boolean) { // Configura o focus na lista de sugestõees
    this.focus = b;
  }

  async getSuggestions() {
    this.suggestions = [];
    this.response = await this.report.getSuggestion(this.suggestionValue);
    if (this.response) {
      let i;
      for (i = 0; i < this.response.content.length; i++) {
          this.suggestions.push(this.response.content[i].name); // Salva em uma lista apenas os nomes vindos de uma requisição ao banco
      }
    }
  }

  async setSuggestion(suggestion) {
    this.suggestionValue = suggestion;
    this.focus = false;
    await this.getAll();
  }

  private async createTable() {
    if ( this.suggestionValue === undefined || this.suggestionValue === '') { // Verifica oq foi digitado pelo usuário como sugestão
      this.reportList = await this.report.getAll();
    } else {
      this.reportList = await this.report.get(this.suggestionValue);
    }
    this.createExcel();
  }

  private createExcel() { // Gera uma lista para que possa ser exportado em formato excel
    let i;
    for (i = 0; i < this.reportList.length; i++) {
      this.map.set('Quantidade(Fêmea)', this.reportList[i].female);
      this.map.set('Quantidade(Macho)', this.reportList[i].male);
      this.map.set('Quantidade(Gato)', this.reportList[i].cat);
      this.map.set('Quantidade(Cachorro)', this.reportList[i].cat);
      this.map.set('Quantidade(Outro)', this.reportList[i].other);
      this.map.set('Quantidade(Castrado)', this.reportList[i].castrated);
      this.map.set('Quantidade(Não castrado)', this.reportList[i].notCastrated);
      this.map.set('Estado', this.reportList[i].state);
      this.map.set('Cidade', this.reportList[i].city);
      this.map.set('Bairro', this.reportList[i].neighborhood);
      this.excel.push(this.convertMapsToObjects(this.map));
    }
  }

  private convertMapsToObjects(map) {
    const obj = {};
    let prop;
    for (prop of map) {
      obj[prop[0]] = prop[1];
    }
    return obj;
  }

    excelDownload() {
      this.excelService.exportAsExcelFile(this.excel, 'relatório');
    }
}
