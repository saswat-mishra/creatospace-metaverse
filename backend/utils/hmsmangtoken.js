var jwt = require('jsonwebtoken');
var uuid4 = require('uuid4');






var app_access_key = '62bb69b476f8697390a6a7da';
var app_secret = 'V3s1siiqQZfBoBuVHgb_OUUkkl6cFzfsRxK-GsmkXwZepVLZiyna8ZSRAIBZuvO6TqppYx9bBZseApyWAFCKRounMCvAqdGAX9-xA3vsUusWr4xGkHqEWaLjL4xRcgE5TDDZ-jkNISuWlAoKDc-utBUg-ya2b_zgywuUeIudF1Q=';
function mang_token() {
    jwt.sign(
        {
            access_key: app_access_key,
            type: 'management',
            version: 2,
            iat: Math.floor(Date.now() / 1000),
            nbf: Math.floor(Date.now() / 1000)
        },
        app_secret,
        {
            algorithm: 'HS256',
            expiresIn: '24h',
            jwtid: uuid4()
        },
        function (err, token) {
            return token;
        }
    );
}
exports.token = mang_token;