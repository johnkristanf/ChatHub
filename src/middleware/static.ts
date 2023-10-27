import path from 'path';

export default (app: any, express: any) => {
    app.use(express.static(path.join(__dirname, '../../public')));


}