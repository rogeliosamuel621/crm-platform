export default () => ({
  port: parseInt(process.env.PORT, 10),
  mongodb: {
    uri: process.env.MONGODB_URI
  },
  jwtAccess: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: process.env.JWT_ACCESS_EXPIRATION
  }
});
