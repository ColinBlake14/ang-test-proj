import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms"
import { MessageModel, UserModel } from "./app.component.model";
import { ApiService } from "./shared/api.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  feedbackForm!: FormGroup
  siteKey: string = "6LfBbkIcAAAAAC2FFsTY5HG8_82X6y2urkcnR8kA"
  userModelObj: UserModel = new UserModel()
  messageModelObj: MessageModel = new MessageModel()
  topicData!: any
  usersData: UserModel[] = []
  num: number = 0;
  double: boolean = false

  constructor(private formBuilder: FormBuilder, private api: ApiService, private http: HttpClient) {}

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      phone: new FormControl('',
        Validators.required
      ),
      prob: new FormControl('tec'),
      disc: new FormControl('', Validators.required),
      recaptcha: ['', Validators.required]
    })
    this.getAllTopics()
  }

  postUserData() {
    this.userModelObj.firstName = this.feedbackForm.value.name
    this.userModelObj.email = this.feedbackForm.value.email
    this.userModelObj.phone = this.feedbackForm.value.phone

    this.api.postUser(this.userModelObj)
      .subscribe(res=> {
        console.log(res)
      },
      err=> {
        alert("You died")
      })
  }

  postComment() {
    this.messageModelObj.topId = this.feedbackForm.value.prob
    this.messageModelObj.userId = this.feedbackForm.value.email
    this.messageModelObj.mes = this.feedbackForm.value.disc

    this.api.postComment(this.messageModelObj)
      .subscribe(res=> {
          console.log(res)
        },
        err=> {
          alert("You died")
        })
  }

  getAllTopics() {
    this.api.getTopic()
      .subscribe(res=> {
        this.topicData = res
      })
  }

  submit() {
    if (this.feedbackForm.valid) {
      console.log('Form submited', this.feedbackForm)
      const formData = {...this.feedbackForm.value}

      this.double = false

      this.http.get<UserModel[]>('http://localhost:3000/users')
        .subscribe(response => {
          this.usersData = response
          for (this.num = 0; this.num < this.usersData.length; this.num++) {
            if ((this.usersData[this.num].phone === formData.phone) && (this.usersData[this.num].email === formData.email)) {
              alert('Такая комбинация Email + Телефон уже зарегистрирована')
              this.double = true
              break
            }
          }
          if (!this.double) {
            this.postUserData()
            this.postComment()
            alert('Сообщение успешно отправлено!')
          }
        })
    }
  }

}

