/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  _currentLang: BehaviorSubject<string> = new BehaviorSubject<string>('en');

  get currentLang() {
    return this._currentLang.asObservable();
  }

  constructor() {}

  apptext = {
    intro: {
      nextButton: {
        en: 'next',
      },
    },
    policy: {
      heder: {
        en: 'Terms & Conditions',
      },
    },
    login: {
      header: {
        en: 'Hello',
      },
      required: {
        en: '*This field is required..',
      },
      subHeder: {
        en: 'Please login to your account',
      },
      loginButton: {
        en: 'Log In',
      },
      EmailAddOrTel: {
        en: 'Email Address or Phone number',
      },
      password: {
        en: 'Password',
      },
      forgotPassword: {
        en: 'Forgot Password?',
      },
      notHaveAccount: {
        en: 'Don`t have an account?',
      },
    },
    register: {
      header: {
        en: 'Register now',
      },
      person: {
        en: 'Person',
      },
      company: {
        en: 'Company',
      },
      name: {
        en: 'Name',
      },
      surname: {
        en: 'Surname',
      },
      profession: {
        en: 'Profession',
      },
      gender: {
        en: 'Gender',
      },
      male: {
        en: 'Male',
      },
      female: {
        en: 'Famale',
      },
      nextButton: {
        en: 'next',
      },
      country: {
        en: 'Country',
      },
      city: {
        en: 'City',
      },
      dateBr: {
        en: 'Date of Birth',
      },
      tel: {
        en: 'Phone Number',
      },
      email: {
        en: 'E-mail',
      },
      corectEmail: {
        en: 'Please enter correct E-mail',
      },
      choosePass: {
        en: 'Choose Password',
      },
      reEnterPass: {
        en: 'Re Enter Password',
      },
      signUpButton: {
        en: 'Sign Up',
      },
      haveAccount: {
        en: 'Already have an account?',
      },
      compName: {
        en: 'Company Name',
      },
      userName: {
        en: 'User Name',
      },
      description: {
        en: 'Description',
      },
      address: {
        en: 'Address',
      },
      required: {
        en: 'This field is required..',
      },
      min3char: {
        en: 'Min 3 characters.',
      },
      min7char: {
        en: 'Min 7 characters.',
      },
      min8char: {
        en: 'Min 8 characters.',
      },
      max15char: {
        en: 'Max 15 characters.',
      },
      max30char: {
        en: 'Max 30 characters.',
      },
      max50char: {
        en: 'Max 50 characters.',
      },
      notMatchPassword: {
        en: 'Password do not match.',
      },
    },
    verification: {
      enterCod: {
        en: 'Enter verification code',
      },
      verCod: {
        en: 'Verification code',
      },
      resendCod: {
        en: 'Resend code',
      },
      submitButton: {
        en: 'Submit',
      },
      errMesage: {
        en: 'Verification code is wrong',
      },
    },
    forgot_pass: {
      forgotPass: {
        en: 'Forgot password',
      },

      phone: {
        en: 'Phone number',
      },
      sendBtn: {
        en: 'Send',
      },
      continueBtn: {
        en: 'Continue',
      },
      newPassword: {
        en: 'New Password',
      },
      confirmPassword: {
        en: 'Confirm New Password',
      },
      notHaveAccount: {
        en: 'Don`t have an account?',
      },
      regNow: {
        en: 'Register now',
      },
      phoneNum: {
        en: 'min 7 numbers max 15',
      },
      min8char: {
        en: 'Min 8 characters.',
      },
      max15char: {
        en: 'Max 15 characters.',
      },
      required: {
        en: 'This field is required..',
      },
      notMatchPassword: {
        en: 'Password do not match.',
      },
    },
    inbox: {
      inb: {
        en: 'Inbox',
      },
    },
    ad: {
      call: {
        en: 'Call',
      },
      removeContact: {
        en: 'Remove Contact',
      },
      addContact: {
        en: 'Add Contact',
      },
      reportOptions: {
        en: 'Report Option',
      },
      Delete: {
        en: 'Delete',
      },
      BlockUser: {
        en: 'Block User',
      },
    },
    message: {
      header: {
        en: 'Register now',
      },
    },
    personalData: {
      countryCity: {
        en: 'Country City',
      },
      email: {
        en: 'E-mail',
      },
      profession: {
        en: 'profession',
      },
      tel: {
        en: 'Phone',
      },
    },
    review: {
      countryCity: {
        en: 'Country City',
      },
    },
    settings: {
      editSettings: {
        en: 'Edit Setting',
      },
      editProfile: {
        en: 'Edit Profile',
      },
      changPass: {
        en: 'Change Password',
      },
      myRequest: {
        en: 'My Requests',
      },
      BlockUser: {
        en: 'Blocked Users',
      },
      MyContact: {
        en: 'My contacts',
      },
      MyActivity: {
        en: 'My Activity',
      },
      fingerprint: {
        en: 'Unlock with fingerprint',
      },
      phoneVis: {
        en: 'Phone visibility',
      },
      emailVis: {
        en: 'E-mail visibility',
      },
      signOut: {
        en: 'Sign Out',
      },
    },
    edit: {
      name: {
        en: 'Name',
      },
      surname: {
        en: 'Surname',
      },
      profession: {
        en: 'Profession',
      },
      compName: {
        en: 'Company Name',
      },
      userName: {
        en: 'User Name',
      },
      description: {
        en: 'Description',
      },
      country: {
        en: 'Country',
      },
      city: {
        en: 'City',
      },
      dateOfBitth: {
        en: 'Date of Birth',
      },
      address: {
        en: 'Address',
      },
      phone: {
        en: 'Phone Number',
      },
      email: {
        en: 'Email',
      },
      btnText: {
        en: 'Edit Profile',
      },
      editProfile: {
        en: 'Edit Profile',
      },
      required: {
        en: 'This field is required..',
      },
      min3char: {
        en: 'Min 3 characters.',
      },
      min7char: {
        en: 'Min 7 characters.',
      },
      min8char: {
        en: 'Min 8 characters.',
      },
      max15char: {
        en: 'Max 15 characters.',
      },
      max30char: {
        en: 'Max 30 characters.',
      },
      max50char: {
        en: 'Max 50 characters.',
      },
      corectEmail: {
        en: 'Please enter correct E-mail',
      },
      gender: {
        en: 'Gender',
      },
      male: {
        en: 'Male',
      },
      female: {
        en: 'Famale',
      },
    },
    change_pass: {
      required: {
        en: 'This field is required..',
      },
      min8char: {
        en: 'Min 8 characters.',
      },
      max15char: {
        en: 'Max 15 characters.',
      },
    },
  };

  getText(component: string) {
    return this.apptext[component];
  }
}
