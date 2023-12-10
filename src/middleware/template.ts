import path from 'path';

export default (app:any) => {
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));


}