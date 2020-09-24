import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  signatureEndpoint = ''
  apiKey = 'yQ1Gh1u9TyKuOLnEGsAuVA'
  meetingNumber = 77649969510
  role = 0
  leaveUrl = 'http://localhost:4200'
  userName = 'Angular'
  userEmail = ''
  passWord = ''
signature=''
apiSecret='nuFEHOHIXutpAGbgsJl17IyA3UWvpbRtq3rx'
  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) {

  }

  ngOnInit() {

  }

  getSignature() {
    this.signature=ZoomMtg.generateSignature({
      meetingNumber:this.meetingNumber,
      apiKey:this.apiKey,
      apiSecret:this.apiSecret,
      role:this.role,
      success:(res)=>{
        console.log(this.signature)
        
      }
    })
    this.startMeeting(this.signature)
  }

  startMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
