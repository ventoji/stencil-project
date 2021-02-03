import { Component, h, State, Element, Prop, Watch, Listen } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'uc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})
export class StockPrice {
  stockInput: HTMLInputElement;
 // initialStockSymbol: string;

  @Element() el: HTMLElement; // TOOT ELEMENT
  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @State() loading = false;

  @Prop({
    mutable: true, reflect: true
  }) stockSymbol: string;
  
  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string){
    if(newValue !== oldValue){
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue);
    }
  }

  onUserInput(event: Event){
    this.stockUserInput = (event.target as HTMLInputElement).value;
    if(this.stockUserInput.trim() !== ''){
      this.stockInputValid = true;
    }else{
      this.stockInputValid = false;
    }
  }

  onFetchStockPrice(event: Event){
    event.preventDefault();
    console.log('Submiited');
  //  const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
  // const stockSymbol = this.stockInput.value; now is mutable 
  this.stockSymbol = this.stockInput.value; 
 // this.fetchStockPrice(this.stockSymbol);
 
  }
// listen interally by default, add body to change default behaviour
  @Listen('ucSymbolSelected', { target: 'body' }) 
  onStockSymbolSelected(event: CustomEvent){
    console.log('stock symbol selected: ' + event.detail);
    if(event.detail && event.detail !== this.stockSymbol){
      this.stockSymbol = event.detail;
     // this.fetchStockPrice(event.detail);
    }
  }

  componentWillLoad(){
    console.log('componentWillLoad 1');
    console.log(this.stockSymbol);
   // this.fetchedPrice = 0;
  }

  componentDidLoad(){
    // this.fetchedPrice = 0;  // wrong part to initialize
                               // it renders twice 
  console.log('componentDidLoad 2');
    if(this.stockSymbol){
   //   this.initialStockSymbol = this.stockSymbol;
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  componentWillUpdate(){
    console.log('componentWillUpdate 3');
  }

  componentDidUpdate(){
    console.log('componentDiUpdate 4');
    // if(this.stockSymbol !== this.initialStockSymbol){
    //   this.initialStockSymbol = this.stockSymbol;
    //   this.fetchStockPrice(this.stockSymbol);
    // }
  }

  disconnectedCallback(){
    console.log('componentDiUnload 5');
  }
 /*  Remove in stencill 2
 componentDidUnload(){
    console.log('componentDiUnload');
  } */

  fetchStockPrice(stockSymbol: string){
    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
    .then( res => {
      if(res.status !== 200){
        throw new Error('invalid');
      }
      return res.json(); // parse incoming data into a JS object
    })
    .then( parseRes => {
      if(!parseRes['Global Quote']['05. price']){
        throw new Error('Invalid Symbol');
      }
      this.error = null;
      this.fetchedPrice = +parseRes['Global Quote']['05. price'];
      this.loading = false;
     // console.log(parseRes);
    // console.log(+parseRes['Global Quote']['05. price']);
    })
    .catch(err => {
     // console.log(err);
      this.error = err.message;
      this.fetchedPrice = null;
      this.loading = false;
    });
  }

  hostData(){
    return {class: this.error ? 'error' : ''}; // you can add ,style: 'PORPERTY':'VALUE'
  }

  render(){
    let dataContent =<p> Please enter a symbol</p>
    if(this.error){
      dataContent = <p>{this.error}</p>
    }
    if(this.fetchedPrice){
      dataContent =<p> Price: ${this.fetchedPrice}</p>;
    }
    if(this.loading){
      dataContent = <uc-spinner></uc-spinner>;
    }

    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input 
          id="stock-symbol" 
          ref={el => this.stockInput = el} 
          value={this.stockUserInput}
          onInput={this.onUserInput.bind(this)}
          />
        <button type="submit" disabled={!this.stockInputValid || this.loading}>Fetch</button>
      </form>,
      <div>
      {dataContent}
      </div>
    ];
  }
}
