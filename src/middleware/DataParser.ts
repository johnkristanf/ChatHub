

   
export default (app: any, express: any, bodyParser: any, cookieParser: any) => {
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieParser());

}
