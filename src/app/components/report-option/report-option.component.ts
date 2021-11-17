/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-report-option',
  templateUrl: './report-option.component.html',
  styleUrls: ['./report-option.component.scss'],
})
export class ReportOptionComponent implements OnInit {
  user;
  options;
  @Input() item_id;
  constructor(
    private modalController: ModalController,
    private LoginService: LoginService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.LoginService.LogedUser;
    this.options = this.user.report_options;
    console.log(this.options);
  }

  close() {
    this.modalController.dismiss();
  }

  selectOption(id) {
    this.userService.requestReport(this.item_id, id).subscribe((res) => {
      console.log(res);
      this.close();
    });
  }
}
