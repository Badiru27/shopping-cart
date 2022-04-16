import shop from "@/api/shop";

export default {
    namespaced: true,
    state: {
        products: [],
    },

    getters: {
        availableProducts(state) {
            return state.products.filter(product => product.inventory > 0)
        },



        getProductInStock() {
            return (product) => {
                return product.inventory > 0
            }
        }
    },

    mutations: {
        setProducts(state, products) {
            //update products
            state.products = products;
        },

  

        increamentItemQuantity(state, cardItem) {
            cardItem.quantity++
        },

        decrementProductInventory(state, product) {
            product.inventory--
        },
    },

    actions: {
        fetchProducts({ commit }) {

            return new Promise((resolve, reject) => {

                try {
                    shop.getProducts((products) => {
                        commit("setProducts", products);
                        resolve()
                    });
                } catch (error) {
                    reject("Error")
                }
            })
        }, 
    }
}