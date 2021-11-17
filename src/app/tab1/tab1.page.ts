/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput } from '@ionic/angular';
import { ChatListService } from 'src/app/services/chat-list.service';
import { LoginService } from 'src/app/services/login.service';
import { GlobalService } from '../../app/services/global.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public allChats: any;
  @ViewChild(IonInput) searchInput: IonInput;
  mesaage;

  constructor(
    private router: Router,
    private ChatListService: ChatListService,
    private alertController: AlertController,
    public LoginService: LoginService,
    private ChangeDetector: ChangeDetectorRef,
    private GlobalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.ChatListService.getChatsLists().subscribe((res: Array<any>) => {
      this.allChats = res;
      console.log(res);
      console.log(this.LoginService.LogedUser);

      // this.responses = res;
      // this.findedVals = this.responses;
      // this.ChatListService.newMessages = this.findedVals.filter(response => {
      //   return response.seen === 0 && response.to_id === this.LoginService.LogedUser.id;
      // }).length;

      // this.emptyRes = res.length ? false : true
      // this.loadingRes = this.loadingAns = false;
    });
  }

  delete(event, chat) {
    event.stopPropagation();
    this.alertMessageDelete(chat);
  }

  async alertMessageDelete(chat) {
    const alert = await this.alertController.create({
      cssClass: 'chat-delete-alert',
      header: 'Do you want to delete this chat?',
      message: 'You cannot undo this action',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Ok',
          handler: () => {
            const obj = {
              other_id: null,
            };
            this.LoginService.loggedUser().subscribe((res) => {
              if (chat.to_id === res['id']) {
                obj.other_id = chat.from_id;
              } else if (chat.from_id === res['id']) {
                obj.other_id = chat.to_id;
              }
              this.ChatListService.postDeleteChat([obj]).subscribe(
                (res) => {
                  const ind = this.allChats.indexOf(
                    this.allChats.find((chat) => {
                      return (
                        (chat.from_id === res[0].id1 &&
                          chat.to_id === res[0].id2) ||
                        (chat.from_id === res[0].id2 &&
                          chat.to_id === res[0].id1)
                      );
                    })
                  );

                  this.allChats.splice(ind, 1);
                  this.ChangeDetector.detectChanges();
                },
                (err) => {}
              );
            });
          },
        },
      ],
    });
    await alert.present();
  }

  inputChange(searchInput) {
    console.log(searchInput.value.length);
    this.GlobalService.searchInp = searchInput.value;
    if (searchInput.value.length === 0) {
      this.mesaage = undefined;
      this.ChatListService.getChatsLists().subscribe((res: Array<any>) => {
        this.allChats = res;
      });
      return false;
    }
    if (searchInput.value.length > 2) {
      this.GlobalService.findChatSearch(
        searchInput.value,
        this.LoginService.LogedUser.id
      ).subscribe((res) => {
        this.mesaage = undefined;
        console.log(res);
        this.allChats = res;
      });
    } else {
      this.mesaage = 'Min 3 characters.';
    }
  }

  chatClick(event, id) {
    console.log(event);
    event.stopPropagation();
    this.router.navigate([this.router.url + '/' + id]);
    console.log(id);
  }
}
