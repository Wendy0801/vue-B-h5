import Vue from 'vue' 

Vue.filter('price_format', number => {
    number = parseFloat(number)||0;
    return number*100/100;
}) ; 