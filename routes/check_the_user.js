var handler_auth = (req, rep) => {
    return rep({
        response:'Token received you are authenticated!',
        connected_with : req.params.username
    })
    .header(
        'Authorization',
        req.headers.authorization
    );
}

var route_auth = {
    method:'GET',
    path: '/check_this_user/{username}',
    config: { auth : 'jwt' },
    handler: handler_auth
}

module.exports = route_auth;