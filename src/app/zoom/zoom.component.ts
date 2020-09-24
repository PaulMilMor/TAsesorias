import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {

  signatureEndpoint = ''
  apiKey = 'yQ1Gh1u9TyKuOLnEGsAuVA'
  meetingNumber =75222276562
  role = 0
  leaveUrl = 'http://localhost:4200'
  userName = 'Angular'
  userEmail = ''
  passWord = '5qSw1K'
signature=''
apiSecret='nuFEHOHIXutpAGbgsJl17IyA3UWvpbRtq3rx'
  constructor() {

  }

  ngOnInit() {
    console.log('entramos pau')
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
