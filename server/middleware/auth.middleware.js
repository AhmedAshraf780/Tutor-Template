export default function authMiddleWare() {
  return (req, res, next) => {
    if (!req.session || !req.session.userId) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }
    next();
  };
}
