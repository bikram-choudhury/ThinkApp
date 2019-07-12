const questions = require('../database/schemas/question');
const topics = require('../database/schemas/topic');

const QuestionController = {
    createQuestion: (question) => {
        return new Promise((resolve, reject) => {
            if(question && Object.keys(question)) {

                const Question = new questions(question);
                Question.save((error, questionDoc) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(true);
                    }
                })
            } else {
                reject({error: 'No proper data'});
            }
        })
    },
    fetchQuestion: (source = null, match = null, fetch = null) => {
        return new Promise((resolve, reject) => {
            const conditions = match || {};
            topics.aggregate([
                {
					"$match": conditions
				},{
					"$lookup": {
						"from": "questions",
						"localField": "slug",
						"foreignField": "tpSlug",
						"as": "questionDetails"
					}
				},{
                    "$unwind": "$questionDetails"
                }, {
                    "$project": {
                        "topicName": "$name",
                        "questionTitle": "$questionDetails.qTitle",
                        "questionSlug": "$questionDetails.qSlug",
                        "questionType": "$questionDetails.qType",
                        "question": "$questionDetails.question",
                        "subjectiveAnswer": "$questionDetails.subjectiveAnswer",
                        "options": "$questionDetails.options"
                    }
                }
            ], (err, questions) => {
				if (err) {
                    reject(err);
                } else {
                    resolve(questions);
                }
			});
        })
    },
    updateQuestion: (match, docForUpdate) => {
        return new Promise((resolve, reject) => {
            if(match && docForUpdate) {
                questions.findOneAndUpdate(match, docForUpdate, {new: true}, (err, updatedDoc) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(updatedDoc);
                    }
                })
            } else {
                reject({error: 'No proper data'});
            }
        })
    },
    deleteQuestion: (match) => {
        return new Promise((resolve, reject) => {
            if(match) {
                questions.findOneAndRemove(match, (err, count) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(count);
                    }
                })
            } else {
                reject({error: 'No proper data'});
            }
        })
    }
}
module.exports = QuestionController;