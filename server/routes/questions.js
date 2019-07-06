const express = require('express');
const router = express.Router();
const QuestionController = require('../controller/question-controller');

router.post('/save', (request, response, next) => {
    const body = request.body || '';
    if (body) {
        const question_slug = body.questionTitle && body.questionTitle.toLowerCase().replace(/\s+/g, "-");
        const data = {
            qTitle: body.questionTitle,
            qSlug: question_slug,
            tpSlug: body.topicSlug,
            qType: body.qType,
            question: body.question
        };
        if (body.options) {
            data['options'] = body.options;
        } else if (body.subjectiveAnswer) {
            data['subjectiveAnswer'] = body.subjectiveAnswer
        }
        QuestionController.createQuestion(data)
            .then(questionResponse => response.json({ message: "Questions has created successfully" }))
            .catch(errorResponse => response.status(500).json({ errror: errorResponse }))
    }
});
router.get('/fetch/:qSlug?', (request, response, next) => {
    const quetion_slug = request.params && request.params.qSlug || '';
    const condition = {};
    if (quetion_slug) {
        condition['qSlug'] = quetion_slug;
    }
    QuestionController.fetchQuestion(null, condition)
        .then(questions => response.json({ questionList: questions }))
        .catch(errorResponse => response.status(500).json({ errror: errorResponse }))
});
router.put('/update/:qSlug', (request, response, next) => {
    const quetion_slug = request.params && request.params.qSlug || '';
    const body = request.body || '';
    if (quetion_slug && body) {
        const condition = {
            'qSlug': quetion_slug
        };
        QuestionController.updateQuestion(condition, body)
            .then(questions => response.json({ message: "Questions has updated successfully" }))
            .catch(errorResponse => response.status(500).json({ errror: errorResponse }))
    } else {
        response.status(400).json({ errror: 'Invalid Data' })
    }
});
router.delete('/delete/:qSlug', (request, response, next) => {
    const quetion_slug = request.params && request.params.qSlug || '';
    if (quetion_slug) {
        const condition = {
            'qSlug': quetion_slug
        };
        QuestionController.updateQuestion(condition, body)
            .then(questions => response.json({ message: "Questions has deleted successfully" }))
            .catch(errorResponse => response.status(500).json({ errror: errorResponse }))
    } else {
        response.status(400).json({ errror: 'Invalid Data' })
    }
})


module.exports = router;