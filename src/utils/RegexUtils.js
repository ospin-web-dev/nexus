class RegexUtils {

  static get UUIDV4_REGEX_STRING() {
    return /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-4[A-Za-z0-9]{3}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/
  }

}

module.exports = RegexUtils
