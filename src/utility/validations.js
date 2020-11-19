const validateEnrollment = (enroll) => {
  const pattern = new RegExp(/\d{3}[a-z]\d{3}/i)
  console.log(pattern.test(enroll))
}

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const pattern = new RegExp(re)
  console.log(pattern.test(email))
}

const validatePassword = (password) => {
  //Password must contain at least one letter, at least one number, and be longer than six charaters.
  const re = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/
  const pattern = new RegExp(re)
  console.log(pattern.test(password))
}
const validation = {
  validateEnrollment,
  validateEmail,
  validatePassword
}
export default validation
