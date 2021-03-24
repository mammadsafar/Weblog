

const logout = (req, res) => {
console.log("logout---------------");
    req.session.destroy(function(err) {
        if (err) return res.status(500).send('Server Error :(')
    });
    res.redirect('/login');
    
}



module.exports = {
    logout
}