app.component('product-display', {
    props: {
        premium: {
          type: Boolean,
          required: true
        }
      },
    template: 
    /*html*/ 
    `  <div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img v-bind:src="image">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div class="color-circle" :class="[isActive ? 'activeClass' : '']" v-for="(variant, index) in variants" :keyAtt="variant.id" :style="{'background-color': variant.color }" @mouseover="updateVariant(index)"> </div>
        <button :class="{disabledButton: !inStock}" class="button" @click="addToCart">Add to Cart</button>

        <button  class="button" :class="{ disabledButton: !inStock }" :disabled="!inStock"  @click="removeFromCart">Remove Item</button>
      </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    
    <review-form @review-submitted="addReview"></review-form>
  </div>`,
  data(){
    return {
        cart: 0,
        product: 'Ghazal',
        brand : 'Addidas',
        url: 'https://www.vuemastery.com/',
        inventory: 1,
        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
            { id: 2234, color: 'green', image: './assests/images/socks_green.jpg', quantity: 50, },
            { id: 2235, color: 'blue', image: './assests/images/socks_blue.jpg', quantity: 0, },
          ],
          isActive: true,
          selectedVariant: 0,
          onSale: true,
          reviews: []
    }
},
methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id )
    },
    updateVariant(index) {
        this.selectedVariant = index
      },
      removeFromCart() {
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
      },
      addReview(review) {
        this.reviews.push(review)
      }
  },
  computed: {
    title() {
        return `${this.product} - ${this.brand} ${(this.onSale) ? 'is on sale' : ''}` 
    },
    image() {
        return this.variants[this.selectedVariant].image
      },
      inStock() {
        return (this.variants[this.selectedVariant].quantity > 0)
      },
      shipping() {
        if (this.premium) {
          return 'Free'
        }
          return 2.99
       }
    
  }

})