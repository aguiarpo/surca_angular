import { Component } from '@angular/core';
import {ConstantsService} from './globals-service/constants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Surca';

  constructor(private constant: ConstantsService) {}
}
