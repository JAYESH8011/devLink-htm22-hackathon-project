exports.cookieToken = (user, res) => {
    const token = user.getJwtToken()
    res.cookie("token", token, {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    })
    res.status(201).json({
        status: "ok",
        token,
        user,
    })
}
