<template>
    <main id="doc" class="grid-container">
        <h1 class="col-6">Documentation</h1>
        <article class="col-3">
            <h2>Vad är detta?</h2>
            <p>SINUS Skate webshop nyttjar ett API med följande funktionalitet.</p>
            <h2>Datamodeller</h2>
            <p>De tre objekt som API:et ska kunna hantera är följande:</p>
            <h3>Product</h3>
            <vue-code-highlight>
            {{ code.product }}
            </vue-code-highlight>
            <h3>Order</h3>
            <vue-code-highlight>
            {{ code.order }}
            </vue-code-highlight>
            <h3>User</h3> 
            <vue-code-highlight>
            {{ code.user }}
            </vue-code-highlight>
        </article>
        

        <article class="col-3">
            <h2>API dokumentation</h2>
            <table cellspacing="0">
                <thead>
                    <tr>
                        <th>Resurs</th>
                        <th>Metod</th>
                        <th>Detaljer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="endpoint">/products</td>
                        <td><span class="get">GET</span></td>
                       <td>Returnerar en lista på samtliga produkter.</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><span class="get">POST</span></td>
                       <td>Skapar en ny produkt, se produkt-modell.</td>
                    </tr>
                    <tr>
                    <td>/products/:id</td>
                        <td><span class="get">PUT</span></td>
                       <td>Uppdaterar produkt, se produkt-modell.</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><span class="get">DELETE</span></td>
                        <td>Tar bort en produkt med :id.</td>
                    </tr>
                </tbody>
            </table>

        </article>
    </main>
</template>
<script>
import { component as VueCodeHighlight } from 'vue-code-highlight';
import '../../node_modules/vue-code-highlight/themes/prism-tomorrow.css';
//import '../../node_modules/vue-code-highlight/themes/window.css';

export default {
    name: 'Documentation',
    data(){
        return {
            code: {
                user: `{   
    name: 'Johan Kivi',
    role: 'admin', // customer
    email: 'johan.kivi@zocom.se',
    adress: {
        street: 'Tokitokvägen 3',
        zip: '123 45',
        city: 'Tokberga'
    },
    payment: {
        cardOwner: 'Johan Kivi',
        cardNumber: '1234 5678 9101 1121',
        validUntil: '10 / 23',
        CVV: '123'
    },
    orderHistory: [ { order }, ... ]
}`,
                product: `{
    id: 4,
    title: 'Gretas Fury',
    price: 999,
    shortDesc: 'Unisex',
    longDesc: 'Skate ipsum dolor sit amet...',
    imgFile: 'skateboard-greta.png',
    serial: '127127838128877'
}`,
                order: `{
    orderNr: 123,


}`
            }
        }
    },
    components:{
        VueCodeHighlight
    }
}
</script>
<style lang="scss">
  @import '../scss/variables';

#doc {

    .get {
        display: inline-block;
        background: $lightGrey;
        padding: .25rem .5rem;
        border-radius: $round;
    }

    table {
        margin: 1rem 0;
        
        thead {
        
            tr{
                background: $darkGrey;
                color: white;

                th {
                    padding: .5rem;
                    text-align: left;
                                    
                }

            }
        }

        tbody {
            tr {
               
                td {
                    border-right: 1px solid $middleGrey;
                    border-bottom: 1px solid $middleGrey;
                    padding: .5rem;
                    font-size: .9rem;
                    
                    &:first-child {
                        font-weight: 800;
                        font-size: 1rem;
                    }

                    &:last-child {
                        border-right: none;
                    }
                }
            }
        }

        border: 1px solid $middleGrey;
        border-bottom: none;
        width: 100%;
    }
}
</style>