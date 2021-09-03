import React, { Component } from 'react'
import './App.css';


export class Shopping extends Component {
    constructor(props){
        super(props)
        this.state = {
            fruitList: [],
            shoppingBasket: [],
            allTotleAccount: 0,
        }

        this.state.fruitList = [
            {
                key: 'apple',
                name: '蘋果',
                price: 20,
                quantity: 10
            },
            {
                key: 'pineapple',
                name: '鳳梨',
                price: 50,
                quantity: 10
            },
            {
                key: 'guava',
                name: '芭樂',
                price: 30,
                quantity: 10
            },
            {
                key: 'grape',
                name: '葡萄',
                price: 100,
                quantity: 10
            },
        ]
    }

    handleShoppingBasket = (e, key) => {
        const { fruitList, shoppingBasket } = this.state

        const originFruit = fruitList.find(f => f.key === key)

        if (originFruit.quantity === 0) {
            return;
        }

        originFruit.quantity = originFruit.quantity - 1;

        const fruit = shoppingBasket.find(f => f.key === key)

        if (fruit) {
            fruit.selectCount++;
            fruit.totalAmount = fruit.price * fruit.selectCount
        } else {
            const newFruit = {};
            newFruit.key = originFruit.key;
            newFruit.name = originFruit.name;
            newFruit.selectCount = 1;
            newFruit.price = originFruit.price;
            newFruit.totalAmount = newFruit.price * newFruit.selectCount
            shoppingBasket.push(newFruit)
        }

        let sum = 0;
        shoppingBasket.forEach(element => {
            sum += element.totalAmount;
        });
        
        this.setState({
            shoppingBasket: shoppingBasket,
            allTotleAccount: sum,
        })
    }

    deleteShoppingBasket = (e, key) => {
        const { fruitList, shoppingBasket } = this.state

        const originFruit = fruitList.find(f => f.key === key)
        originFruit.quantity++;

        const fruitIdx = shoppingBasket.findIndex(f => f.key === key)
        const fruit = shoppingBasket[fruitIdx];
        fruit.selectCount--;
        fruit.totalAmount = fruit.price * fruit.selectCount

        if (fruit.selectCount === 0) {
            shoppingBasket.splice(fruitIdx, 1);
        }

        let sum = 0;
        shoppingBasket.forEach(element => {
            sum += element.totalAmount;
        });
        
        this.setState({
            shoppingBasket: shoppingBasket,
            allTotleAccount: sum,
        })
    }

    
      
    render() {
        const { fruitList, shoppingBasket, allTotleAccount } = this.state;

        return (
            <>
                <h4>清單</h4>
                <div class="row">
                    {fruitList && fruitList.map((item, index) => {
                        return (
                            <>
                            <div class="col-sm-3">
                                <div class="card" key={index}>
                                    <div class="card-body">
                                        <h5 class="card-title">{item.name}</h5>
                                        <div class="card-text">售價： {item.price} 元</div>
                                        <div class="card-text">數量： {item.quantity} 個</div>
                                        <button class={item.quantity === 0 ? "btn btn-outline-dark btn-sm disabled" : "btn btn-outline-dark btn-sm"} onClick={(e) => this.handleShoppingBasket(e, item.key)}>
                                            {item.quantity === 0 ? "已售完" : "選購"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </>
                        )
                    })}
                </div>
                <br></br>
                <h4>已選購清單</h4>
                    <div class="row">
                        {shoppingBasket && shoppingBasket.map((item, index) => {
                            return (
                                <>
                                    <div class="col-sm-3">
                                        <div class="card" key={index}>
                                            <div class="card-body">
                                                <h5 class="card-title">{item.name}</h5>
                                                <div class="card-text">數量： {item.selectCount} 個</div>
                                                <div class="card-text">金額： {item.totalAmount} 元</div>
                                                <button class="btn btn-outline-dark btn-sm" onClick={(e) => this.deleteShoppingBasket(e, item.key)}>
                                                    刪除
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                </div>
                <br></br>
                <h4>總金額 {allTotleAccount} 元</h4>
            </>
        )
    }
  
}

export default Shopping