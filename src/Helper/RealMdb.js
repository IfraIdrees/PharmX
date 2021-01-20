import { ClipPath } from 'react-native-svg';
import { questionsOptionsDB, questionsliastDB, } from './schemas'
const Realm = require('realm');
let realm = null

const questionPaperList = {
    name: 'questionPaperDb',
    primaryKey: 'id',
    properties: {
        id: 'int',
        isAttemted: 'bool',
        // attemtedCount: 'int',
        paperInfo: 'paperListDB',
        paperData: { type: 'list', objectType: 'questionListDB' },
    }
}
const questionList = {
    name: 'questionListDB',
    primaryKey: 'id',
    properties: {
        questionOptions: { type: 'list', objectType: 'questionsOptionsDB' },
        ArrayData: { type: 'list', objectType: 'arrayDataDB' },
        createdAt: 'string',
        updatedAt: 'string',
        id: 'int',
        questionName: 'string',
        questionImage: { type: 'string', optional: true },
        questionType: 'string',
        answer: 'string',
        isDeleted: 'bool',
        noOfRows: 'int',
        noOfColumns: 'int',
        paragraph: 'string',
        paperId: 'int',
        isFlag: 'bool',
        fullImagePath: { type: 'string', optional: true },
    }
}
const questionOptionList = {
    name: 'questionsOptionsDB',
    properties: {
        createdAt: 'string',
        updatedAt: 'string',
        id: 'int',
        optionKey: 'string',
        optionName: 'string',
        questionId: 'int',
        isSelected: 'bool'
    }
}
const arrayDataList = {
    name: 'arrayDataDB',
    properties: {
        row: { type: 'list', objectType: 'arrayDataDBcolumn' }
    }
}
const arrayDataListcolumn = {
    name: 'arrayDataDBcolumn',
    properties: {
        column: 'string'
    }
}
const paperList = {
    name: 'paperListDB',
    primaryKey: 'id',
    properties: {
        createdAt: 'string',
        updatedAt: 'string',
        id: 'int',
        name: 'string',
        paperType: 'string',
        startDateTime: 'string',
        endDateTime: 'string',
        isDeleted: 'bool',
        description: 'string'
    }
}
export const createDb = () => {
    const schemaList = [questionPaperList, questionList, questionOptionList, arrayDataList, arrayDataListcolumn, paperList]
    const realm = new Realm({
        path: 'storeBookmarks.realm',
        schema: schemaList
    })
}
export const addquestion = (item) => {
    //console.log('add question paper => ', item)
    const realm = new Realm({ path: 'storeBookmarks.realm' })
    const paperDetailsData = item.paperDetails
    realm.write(() => {
        paperDetailsData.forEach((arrayItem) => {
            realm.create('questionListDB', {
                createdAt: arrayItem.createdAt,
                updatedAt: arrayItem.updatedAt,
                id: arrayItem.id,
                questionName: arrayItem.questionName,
                questionImage: arrayItem.questionImage,
                questionType: arrayItem.questionType,
                type: arrayItem.type,
                answer: arrayItem.answer,
                isDeleted: arrayItem.isDeleted,
                questionOptions: arrayItem.questionOptions,
                ArrayData: arrayItem.ArrayData,
                noOfRows: arrayItem.noOfRows,
                noOfColumns: arrayItem.noOfColumns,
                paragraph: arrayItem.paragraph,
                paperId: arrayItem.paperId,
                isFlag: arrayItem.isFlag,
                fullImagePath: arrayItem.fullImagePath,
            }, 'modified')
        })
        // console.log('paper details => ', paperDetailsData)
        // console.log('paper details => ADDED',)
        console.log('paper info => ', item.paperInfo)
        // realm.create('paperListDB', {
        //     createdAt: item.paperInfo.createdAt,
        //     updatedAt: item.paperInfo.updatedAt,
        //     id: item.paperInfo.id,
        //     name: item.paperInfo.name,
        //     paperType: item.paperInfo.paperType,
        //     startDateTime: item.paperInfo.startDateTime,
        //     endDateTime: item.paperInfo.endDateTime,
        //     isDeleted: item.paperInfo.isDeleted,
        //     description: item.paperInfo.description
        // }, 'modified')
        // console.log('paper info => ADDED',)


        realm.create('questionPaperDb', {
            id: item.id,
            isAttemted: item.isAttemted,
            paperInfo: item.paperInfo[0],
            paperData: paperDetailsData
        }, 'modified')
        console.log('paper => ADDED',)
    })
    // console.log('=================== timeout call ===================')
    // setTimeout(() => {
    //     getquestions()
    // }, 5000);
}

export const getquestionPaper = () => {
    const realm = new Realm({ path: 'storeBookmarks.realm' })
    let data = []
    data = realm.objects('questionPaperDb')
    console.log('question paper list => ', data)
    return data.slice().reverse()
}

export const getIsAttemtedQuestions = () => {
    const realm = new Realm({ path: 'storeBookmarks.realm' })
    let data = []
    data = realm.objects('questionPaperDb').filtered(`isAttemted =${true}`)
    console.log('all questions list => ', data)
    return data.slice().reverse()
}
export const getQuestionPaperById = (id) => {
    console.log('all questions list for id=> ', id)
    const realm = new Realm({ path: 'storeBookmarks.realm' })
    let data = []
    data = realm.objects('questionPaperDb').filtered(`id =${id}`)
    console.log('all questions list => ', data)
    return data.slice().reverse()
}

export const getquestions = () => {
    const realm = new Realm({ path: 'storeBookmarks.realm' })
    let data = []
    data = realm.objects('questionListDB')
    console.log('all questions list => ', data)
    return data.slice().reverse()
}

export const getBookMarkQuestions = () => {
    const realm = new Realm({ path: 'storeBookmarks.realm' })
    let data = []
    data = realm.objects('questionListDB').filtered(`isFlag =${true}`)
    console.log('all questions list => ', data)
    return data.slice().reverse()
}

export const removeData = () => {
    const realm = new Realm({ path: 'storeBookmarks.realm' })
    realm.write(() => {
        const data = realm.objects('questionPaperDb')
        realm.delete(data)
    })
    console.log('clear realm Data');
}