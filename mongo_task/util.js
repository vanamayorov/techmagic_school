const faker = require('faker');

const generateUser = ({
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  department,
  createdAt = new Date()
} = {}) => ({
  firstName,
  lastName,
  department,
  createdAt
});

const generateArticle = ({
  name = faker.name.firstName(),
  description = `${faker.name.firstName()} ${faker.name.lastName()}`,
  type,
  tags = []
} = {}) => ({
  name,
  description,
  type,
  tags
});

module.exports = {
  mapUser: generateUser,
  mapArticle: generateArticle,
  getRandomFirstName: () => faker.name.firstName()
};
