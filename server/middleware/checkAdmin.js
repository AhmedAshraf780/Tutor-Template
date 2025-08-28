import { config } from "../config/config.js";

export default function checkAdminEmail() {
  console.log("um here in admin checker");
  return (req, res, next) => {
    const { email } = req.body;
    console.log(email);
    try {
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
