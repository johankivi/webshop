<template>
    <main id="doc" class="grid-container">
        <h1 class="col-6">Documentation</h1>
        <article class="col-3">
            <h2>Vad är detta?</h2>
            <p>SINUS Skate webshop nyttjar ett API med följande resurser, metoder och datamodeller.</p>
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
            <h3>Authentication</h3>
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
                        <td>/api/auth</td>
                        <td><span class="method">POST</span></td>
                       <td>Authentiserar user med <em>email</em> & <em>password</em>. Returnerar en <em>JWT-token</em> som används vid varje anrop API:et i en <em>Authorization</em>-header.</td>
                    </tr>
                </tbody>
            </table>
            <h3>Registration</h3>
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
                        <td>/api/register</td>
                        <td><span class="method">POST</span></td>
                       <td>Registrerar en user enligt User-modellen.</td>
                    </tr>
                </tbody>
            </table>
            <h3>Products</h3>
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
                        <td class="endpoint">/api/products</td>
                        <td><span class="method">GET</span></td>
                       <td>Returnerar en lista på samtliga produkter.</td>
                    </tr>
                     <tr>
                        <td class="endpoint">/api/products/:id</td>
                        <td><span class="method">GET</span></td>
                       <td>Returnerar en enstaka produkt.</td>
                    </tr>
                    <tr>
                        <td>/api/products/</td>
                        <td><span class="method">POST</span></td>
                       <td>Skapar en ny produkt, se produkt-modell.</td>
                    </tr>
                    
                    <tr>
                   
                    <td>/api/products/:id</td>
                        <td><span class="method">PATCH</span></td>
                       <td>Uppdaterar produkt, se produkt-modell.</td>
                    </tr>
                    
                    <tr>
                        <td>/api/products/:id</td>
                        <td><span class="method">DELETE</span></td>
                        <td>Tar bort en produkt med :id.</td>
                    </tr>
                    
                </tbody>
            </table>
            <h3>Orders</h3>
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
                        <td class="endpoint">/api/orders</td>
                        <td><span class="method">GET</span></td>
                       <td>Returnerar en lista på samtliga ordrar.</td>
                    </tr>
                    <tr>
                        <td>/api/orders</td>
                        <td><span class="method">POST</span></td>
                       <td>Skapar en ny order, se order-modell.</td>
                    </tr>
                    <!--
                    <tr>
                    <td>/orders/:orderNr</td>
                        <td><span class="method">PATCH</span></td>
                       <td>Uppdaterar order, se order-modell.</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><span class="method">DELETE</span></td>
                        <td>Tar bort en order med :orderNr.</td>
                    </tr>
                    -->
                </tbody>
            </table>
            <!-- <h3>Users</h3>
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
                        <td class="endpoint">/users</td>
                        <td><span class="method">GET</span></td>
                       <td>Returnerar en lista på samtliga användare. Endast tillgänglig för admins.</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><span class="method">POST</span></td>
                       <td>Skapar en ny användare, se user-modell. Default-roll är <em>customer</em>.</td>
                    </tr>
                    
                    <tr>
                    <td>/user/:uuid</td>
                        <td><span class="method">PATCH</span></td>
                       <td>Uppdaterar user, se user-modell. Endast tillgänglig för specifik user samt admin.</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><span class="method">DELETE</span></td>
                        <td>Tar bort en användare med :uuid. Endast admin har rättighet.</td>
                    </tr>
                    
                </tbody>
            </table> -->
        </article>
    </main>
</template>
<script>
import { component as VueCodeHighlight } from 'vue-code-highlight';
import '../../node_modules/vue-code-highlight/themes/prism-tomorrow.css';

export default {
    name: 'Documentation',
    data(){
        return {
            code: {
                user: `{
    _id: '6b521d3f-3d15...' // add server side
    email: 'johan.kivi@zocom.se',
    password: 'hashed password',
    name: 'Johan Kivi',
    role: 'admin', // or customer

    adress: {
        street: 'Tokitokvägen 3',
        zip: '123 45',
        city: 'Tokberga'
    },
    payment: {
        cardOwner: 'Johan Kivi',
        cardNumber: '1234 5678 9101 1121',
        validUntil: '10 / 23',
        cvv: '123'
    },
    orderHistory: [ orderId1, orderId2, ... ]
}`,
                product: `{
    _id: '39y7gbbZk1u4ABnv',
    title: 'Gretas Fury',
    price: 999,
    shortDesc: 'Unisex',
    longDesc: 'Skate ipsum dolor sit amet...',
    imgFile: 'skateboard-greta.png'
}`,
                order: `{
    _id: 123,
    timeStamp: Date.now(), // add server side
    status: 'inProcess', // done
    items: [ productId1, productId2, ... ],
    orderValue: 999
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

    .method {
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

                    em {
                        display: inline-block;
                        background: $lightGrey;
                        padding: .125rem .25rem;
                        border-radius: $round;
                    }
                    
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