const { check, param } = require("express-validator");
const { Category, Question } = require("../models");

module.exports.storeQuestionRequest = () => {
  const isValidCategory = async (value) => {
    const category = await Category.findOne({ where: { id: value } });
    if (!category) {
      return Promise.reject("The provided category_id is not a valid category");
    }
  };

  return [
    check("question", "A question is required").exists().isString(),
    check("category_id", "A category is required")
      .exists()
      .isNumeric()
      .custom(isValidCategory),
    check("options", "Options is required").exists().isArray(),
  ];
};

module.exports.editQuestionRequest = () => {
  const isValidQuestion = async (value) => {
    const question = await Question.findOne({ where: { id: value } });
    if (!question) {
      return Promise.reject("The provided id is not a valid question");
    }
  };

  return [
    check("question", "A question is required").exists().isString(),
    param("id", "Invalid question id")
      .exists()
      .isNumeric()
      .custom(isValidQuestion),
    check("options", "Options is required").exists().isArray(),
  ];
};

module.exports.deleteQuestionRequest = () => {
  const isValidQuestion = async (value) => {
    const question = await Question.findOne({ where: { id: value } });
    if (!question) {
      return Promise.reject("The provided id is not a valid question");
    }
  };

  return [
    param("id", "Invalid question id")
      .exists()
      .isNumeric()
      .custom(isValidQuestion),
  ];
};
