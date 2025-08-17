/**
 * TrungQuanDev: https://youtube.com/@trungquandev
 */

// Một vài biểu thức chính quy - Regular Expression và custom message.
// Về Regular Expression khá hại não: https://viblo.asia/p/hoc-regular-expression-va-cuoc-doi-ban-se-bot-kho-updated-v22-Az45bnoO5xY
export const FIELD_REQUIRED_MESSAGE = 'Trường này là bắt buộc.'
export const EMAIL_RULE = /^\S+@\S+\.\S+$/
export const EMAIL_RULE_MESSAGE = 'Email không hợp lệ. (example@gmail.com)'
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/
export const PASSWORD_RULE_MESSAGE = 'Mật khẩu phải bao gồm ít nhất 1 chữ cái, 1 số và ít nhất 8 ký tự.'

export const USERNAME_RULE = /^[\p{L}][\p{L}\d\s.'-]{7,99}$/u
export const USERNAME_RULE_MESSAGE = 'Vui lòng nhập tên hợp lệ từ 7 đến 100 ký tự, không chứa ký tự đặc biệt.'

export const NAME_RULE = /^[\p{L}\s]{3,50}$/u
export const NAME_RULE_MESSAGE = 'Vui lòng nhập tên hợp lệ từ 3 đến 50 ký tự, không chứa ký tự đặc biệt.'

export const BIO_RULE = /^[\p{L}\d\s.,'-]{0,160}$/u
export const BIO_RULE_MESSAGE = 'Vui lòng nhập mô tả hợp lệ, tối đa 160 ký tự.'

export const WEBSITE_RULE = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
export const WEBSITE_RULE_MESSAGE = 'Vui lòng nhập địa chỉ website hợp lệ.'

export const validateDateInput = (value: string) => {
  const today = new Date()
  const selectedDate = new Date(value)
  const age = today.getFullYear() - selectedDate.getFullYear()
  const monthDiff = today.getMonth() - selectedDate.getMonth()
  const dayDiff = today.getDate() - selectedDate.getDate()

  if (selectedDate > today) {
    return 'Ngày sinh không được lớn hơn ngày hiện tại'
  }

  if (age < 13 || (age === 13 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
    return 'Bạn phải đủ 13 tuổi trở lên'
  }

  return true
}
