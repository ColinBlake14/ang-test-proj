export class UserModel {
  id: number = 0
  firstName: string = ''
  email: string = ''
  phone: string = ''
}

export class MessageModel {
  id: number = 0
  userId: string = ''
  topId: string = ''
  mes: string = ''
}

export class TopicsModel {
  id: number = 1
  topId: string = ''
  topic: string = ''
}
