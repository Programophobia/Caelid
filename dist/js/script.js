/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

const select = {
  templateOf: {
    menuProduct: "#template-menu-product",
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 0,
      defaultMax: 10,
    }
  };

  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  };

  const app = {
    initMenu: function(){
      const thisApp = this
      
      for(let productData in thisApp.data.products){
        new Products(productData, thisApp.data.products[productData])
        console.log(productData, thisApp.data.products[productData])
      }
    },
    initData: function(){
      const thisApp = this
      thisApp.data = dataSource
    },
    init: function(){
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);
      thisApp.initData()
      thisApp.initMenu()
    },
  };


class Products {
    constructor(id, data){
    const thisProduct = this
    thisProduct.id = id
    thisProduct.data = data
    thisProduct.renderInMenu()
    thisProduct.initAccordion()
    console.log(thisProduct)
 }
 
 renderInMenu(){
  const thisProduct = this
  const genaretedHTML = templates.menuProduct(thisProduct.data)
  thisProduct.element = utils.createDOMFromHTML(genaretedHTML)
  const menuContainer = document.querySelector(select.containerOf.menu)
  menuContainer.appendChild(thisProduct.element)
 }

 getElements(){
  const thisProduct = this;
  thisProduct.accordionTrigger = 
thisProduct.element.querySelector(select.menuProduct.clickable);
  thisProduct.form = 
thisProduct.element.querySelector(select.menuProduct.form);
  thisProduct.formInputs = 
thisProduct.form.querySelectorAll(select.all.formInputs);
  thisProduct.cartButton = 
thisProduct.element.querySelector(select.menuProduct.cartButton);
  thisProduct.priceElem = 
thisProduct.element.querySelector(select.menuProduct.priceElem);
}



 initAccordion(){
  const thisProduct = this;
 
  const clickableTrigger = thisProduct.element.querySelector(select.menuProduct.clickable)
 
      clickableTrigger.addEventListener('click', function(event) 
    {
    event.preventDefault()
      
        const activeProduct = document.querySelector(select.all.menuProductsActive)

    if(activeProduct !==null && activeProduct !== thisProduct.element){
      thisProduct.element.classList.remove(classNames.menuProduct.wrapperActive)
    }
    thisProduct.element.classList.toggle(classNames.menuProduct.wrapperActive)
  });
}
}



  app.init();
}
