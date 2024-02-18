/* eslint-disable no-undef */
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.listen(10001, () => {
    console.log('app listening on port 10001');
});