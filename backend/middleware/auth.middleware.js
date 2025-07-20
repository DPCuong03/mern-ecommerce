import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken; // access token được gửi từ client thông qua cookie

    // Nếu không có access token -> trả về lỗi 401
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No access token provided" });
    }

    // Nếu có access token, dùng secret key để kiểm tra và giải mã
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

      //token hợp lệ -> decoded.userId chứa id của user. Bỏ trường password khi trả về user
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      //Gắn user vào req.user để sử dụng ở các middleware hoặc route phía sau
      req.user = user;
      //Nếu không có lỗi, đi tiếp đến middleware hoặc route tiếp theo
      next();
    } catch (error) {
      // token hết hạn
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unauthorized - Access token expired" });
      }
      throw error;
    }
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid access token" });
  }
};

//req.user đã được gắn ở middleware protectRoute, nếu user role là "admin" → cho phép tiếp tục
export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied - Admin only" });
  }
};
