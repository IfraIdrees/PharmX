const Realm = require('realm');

export class questionsOptionsDB extends Realm.Object { }
questionsOptionsDB.schema = {
  name: 'questionsOptionsDB',
  primaryKey: 'id',
  properties: {
    createdAt: 'string',
    updatedAt: 'string',
    id: 'int',
    optionKey: 'string',
    optionName: 'string',
    questionId: 'int'
  }
}

export class questionsliastDB extends Realm.Object { }
questionsliastDB.schema = {
  name: 'questionListDB',
  primaryKey: 'id',
  properties: {
    createdAt: 'string',
    updatedAt: 'string',
    id: 'int',
    questionName: 'string',
    questionImage: { type: 'string', optional: true },
    questionType: 'string',
    answer: 'string',
    isDeleted: 'bool',
    tabledata: { type: 'list', objectType: 'questionsOptionsDB' },
    noOfRows: 'int',
    noOfColumns: 'int',
    paragraph: 'string',
    paperId: 'int',
  }
}