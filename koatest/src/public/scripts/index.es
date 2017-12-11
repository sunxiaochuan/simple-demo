import css from '../css/index.css';
class PraiseButton {
    constructor() {

    }
    clickAction() {
        axios.get('/index/update')
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

export default PraiseButton;

// let  f = new Thumb(0,$('#thumb'));
// f.clickAction();