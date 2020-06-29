import HeaderBar from './headerBar';
import FooterBar from './footerBar';
import Carousel from './carousel';
import Card from './card';
import TableTitle from './tableTitle';
import List from './list';
import Upload from './upload';

export default (Vue) => {
    Vue.component('HeaderBar', HeaderBar);
    Vue.component('FooterBar', FooterBar);
    Vue.component('Carousel', Carousel);
    Vue.component('Card', Card);
    Vue.component('TableTitle', TableTitle);
    Vue.component('List', List);
    Vue.component('Upload', Upload);
}