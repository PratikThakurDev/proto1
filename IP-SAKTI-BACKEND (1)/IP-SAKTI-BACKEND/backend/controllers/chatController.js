import Chat from "../models/Chat.js";

export async function listChats(req, res) {
  const chats = await Chat.find({ user: req.user._id })
    .select("-messages")
    .sort({ updatedAt: -1 });

  res.json({ count: chats.length, chats });
}

export async function getChat(req, res) {
  const chat = await Chat.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!chat) return res.status(404).json({ message: "Chat not found" });

  res.json({ chat });
}

export async function createChat(req, res) {
  const chat = await Chat.create({
    user: req.user._id,
    title: req.body.title || "New conversation",
    product: req.body.productId || null,
    messages: []
  });

  res.status(201).json({ chat });
}

export async function deleteChat(req, res) {
  const chat = await Chat.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!chat) return res.status(404).json({ message: "Chat not found" });

  res.json({ message: "Chat deleted" });
}
