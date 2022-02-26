import { createElement, render, initDom } from './virtualDom'


const VDOM = createElement('div', {

     class: 'width: 200px; height: 200px; background-color: orange', 
     id: 'wrapper'
    }, [
         createElement('input', { class: 'color: red'}, []),
         createElement('input', { class: 'color: orange'}, []),
         createElement('ol', { 'data-index': 3 }, [
           createElement('li', {}, ['第一项']),
           createElement('li', {}, ['第二项']),
           createElement('li', {}, ['第三项'])
         ])
    ]
)

const rDom = render(VDOM);

initDom(rDom, '#app');
