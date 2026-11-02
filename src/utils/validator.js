export const validateRegister = ({ 
    username, 
    fullname, 
    email, 
    pass, 
    confirm_password, 
}) => { 
    const errors = {}; 
 
    if (!username) { 
        errors.username = "Vui lòng nhập tên đăng nhập"; 
    } 
 
    if (!fullname) { 
        errors.fullname = "Vui lòng nhập họ ten"; 
    } 
 
    if (!email) { 
        errors.email = "Vui lòng nhập email"; 
    } 
 
    if (!pass) { 
        errors.pass = "Vui lòng nhập mật khẩu"; 
    } else if (pass.length < 6) { 
        errors.pass = "Mật khẩu phải >= 6 ký tự"; 
    } 
 
    if (!confirm_password) { 
        errors.confirm_password = "Vui lòng nhập lại mật khẩu"; 
    } else if (pass !== confirm_password) { 
        errors.confirm_password = "Mật khẩu không khớp"; 
    } 
 
    return errors; 
};
export function isEmpty(obj){
    return Object.keys(obj).length ===0;
}
export const validateLogin = ({ 
    username,  
    pass
    
}) => { 
    const errors = {}; 
 
    if (!username) { 
        errors.username = "Vui lòng nhập tên đăng nhập"; 
    } 
 
    if (!pass) { 
        errors.pass = "Vui lòng nhập mật khẩu"; 
    }
 
  
    return errors; 
};










export const validateProduct = ({ product_name, price }) => {
  const errors = {};

  // tên sản phẩm
  if (!product_name || product_name.trim() === "") {
    errors.product_name = "Vui lòng nhập tên sản phẩm";
  } else if (product_name.length < 3) {
    errors.product_name = "Tên phải >= 3 ký tự";
  }

  // giá
  if (price === "" || price === null || price === undefined) {
    errors.price = "Vui lòng nhập giá";
  } else if (isNaN(price)) {
    errors.price = "Giá phải là số";
  } else if (price <= 0) {
    errors.price = "Giá phải > 0";
  }

  return errors;
};
