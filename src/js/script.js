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
      thisApp.initData();
      thisApp.initMenu();
    
    },
  };


class Products {
    constructor(id, data){
    const thisProduct = this
    thisProduct.id = id
    thisProduct.data = data
    thisProduct.renderInMenu()
    thisProduct.getElements();
    thisProduct.initAccordion()
    thisProduct.initOrderForm()
    thisProduct.processOrder()
    console.log(thisProduct)
 }
 
 renderInMenu(){
  const thisProduct = this
  const genaretedHTML = templates.menuProduct(thisProduct.data);
  thisProduct.element = utils.createDOMFromHTML(genaretedHTML);
  const menuContainer = document.querySelector(select.containerOf.menu);
  menuContainer.appendChild(thisProduct.element);
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
    thisProduct.imageWrapper =
    thisProduct.element.querySelector(select.menuProduct.imageWrapper)
}



 initAccordion(){
  const thisProduct = this;
  thisProduct.accordionTrigger.addEventListener('click', function(event) 
    {
    event.preventDefault()
      
        const activeProduct = document.querySelector(select.all.menuProductsActive)

    if(activeProduct !==null && activeProduct !== thisProduct.element){
      thisProduct.element.classList.remove(classNames.menuProduct.wrapperActive)
    }
    thisProduct.element.classList.toggle(classNames.menuProduct.wrapperActive)
  });
}

initOrderForm(){
  const thisProduct = this;
  thisProduct.form.addEventListener('submit', 
    function(event){
            event.preventDefault();
            thisProduct.processOrder();
          });
          for(let input of thisProduct.formInputs){
            input.addEventListener('change', function(){
          
              thisProduct.processOrder();
            });
          thisProduct.cartButton.addEventListener('click', 
    function(event){
            event.preventDefault();
            thisProduct.processOrder();
          });
}


  console.log(this.initOrderForm)
}
 processOrder(){
  const thisProduct = this;
  console.log(this.processOrder)
  const formData = utils.serializeFormToObject(thisProduct.form)
  console.log(formData)
  let price = thisProduct.data.price
  for(let paramId in thisProduct.data.params){
    const param = thisProduct.data.params[paramId]
     
      for(let optionId in param.options) {
      
  
        const optionImage = thisProduct.imageWrapper.querySelector('.' + paramId + '-' + optionId);
        console.log(optionId)
        const clickedElement = formData[paramId] && formData[paramId].includes(optionId)
        if (optionImage) {
          if (clickedElement) {
             optionImage.classList.add(classNames.menuProduct.imageVisible);
           }
           else {
             optionImage.classList.remove(classNames.menuProduct.imageVisible);
           }
         }

        const option = param.options[optionId];
        if(clickedElement && (option.default==true)){
          
          price == price
         

        }
        else if(clickedElement && (!option.default==true)){
          price+=option.price
        }
        else if(formData[paramId] && !formData[paramId].includes(optionId) && (option.default==true)){
          price-=option.price
        }
        console.log(optionId, option);
      }
    }
   
    thisProduct.priceElem.innerHTML = price;
    const test = thisProduct.data.class
    console.log(test)
  }
 
 


}



  app.init();
}
