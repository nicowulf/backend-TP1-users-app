const validateEmail = (email, users) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  const registeredEmail = users.find((user) => user.email === email);
  if (registeredEmail) {
    throw new Error("Email already registered");
  }
};

export { validateEmail }
