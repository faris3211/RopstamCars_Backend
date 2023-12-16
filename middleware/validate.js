exports.validateUserSignUp = (req, res, next) => {
  const regEx = /^[A-Za-z][A-Za-z0-9.]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const { name, email } = req.body;

  if (!name || name === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Name is required',
    });
  } else if (!email || email === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Email is required',
    });
  } else if (!regEx.test(email)) {
    return res.json({
      status: 'FAILURE',
      message: 'Invalid email format',
    });
  } else {
    next();
  }
};

exports.validateUserSignIn = (req, res, next) => {
  const regEx = /^[A-Za-z][A-Za-z0-9.]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const { email, password } = req.body;

  if (!email || email === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Email is required',
    });
  } else if (!regEx.test(email)) {
    return res.json({
      status: 'FAILURE',
      message: 'Invalid email format',
    });
  } else if (!password || password === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Password is Required',
    });
  } else if (password.length < 10) {
    return res.json({
      status: 'FAILURE',
      message: 'Password must be 10 chars long',
    });
  } else {
    next();
  }
};

exports.validateCarCategoryAdd = (req, res, next) => {
  const { carCategory } = req.body;

  if (!carCategory || carCategory === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Car category is required',
    });
  } else {
    next();
  }
};

exports.validateCarCategoryEdit = (req, res, next) => {
  const { oldNameOfCarCategory, newNameOfCarCategory } = req.body;

  if (!oldNameOfCarCategory || oldNameOfCarCategory === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Old name of car category is required',
    });
  } else if (!newNameOfCarCategory || newNameOfCarCategory === '') {
    return res.json({
      status: 'FAILURE',
      message: 'New name of car category is required',
    });
  } else {
    next();
  }
};

exports.validateCarAdd = (req, res, next) => {
  const { sellerId, category, make, model, variant, color, registrationNumber } =
    req.body;

  if (!sellerId || sellerId === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Seller id is required',
    });
  } else if (!category || category === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Category is required',
    });
  } else if (!make || make === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Make is required',
    });
  } else if (!model || model === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Modal is required',
    });
  } else if (!variant || variant === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Variant is required',
    });
  } else if (!color || color === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Color is required',
    });
  } else if (!registrationNumber || registrationNumber === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Registration Number is required',
    });
  } else {
    next();
  }
};

exports.validateCarEdit = (req, res, next) => {
  const { make, model, variant, color, registrationNumber } = req.body;

  if (!make || make === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Make is required',
    });
  } else if (!model || model === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Modal is required',
    });
  } else if (!variant || variant === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Variant is required',
    });
  } else if (!color || color === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Color is required',
    });
  } else if (!registrationNumber || registrationNumber === '') {
    return res.json({
      status: 'FAILURE',
      message: 'Registration Number is required',
    });
  } else {
    next();
  }
};
