export default function checkExpiration() {
  return (req, res, next) => {
    if (req.session.userId && req.session.createdAt) {
      const maxSessionAge = 8 * 60 * 60 * 1000; // 8 hours
      if (Date.now() - req.session.createdAt > maxSessionAge) {
        return req.session.destroy(() => {
          res.clearCookie("connect.sid");
          res.status(401).json({
            success: false,
            message: "Session expired, please log in again",
          });
        });
      }
    }
    next();
  };
}
