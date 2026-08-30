import Alert from "../models/Alert.js";

export async function listAlerts(req, res) {
  const alerts = await Alert.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(100);

  res.json({ count: alerts.length, alerts });
}

export async function markRead(req, res) {
  const alert = await Alert.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { isRead: true },
    { new: true }
  );

  if (!alert) return res.status(404).json({ message: "Alert not found" });

  res.json({ alert });
}
