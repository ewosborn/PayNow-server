import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) return res.status(401).json({ msg: 'Token not found ' });
        const token = authorization.slice(7, authorization.length);
        if (!token)
            return res.status(401).json({ msg: 'No auth token, access denied ' });

        jwt.verify(token, 'passwordKey', (err, decode) => {
            if (err) return res.status(401).json({ msg: 'Token verification failed, authorization denied' });
            req.user = decode
            next();
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

