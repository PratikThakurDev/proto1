import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    preferredLanguage: user.preferredLanguage
  };
}

export async function register(req, res) {
  const { name, email, password, preferredLanguage = "English" } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email and password are required" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must contain at least 8 characters" });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const exists = await User.findOne({ email: normalizedEmail });
  if (exists) {
    return res.status(409).json({ message: "Email is already registered" });
  }

  const passwordHash = await hashPassword(password);

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    preferredLanguage
  });

  const token = signToken(user);

  res.status(201).json({
    message: "Registration successful",
    token,
    user: publicUser(user)
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = await User.findOne({
    email: email.trim().toLowerCase()
  }).select("+passwordHash");

  if (!user || !(await comparePassword(password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (!user.isActive) {
    return res.status(403).json({ message: "Account is inactive" });
  }

  const token = signToken(user);

  res.json({
    message: "Login successful",
    token,
    user: publicUser(user)
  });
}

export async function me(req, res) {
  res.json({ user: publicUser(req.user) });
}

export async function logout(req, res) {
  // JWT is stateless. The frontend should delete its stored token.
  res.json({ message: "Logout successful. Remove the JWT on the client." });
}
