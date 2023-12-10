"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app, express, bodyParser, cookieParser) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
};
//# sourceMappingURL=DataParser.js.map