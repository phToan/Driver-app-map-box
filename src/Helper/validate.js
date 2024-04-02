export const validatePassword = (password) => {
    if (password.length < 8 && password.length != 0) {
        return 'Mật khẩu phải có ít nhất 8 ký tự'
    } else {
        return null
    }
}

export const validatePhone = (phone) => {
    let phoneNumberRegex = /^(03[2-9]|05[6-9]|07[0-9]|08[1-9]|09[0-9])+([0-9]{7})$/;
    if (!phoneNumberRegex.test(phone) && phone.length != 0) {
        return 'Số điện thoại chưa hợp lệ'
    }
    return null
}

export const validateConfirmPassword = (password, rePassword) => {
    if (password !== rePassword && rePassword != 0) {
        return 'Nhập chưa khớp với mật khẩu mới'
    }
    return null
}