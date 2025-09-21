import { config } from "../config/config.js";

export default function checkAdminEmail() {
  return (req, res, next) => {
    try {
      const { email } = req.body;
      if (email === config.ADMIN_EMAIL) {
        req.isAdmin = true;
      } else {
        req.isAdmin = false;
      }

      next();
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: "Server error in admin check" });
    }
  };
}
