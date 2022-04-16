import shop from "@/api/shop";

export default {
    namespaced: true,
    state: {
        cart: [],
        checkoutStatus: null
    },

    getters: {
        getCartProducts(state, getters, rootState) {
            return state.cart.map(cartItem => {
                const product = rootState.products.products.find(product => product.id === cartItem.id)
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },

        cartTotal(state, getters) {

            return getters.getCartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
        },
    },

    mutations: {
        setChectoutStatus(state, status) {
            state.checkoutStatus = status
        },

        emptyCart(state) {
            state.cart = []
        },

        // cardItem = {id:12, quatity: 4}

        pushProductToCart(state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },
    },

    actions: {
        checkout({ state, commit }) {

            shop.buyProducts(
                state.cart,
                () => {
                    commit('emptyCart')
                    commit('setChectoutStatus', 'success')
                },
                () => {
                    commit('setChectoutStatus', 'fail')
                }
            )
        },


        addProductToCart({ state, commit, rootGetters}, product) {
            if (rootGetters['products/getProductInStock'](product)) {
                const cartItem = state.cart.find(item => item.id === product.id)
                if (!cartItem) {
                    commit('pushProductToCart', product.id)
                } else {
                    commit('increamentItemQuantity', cartItem)
                }
                commit('products/decrementProductInventory', product, {root: true})
            }
        },

    }
}